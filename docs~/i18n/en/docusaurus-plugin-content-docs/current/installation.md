---
sidebar_position: 2.5
---

# Installation

## Prerequisites: Install MemoryPack

Quick Save depends on MemoryPack. Install it first via [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity).

1. Install NuGetForUnity into your project.
2. In the Unity Editor, open **NuGet > Manage NuGet Packages**.
3. Search for `MemoryPack` and install it.

---

## Install Quick Save

### Unity Package Manager (UPM) — Recommended

1. In the Unity Editor, open **Window > Package Manager**.
2. Click the `+` button in the top left → select **Add package from git URL...**
3. Enter the URL below and click **Add**.

```
https://github.com/achieveonepark/QuickSave.git#1.0.3
```

### Direct manifest.json Edit

Open `Packages/manifest.json` in your project and add the following under `dependencies`.

```json
{
  "dependencies": {
    "com.achieve.quick-save": "https://github.com/achieveonepark/QuickSave.git#1.0.3"
  }
}
```

---

## Encryption Support (Optional)

If you need encryption, also install the [DataProtector](https://github.com/achieveonepark/DataProtector) package.

```
https://github.com/achieveonepark/DataProtector.git
```

Once DataProtector is present in the project, the Assembly Definition automatically defines the `USE_ENCRYPT` symbol, enabling `UseEncryption()` and `UseVersion()` on the Builder.
