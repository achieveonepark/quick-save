# Quick Save

QuickSave leverages Cysharp's MemoryPack to serialize and deserialize data into binary files for storage and retrieval. For additional data security, you can install Data Protector to enable compression and encryption.


## Install

Choose one of the following installation methods:

>Note: Check the version after # in the GitHub URL for the latest changes listed in the Changelog.

### Getting Started: Install MemoryPack via [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity)
1. Install NuGetForUnity according to the instructions in the repository.
2. With NuGetForUnity installed, add MemoryPack to your project.
3. Please install [MemoryPack](https://github.com/cysharp/memorypack) to use this package.

This setup prepares MemoryPack for seamless binary serialization and deserialization within Unity.

### Install via Unity Package Manager (UPM)
1. Open UPM and click the + button in the top left. 
2. Select Install package from git URL....
3. Enter `https://github.com/achieveonepark/QuickSave.git#1.0.0` and click Install.

### Manual Addition

Open the manifest.json file in your Unity project’s Packages folder.
Add the following line under dependencies:

```json
"com.achieve.quick-save": "https://github.com/achieveonepark/QuickSave.git#1.0.0"
```

## Quick Start

### API
```
QuickSave.Builder     | Creates a new QuickSave instance.
QuickSave.SaveData<T> | Saves data of type T as a binary file to persistentDataPath.
QuickSave.LoadData<T> | Loads data of type T from persistentDataPath.
```

### How to Get Started

```csharp
[MemoryPackable]
public partial class Monster
{
    public int HP;
    public long Attack;
    public long Defense;
}
```

```csharp
using Achieve.QuickSave

public class DataManager : MonoBehaviour
{
    QuickSave<Monster> data;

    void Start()
    {
        Monster monster = new Monster();
        monster.HP = 10000;
        monster.Attack = 10000;
        monster.Defense = 100000;

        data = new QuickSave<Monster>.Builder()
                                     .UseEncryption("ejrjejrtlq3mgfeq") // Optional: Use if Data Protector is added
                                     .UseVersion(55) // Sets the version for the data
                                     .Build();

        // Save data
        data.SaveData(monster);

        // Load data from saved file
        var loadedMonster = data.LoadData();
    }
}
```
## Recommended Packages to Use with QuickSave
[DataProtector](https://github.com/achieveonepark/DataProtector)

## Dependencies
[MemoryPack](https://github.com/Cysharp/MemoryPack)
