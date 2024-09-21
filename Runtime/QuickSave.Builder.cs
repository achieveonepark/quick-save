namespace Achieve.QuickSave
{
    public sealed partial class QuickSave<T>
    {
        public class Builder
        {

#if USE_ENCRYPT
            private bool _encrypt = false;
            private int _version;
            private string _encryptionKey;

            /// <summary>
            /// 암/복호화를 사용합니다.
            /// </summary>
            /// <param name="encryptionKey"></param>
            /// <returns></returns>
            public Builder UseEncryption(string encryptionKey)
            {
                _encrypt = true;
                _encryptionKey = encryptionKey;
                return this;
            }

            /// <summary>
            /// Save 파일의 버전을 명명합니다. 입력하지 않으면 0을 바라봅니다.
            /// </summary>
            /// <param name="version"></param>
            /// <returns></returns>
            public Builder UseVersion(int version)
            {
                _version = version;
                return this;
            }
#endif
            public QuickSave<T> Build()
            {
                var instance = new QuickSave<T>();
#if USE_ENCRYPT
                instance._isEncrypt = _encrypt;
                instance._version = 0;
                instance._encryptionKey = _encryptionKey;
#endif
                return instance;
            }
        }
    }
}