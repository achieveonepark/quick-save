using System.IO;
using UnityEditor;
using UnityEngine;

namespace Achieve.QuickSave.Editor
{
    public static class QuickSaveEditorMenu
    {
        private const string SaveDirectory = "quicksave";

        [MenuItem("Achieve/Delete Save")]
        private static void DeleteSave()
        {
            string path = Path.Combine(Application.persistentDataPath, SaveDirectory);

            if (!Directory.Exists(path))
            {
                EditorUtility.DisplayDialog("Delete Save", "저장 파일이 없습니다.", "OK");
                return;
            }

            string[] files = Directory.GetFiles(path, "*.acqs");

            if (files.Length == 0)
            {
                EditorUtility.DisplayDialog("Delete Save", "저장 파일이 없습니다.", "OK");
                return;
            }

            bool confirm = EditorUtility.DisplayDialog(
                "Delete Save",
                $"{files.Length}개의 저장 파일을 삭제합니다.\n{path}",
                "삭제", "취소");

            if (!confirm)
                return;

            foreach (string file in files)
                File.Delete(file);

            Debug.Log($"[QuickSave] {files.Length}개의 저장 파일을 삭제했습니다. ({path})");
            EditorUtility.DisplayDialog("Delete Save", $"{files.Length}개의 저장 파일을 삭제했습니다.", "OK");
        }
    }
}
