---
layout: home

hero:
  name: "Quick Save"
  text: "Lightweight Unity Save System"
  tagline: Fast and safe binary serialization powered by MemoryPack
  actions:
    - theme: brand
      text: Get Started
      link: /en/quickstart
    - theme: alt
      text: API Reference
      link: /en/api/methods

features:
  - icon: ⚡
    title: High-Performance Serialization
    details: Fast binary serialization and deserialization using Cysharp's MemoryPack
  - icon: 🔒
    title: Optional Encryption
    details: File encryption via DataProtector integration (USE_ENCRYPT define)
  - icon: 🔄
    title: Async Support
    details: SaveDataAsync / LoadDataAsync to avoid blocking the main thread
  - icon: 🛡️
    title: Type-Safe API
    details: Compile-time type safety guaranteed with QuickSave<T>
---
