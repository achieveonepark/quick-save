---
layout: home

hero:
  name: "Quick Save"
  text: "Unity 경량 저장 시스템"
  tagline: MemoryPack 기반 바이너리 직렬화로 빠르고 안전하게
  actions:
    - theme: brand
      text: 빠른 시작
      link: /quickstart
    - theme: alt
      text: API 레퍼런스
      link: /api/methods

features:
  - icon: ⚡
    title: 고성능 직렬화
    details: Cysharp의 MemoryPack을 사용한 고속 바이너리 직렬화/역직렬화
  - icon: 🔒
    title: 선택적 암호화
    details: DataProtector 연동으로 저장 파일 암호화 지원 (USE_ENCRYPT)
  - icon: 🔄
    title: 비동기 지원
    details: SaveDataAsync / LoadDataAsync로 메인 스레드 블로킹 없음
  - icon: 🛡️
    title: 타입 안전
    details: QuickSave<T>으로 컴파일 타임 타입 안전 보장
---
