import { AssemblyImage } from "./lib/consts.js";
const DUMP_DIR_PATH = "/sdcard/pjsekai_dumps"

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickJoinMysekai").implementation = function()
    {
        const masterDataManager = Il2Cpp.gc.choose(AssemblyImage.class("Sekai.MasterDataManager"))[0] // TODO: find a better way - btw how is masterdatamanager accessed when the game uses it??? i really couldnt figure out

        console.log("Creating a folder...")
        Il2Cpp.corlib.class("System.IO.Directory").method("CreateDirectory").invoke(Il2Cpp.string(DUMP_DIR_PATH))

        console.log("Beginning dumping...")
        const targetDataNameArray: string[] = ["MasterMusicAlls", "MasterGameCharacterList", "MasterCardMap", "MasterCharacterProfileList"]
        targetDataNameArray.forEach((targetDataName) => dump(targetDataName, `${targetDataName}.json`, masterDataManager))

        console.log("All dumps are complete!")
    }
})

function dump(targetDataName: string, dumpFileName: string, masterDataManager: Il2Cpp.Object)
{
    console.log(`Starting dumping of ${targetDataName}...`)

    const targetData = masterDataManager.method<Il2Cpp.Object>(`Get${targetDataName}`).invoke()
    const jsonSerializedData = AssemblyImage.class("CP.JsonSerializer").method<Il2Cpp.String>("ToJsonWithUnicodeDecode").invoke(targetData)

    // Write data to a file
    console.log("Writing dumped data to a file...")
    Il2Cpp.corlib.class("System.IO.File").method("WriteAllText").overload("System.String", "System.String")
        .invoke(Il2Cpp.string(DUMP_DIR_PATH + "/" + dumpFileName), jsonSerializedData)

    console.log("Done")
}