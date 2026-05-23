# Quick Save

## [1.1.0] - 2026-05-23

### Added
- `SaveDataAsync()`, `LoadDataAsync()` 비동기 메서드 추가 — 메인 스레드 블로킹 없이 파일 I/O 가능
- `HasSaveData()` 메서드 추가 — 로드 전 저장 파일 존재 여부 확인 가능

### Fixed
- `Builder.UseVersion()` 버그 수정 — 설정한 버전 값이 항상 0으로 고정되던 문제 해결
- `SaveData()` 타입 파라미터 섀도잉 버그 수정 — 클래스 타입과 다른 타입으로 직렬화될 수 있던 문제 해결
- `LoadData()` 에러 구분 개선 — 역직렬화 실패 시 파일 없음과 구분되는 `InvalidDataException` 발생

### Performance
- 저장 디렉토리 생성을 `Build()` 시점 한 번으로 최적화 — 매 호출마다 `Directory.Exists` 하던 비용 제거

## [1.0.2] - 2026-05-16

### Added
- `DeleteData()` 메서드 추가 — 저장 파일(`.acqs`)을 런타임에서 직접 삭제할 수 있음
- Editor 메뉴 `Achieve/Delete Save` 추가 — Unity 에디터에서 저장 파일 일괄 삭제 (확인 다이얼로그 포함)

## [1.0.0] - 2024-01-01

### Added
- 패키지 최초 릴리즈
- MemoryPack 기반 바이너리 직렬화 저장 (`SaveData`, `LoadData`)
- `Application.persistentDataPath/quicksave/` 경로에 `.acqs` 파일 저장
- 암호화 옵션 (`USE_ENCRYPT` define 기반)
