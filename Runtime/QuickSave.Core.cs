#if USE_ENCRYPT
using Achieve.DataProtector;
#endif
using MemoryPack;
using System.IO;
using UnityEngine;

namespace Achieve.QuickSave
{
    public sealed partial class QuickSave<T> where T : class
    {
#if USE_ENCRYPT
        private bool _isEncrypt = false;
        private string _encryptionKey;
        private int _version;
#endif

        private void SaveDataInternal<T>(T data)
        {
            byte[] binary = MemoryPackSerializer.Serialize(data);

#if USE_ENCRYPT
            if(_isEncrypt)
            {
                binary = Encryptor.Encrypt(binary, _encryptionKey);
            }
#endif
            string filePath = GetFilePath();
            File.WriteAllBytes(filePath, binary);
        }

        private T LoadDataInternal()
        {
            string filePath = GetFilePath();

            if(!File.Exists(filePath))
            {
                return null;
            }

            byte[] binary = File.ReadAllBytes(filePath);

#if USE_ENCRYPT
            if(_isEncrypt)
            {
                binary = Encryptor.Decrypt(binary, _encryptionKey);
            }
#endif
            T data = MemoryPackSerializer.Deserialize<T>(binary);
            return data;
        }

        private void DeleteDataInternal()
        {
            string filePath = GetFilePath();
            if (File.Exists(filePath))
                File.Delete(filePath);
        }

        private string GetFilePath()
        {
            var path = Path.Combine(Application.persistentDataPath, "quicksave");

            if(!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var result = 
#if USE_ENCRYPT
                Path.Combine(path, $"{typeof(T).Name}_{_version}.acqs");
#else
                Path.Combine(path, $"{typeof(T).Name}.acqs");
            #endif
            return Path.GetFullPath(result);
        }
    }
}
