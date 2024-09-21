namespace Achieve.QuickSave
{
    public sealed partial class QuickSave<T>
    {
        /// <summary>
        /// 데이터를 저장합니다.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        public void SaveData<T>(T data) => SaveDataInternal(data);

        /// <summary>
        /// 데이터를 로드하며, 로드한 객체를 반환합니다.
        /// </summary>
        /// <returns></returns>
        public T LoadData() => LoadDataInternal();
    }
}
