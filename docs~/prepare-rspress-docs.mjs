import { cp, readdir, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const docsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'content/docs');
const projectDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(projectDir, 'content/rspress-docs');
const locales = ['ko', 'en', 'ja', 'zh'];

async function listFiles(directory, relativePath = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(path.join(directory, entry.name), relative)));
    } else {
      files.push(relative);
    }
  }

  return files;
}

function localeForFile(file) {
  const normalizedFile = file.replaceAll(path.sep, '/');
  const match = normalizedFile.match(/^(.*)\.(en|ja|zh)\.mdx$/);
  return match
    ? { locale: match[2], target: `${match[1]}.mdx` }
    : { locale: 'ko', target: normalizedFile };
}

function metaFileInfo(file) {
  const normalizedFile = file.replaceAll(path.sep, '/');
  const match = normalizedFile.match(/^(.*)\/meta\.(en|ja|zh)\.json$/);
  if (match) {
    return { directory: match[1], locale: match[2], localized: true };
  }

  if (path.posix.basename(normalizedFile) === 'meta.json') {
    const directory = path.posix.dirname(normalizedFile);
    return {
      directory: directory === '.' ? '' : directory,
      localized: false,
    };
  }

  return null;
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(path.join(projectDir, 'public'), path.join(outputDir, 'public'), { recursive: true });

const sourceFiles = await listFiles(docsDir);
const mdxFiles = sourceFiles.filter((file) => file.endsWith('.mdx'));
const metaFiles = sourceFiles
  .filter((file) => metaFileInfo(file))
  .sort((left, right) => Number(metaFileInfo(left).localized) - Number(metaFileInfo(right).localized));
const sidebars = new Map();
const pages = new Map();

for (const file of metaFiles) {
  const info = metaFileInfo(file);
  const content = JSON.parse(await readFile(path.join(docsDir, file), 'utf8'));
  const targets = info.localized ? [info.locale] : locales;

  for (const locale of targets) {
    sidebars.set(`${locale}/${info.directory}`, content);
  }
}

for (const file of mdxFiles) {
  const { locale, target } = localeForFile(file);
  let content = await readFile(path.join(docsDir, file), 'utf8');

  if (content.includes('<Callout')) {
    content = content.replace(/type="warn"/g, 'type="warning"');
    const frontmatter = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
    const importStatement = 'import { Callout } from "@rspress/core/theme";\n\n';
    content = frontmatter
      ? `${frontmatter[0]}\n${importStatement}${content.slice(frontmatter[0].length)}`
      : `${importStatement}${content}`;
  }

  pages.set(`${locale}/${target}`, content);
}

for (const [localeDirectory, meta] of sidebars) {
  const locale = localeDirectory.slice(0, 2);
  const directory = localeDirectory.slice(locale.length + 1);
  const orderedPages = Array.isArray(meta) ? meta : meta.pages;
  if (!Array.isArray(orderedPages)) {
    throw new Error(`Sidebar metadata has no pages array: ${localeDirectory}`);
  }

  const rspressMeta = await Promise.all(
    orderedPages.map(async (page) => {
      if (typeof page !== 'string') {
        return page;
      }

      const childPath = [locale, directory, page].filter(Boolean).join('/');
      const childMeta = sidebars.get(childPath);
      const expectedDirectory = [directory, page].filter(Boolean).join('/');
      const isDirectory = sourceFiles.some((file) => {
        const sourceDirectory = path.posix.dirname(file.replaceAll(path.sep, '/'));
        return sourceDirectory === expectedDirectory;
      });

      if (!isDirectory) {
        return page;
      }

      return {
        type: 'dir',
        name: page,
        label: childMeta?.title ?? page,
      };
    }),
  );

  pages.set(`${localeDirectory}/_meta.json`, JSON.stringify(rspressMeta, null, 2));
}

pages.set(
  'index.mdx',
  `---
title: Quick Save
pageType: blank
---

<meta httpEquiv="refresh" content="0;url=/quick-save/ko/" />
<a href="/quick-save/ko/">한국어 문서로 이동 중...</a>
`,
);

pages.set('404.mdx', `---
pageType: blank
title: '404'
---

# 페이지를 찾을 수 없습니다

<a href="/quick-save/ko/">한국어 문서 홈으로 이동</a>
`);

for (const [target, content] of pages) {
  const destination = path.join(outputDir, target);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, content);
}
