#if USE_ENCRYPT
using Achieve.DataProtector;
#endif
using MemoryPack;
using System;
using System.IO;
using System.Threading.Tasks;
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
        private string _filePath;

        internal void Initialize()
        {
            _filePath = BuildFilePath();
            string dir = Path.GetDirectoryName(_filePath);
            if (!Directory.Exists(dir))
                Directory.CreateDirectory(dir);
        }

        private void SaveDataInternal(T data)
        {
            byte[] binary = MemoryPackSerializer.Serialize(data);
#if USE_ENCRYPT
            if (_isEncrypt)
                binary = Encryptor.Encrypt(binary, _encryptionKey);
#endif
            File.WriteAllBytes(_filePath, binary);
        }

        private async Task SaveDataInternalAsync(T data)
        {
            byte[] binary = MemoryPackSerializer.Serialize(data);
#if USE_ENCRYPT
            if (_isEncrypt)
                binary = Encryptor.Encrypt(binary, _encryptionKey);
#endif
            await File.WriteAllBytesAsync(_filePath, binary);
        }

        private T LoadDataInternal()
        {
            if (!File.Exists(_filePath))
                return null;

            byte[] binary = File.ReadAllBytes(_filePath);
#if USE_ENCRYPT
            if (_isEncrypt)
                binary = Encryptor.Decrypt(binary, _encryptionKey);
#endif
            try
            {
                return MemoryPackSerializer.Deserialize<T>(binary);
            }
            catch (Exception e)
            {
                throw new InvalidDataException($"[QuickSave] '{_filePath}' 파일을 역직렬화하는 데 실패했습니다.", e);
            }
        }

        private async Task<T> LoadDataInternalAsync()
        {
            if (!File.Exists(_filePath))
                return null;

            byte[] binary = await File.ReadAllBytesAsync(_filePath);
#if USE_ENCRYPT
            if (_isEncrypt)
                binary = Encryptor.Decrypt(binary, _encryptionKey);
#endif
            try
            {
                return MemoryPackSerializer.Deserialize<T>(binary);
            }
            catch (Exception e)
            {
                throw new InvalidDataException($"[QuickSave] '{_filePath}' 파일을 역직렬화하는 데 실패했습니다.", e);
            }
        }

        private void DeleteDataInternal()
        {
            if (File.Exists(_filePath))
                File.Delete(_filePath);
        }

        private bool HasSaveDataInternal() => File.Exists(_filePath);

        private string BuildFilePath()
        {
            var dir = Path.Combine(Application.persistentDataPath, "quicksave");
            var filename =
#if USE_ENCRYPT
                $"{typeof(T).Name}_{_version}.acqs";
#else
                $"{typeof(T).Name}.acqs";
#endif
            return Path.GetFullPath(Path.Combine(dir, filename));
        }
    }
}
