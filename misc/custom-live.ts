import { AssemblyImage } from "../lib/consts.js"

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickJoinMysekai").implementation = function()
    {
        // Set Sekai.Core.EntryPoint.PlayMode
        AssemblyImage.class("Sekai.Core.EntryPoint").method("set_PlayMode").invoke(3) // 3 = SoloLive
        
        // Set up liveBootData
        const liveBootData = AssemblyImage.class("Sekai.FreeLiveBootData").alloc()

        const musicId = 578 // ハローセカイ (Hello Sekai)
        const difficulty = Il2Cpp.string("master")
        const vocalId = 1572 // バーチャル・シンガーver (Virtual Singer ver.)
        const deckId = 1

        liveBootData.method(".ctor", 6).invoke(musicId, difficulty, vocalId, deckId, 0, false) // Call the constructor of Sekai.LiveBootDataBase
        liveBootData.method(".ctor", 8).invoke(musicId, difficulty, vocalId, deckId, Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), 0), true, 0, 0) // Call the constructor of Sekai.FreeLiveBootData
        liveBootData.method("SetLiveMode").invoke(3) // 3 = Low
        liveBootData.method("set_IsAuto").invoke(true)

        AssemblyImage.class("Sekai.UserDataManager").method<Il2Cpp.Object>("get_Instance").invoke().method("set_FreeLiveBootData").invoke(liveBootData)

        // Start live
        AssemblyImage.class("Sekai.ScreenManager").method<Il2Cpp.Object>("get_Instance").invoke().method("AddScreen", 1).invoke(63) // 63 = LiveLoading
    }
})