# Quick Save

**Quick Save**는 Cysharp의 [MemoryPack](https://github.com/Cysharp/MemoryPack)을 기반으로 Unity에서 데이터를 바이너리 파일로 저장하고 불러오는 경량 저장 시스템입니다.

## 주요 특징

| 기능 | 설명 |
|------|------|
| 바이너리 직렬화 | MemoryPack 기반의 빠른 직렬화/역직렬화 |
| 타입 안전 API | `QuickSave<T>` 제네릭으로 타입 안전 보장 |
| 비동기 지원 | `SaveDataAsync` / `LoadDataAsync`로 메인 스레드 블로킹 없음 |
| 암호화 (선택) | DataProtector 패키지 연동으로 파일 암호화 |
| 버전 관리 | 저장 파일에 버전 번호를 붙여 다중 버전 운용 가능 |
| 에디터 유틸리티 | `Achieve/Delete Save` 메뉴로 저장 파일 일괄 삭제 |

## 저장 경로

저장 파일은 Unity의 `Application.persistentDataPath` 하위에 생성됩니다.

```
{persistentDataPath}/quicksave/{TypeName}.acqs
```

암호화 + 버전 사용 시:

```
{persistentDataPath}/quicksave/{TypeName}_{version}.acqs
```

## 패키지 정보

- **버전**: 1.0.3
- **Unity**: 2022.3 이상
- **확장자**: `.acqs`
