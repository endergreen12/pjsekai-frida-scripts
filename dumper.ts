import { AssemblyImage } from "./lib/consts.js";
const DUMP_DIR_PATH = "/sdcard/pjsekai_dumps"

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickJoinMysekai").implementation = function()
    {
        const masterDataManager = AssemblyImage.class("Sekai.MasterDataManager").method<Il2Cpp.Object>("get_Instance").invoke()

        console.log("Creating a folder...")
        Il2Cpp.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp.string(DUMP_DIR_PATH))

        console.log("Beginning dumping...")
        const targetDataNameArray: string[] = ["MasterMusicAlls", "MasterEventStories", "MasterSpecialStoryMap", "MasterUnitStoryEpisodeAll"]
        targetDataNameArray.forEach((targetDataName) => dump(targetDataName, `${targetDataName}.json`, masterDataManager))

        console.log("All dumps are complete!")
    }
})

function dump(targetDataName: string, dumpFileName: string, masterDataManager: Il2Cpp.Object)
{
    console.log(`Starting dumping of ${targetDataName}...`)

    const targetData = masterDataManager.method<Il2Cpp.Object>(`Get${targetDataName}`).invoke()
    const jsonSerializedData = AssemblyImage.class("CP.JsonSerializer").method<Il2Cpp.String>("ToJsonWithUnicodeDecode").invoke(targetData)

    console.log("Writing dumped data to a file...")
    Il2Cpp.corlib.class("System.IO.File").method("WriteAllText").overload("System.String", "System.String")
        .invoke(Il2Cpp.string(DUMP_DIR_PATH + "/" + dumpFileName), jsonSerializedData)

    console.log("Done")
}