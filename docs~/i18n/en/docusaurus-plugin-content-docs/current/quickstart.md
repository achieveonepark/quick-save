---
sidebar_position: 2
---

# Quick Start

Get up and running with Quick Save in 5 minutes.

## Step 1: Define a Data Class

Add the `[MemoryPackable]` attribute and the `partial` keyword to the class you want to save.

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

## Step 2: Create a QuickSave Instance

Use the `Builder` pattern to create an instance. The save directory is prepared automatically at this point.

```csharp
using Achieve.QuickSave;

var save = new QuickSave<PlayerData>.Builder()
    .Build();
```

## Step 3: Save, Load, and Delete

```csharp
var player = new PlayerData { Name = "Hero", Level = 1, HP = 100f, Gold = 0 };

// Save
save.SaveData(player);

// Check existence
if (save.HasSaveData())
{
    // Load
    PlayerData loaded = save.LoadData();
    Debug.Log(loaded.Name); // "Hero"
}

// Delete
save.DeleteData();
```

## Full Example

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
        Debug.Log("Saved");
    }

    public PlayerData LoadGame()
    {
        if (!_save.HasSaveData())
        {
            Debug.Log("No save data — returning defaults");
            return new PlayerData { Name = "NewPlayer", Level = 1, HP = 100f };
        }

        return _save.LoadData();
    }
}
```
