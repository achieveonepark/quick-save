# Quick Save

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
