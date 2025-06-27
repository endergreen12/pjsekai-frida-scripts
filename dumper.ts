import path from "path";
import { AssemblyImage, Edge, RectTransform } from "./lib/consts.js";
import { CreateButton, GetComponentInChildrenFromObj, GetMasterDataManagerInstance } from "./lib/lib.js";
const DUMP_DIR_PATH = path.join(Il2Cpp.application.dataPath, "dumped")

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.OptionDialog").method("Setup").implementation = function(tabIndex, canAssetSetting, canBlockListSetting)
    {
        this.method("Setup").invoke(tabIndex, canAssetSetting, canBlockListSetting)

        CreateButton(Edge.Bottom, 770, 150, 300, 100, 38, GetComponentInChildrenFromObj(this as Il2Cpp.Object, RectTransform), (button: Il2Cpp.Object) => {
            const masterDataManager = GetMasterDataManagerInstance()

            console.log("Creating a folder...")
            Il2Cpp.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp.string(DUMP_DIR_PATH))

            console.log("Beginning dumping of MasterData...")
            const targetDataNameArray: string[] = ["MasterMusicAlls", "MasterEventStories", "MasterSpecialStoryMap", "MasterUnitStoryEpisodeAll"]
            targetDataNameArray.forEach((targetDataName) => dumpMasterData(targetDataName, `${targetDataName}.json`, masterDataManager))

            console.log("Dumping wording...")
            serializeAndWriteToFile(AssemblyImage.class("Sekai.WordingManager").field<Il2Cpp.Object>("dictionary").value, "WordingDictionary.json")

            console.log("All dumps are complete!")
        }, "Start dumping")
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
    const jsonSerializedData = AssemblyImage.class("CP.JsonSerializer").method<Il2Cpp.String>("ToJsonWithUnicodeDecode").invoke(targetData)

    console.log("Writing dumped data to a file...")
    Il2Cpp.corlib.class("System.IO.File").method("WriteAllText", 2).invoke(Il2Cpp.string(path.join(DUMP_DIR_PATH, dumpFileName)), jsonSerializedData)

    console.log("Done")
}