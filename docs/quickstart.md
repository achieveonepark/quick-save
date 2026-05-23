# 빠른 시작

Quick Save를 5분 안에 사용해 보세요.

## 1단계: 저장할 데이터 클래스 정의

MemoryPack으로 직렬화할 클래스에 `[MemoryPackable]` 어트리뷰트와 `partial` 키워드를 붙입니다.

```csharp
using MemoryPack;

[MemoryPackable]
public partial class PlayerData
{
    public string Name;
    public int Level;
    public float HP;
    public long Gold;
}
```

## 2단계: QuickSave 인스턴스 생성

`Builder` 패턴으로 인스턴스를 생성합니다. 인스턴스 생성 시 저장 디렉토리도 함께 준비됩니다.

```csharp
using Achieve.QuickSave;

var save = new QuickSave<PlayerData>.Builder()
    .Build();
```

## 3단계: 저장, 로드, 삭제

```csharp
var player = new PlayerData { Name = "Hero", Level = 1, HP = 100f, Gold = 0 };

// 저장
save.SaveData(player);

// 존재 확인
if (save.HasSaveData())
{
    // 로드
    PlayerData loaded = save.LoadData();
    Debug.Log(loaded.Name); // "Hero"
}

// 삭제
save.DeleteData();
```

## 전체 예제

```csharp
using Achieve.QuickSave;
using MemoryPack;
using UnityEngine;

[MemoryPackable]
public partial class PlayerData
{
    public string Name;
    public int Level;
    public float HP;
}

public class GameManager : MonoBehaviour
{
    private QuickSave<PlayerData> _save;

    void Awake()
    {
        _save = new QuickSave<PlayerData>.Builder().Build();
    }

    public void SaveGame(PlayerData player)
    {
        _save.SaveData(player);
        Debug.Log("저장 완료");
    }

    public PlayerData LoadGame()
    {
        if (!_save.HasSaveData())
        {
            Debug.Log("저장 파일 없음 — 기본값 반환");
            return new PlayerData { Name = "NewPlayer", Level = 1, HP = 100f };
        }

        return _save.LoadData();
    }
}
```
