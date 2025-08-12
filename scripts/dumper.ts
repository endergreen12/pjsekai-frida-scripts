import "frida-il2cpp-bridge"
import path from "path";
import { GetAssemblyCSharpImage } from "./lib/exports/get/assembly";
import { ShowSubWindowDialog } from "./lib/utils/game/dialog";
import { GetMasterDataManagerInstance } from "./lib/utils/game/instance";
import { GetField } from "./lib/utils/unity/get-set";
import { CreateButton } from "./lib/utils/unity/tmpro";
import { GetTransform } from "./lib/utils/unity/transform";
import { CreateVector3, CreateVector2 } from "./lib/utils/unity/vector";

const DUMP_DIR_PATH = path.join(Il2Cpp.application.dataPath, "dumped")

Il2Cpp.perform(() => {
    const AssemblyCSharpImage = GetAssemblyCSharpImage()

    AssemblyCSharpImage.class("Sekai.OptionDialog").method("Setup").implementation = function(tabIndex, canAssetSetting, canBlockListSetting)
    {
        this.method("Setup").invoke(tabIndex, canAssetSetting, canBlockListSetting)

        CreateButton("Start dumping", 38, CreateVector3(800, -300, 0), CreateVector2(300, 100), GetTransform(this as Il2Cpp.Object), (button: Il2Cpp.Object) => {
            const masterDataManager = GetMasterDataManagerInstance()

            console.log("Creating a folder...")
            Il2Cpp.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp.string(DUMP_DIR_PATH))

            console.log("Beginning dumping of MasterData...")
            const targetDataNameArray: string[] = ["MasterMusicAlls", "MasterEventStories", "MasterSpecialStoryMap", "MasterUnitStoryEpisodeAll"]
            targetDataNameArray.forEach((targetDataName) => dumpMasterData(targetDataName, `${targetDataName}.json`, masterDataManager))

            console.log("Dumping wording...")
            serializeAndWriteToFile(GetField(AssemblyCSharpImage.class("Sekai.WordingManager"), "dictionary"), "WordingDictionary.json")

            ShowSubWindowDialog("Dump completed!")
        })
    }
})

function dumpMasterData(targetDataName: string, dumpFileName: string, masterDataManager: Il2Cpp.Object)
{
    console.log(`Starting dumping of ${targetDataName}...`)

    const targetData = masterDataManager.method<Il2Cpp.Object>(`Get${targetDataName}`).invoke()
    serializeAndWriteToFile(targetData, dumpFileName)
}

function serializeAndWriteToFile(targetData: Il2Cpp.Object, dumpFileName: string)
{
    const AssemblyCSharpImage = GetAssemblyCSharpImage()

    const jsonSerializedData = AssemblyCSharpImage.class("CP.TextUtility").method<Il2Cpp.String>("JsonFormat").invoke(
        AssemblyCSharpImage.class("CP.JsonSerializer").method<Il2Cpp.String>("ToJsonWithUnicodeDecode").invoke(targetData))

    console.log("Writing dumped data to a file...")
    Il2Cpp.corlib.class("System.IO.File").method("WriteAllText", 2).invoke(Il2Cpp.string(path.join(DUMP_DIR_PATH, dumpFileName)), jsonSerializedData)

    console.log("Done")
}