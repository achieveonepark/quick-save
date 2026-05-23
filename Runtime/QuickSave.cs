using System.Threading.Tasks;

namespace Achieve.QuickSave
{
    public sealed partial class QuickSave<T>
    {
        /// <summary>
        /// 데이터를 저장합니다.
        /// </summary>
        public void SaveData(T data) => SaveDataInternal(data);

        /// <summary>
        /// 데이터를 비동기로 저장합니다.
        /// </summary>
        public Task SaveDataAsync(T data) => SaveDataInternalAsync(data);

        /// <summary>
        /// 데이터를 로드하며, 로드한 객체를 반환합니다. 파일이 없으면 null을 반환합니다.
        /// </summary>
        public T LoadData() => LoadDataInternal();

        /// <summary>
        /// 데이터를 비동기로 로드합니다. 파일이 없으면 null을 반환합니다.
        /// </summary>
        public Task<T> LoadDataAsync() => LoadDataInternalAsync();

        /// <summary>
        /// 저장 파일이 존재하는지 확인합니다.
        /// </summary>
        public bool HasSaveData() => HasSaveDataInternal();

        /// <summary>
        /// 저장 파일을 삭제합니다.
        /// </summary>
        public void DeleteData() => DeleteDataInternal();
    }
}
