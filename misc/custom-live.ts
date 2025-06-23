import { AssemblyImage, Edge, RectTransform } from "../lib/consts.js"
import { CreateButton, GetComponentInChildrenFromObj, GetInstanceOfSingleton, GetScreenManagerInstance, SetProperty } from "../lib/lib.js"

Il2Cpp.perform(() => {
    let isButtonCreated = false
    AssemblyImage.class("Sekai.ScreenLayerLiveTop").method("OnInitComponent").implementation = function()
    {
        this.method("OnInitComponent").invoke()

        if(isButtonCreated)
        {
            return
        }

        CreateButton(Edge.Top, -200, -80, 400, 100, 38, GetComponentInChildrenFromObj(this as Il2Cpp.Object, RectTransform), (button: Il2Cpp.Object) => {
            // Set Sekai.Core.EntryPoint.PlayMode
            SetProperty(AssemblyImage.class("Sekai.Core.EntryPoint"), "PlayMode", 3) // 3 = SoloLive
            
            // Set up liveBootData
            const liveBootData = AssemblyImage.class("Sekai.FreeLiveBootData").alloc()

            const musicId = 578 // ハローセカイ (Hello Sekai)
            const difficulty = Il2Cpp.string("master")
            const vocalId = 1572 // バーチャル・シンガーver (Virtual Singer ver.)
            const deckId = 1

            liveBootData.method(".ctor", 6).invoke(musicId, difficulty, vocalId, deckId, 0, false) // Call the constructor of Sekai.LiveBootDataBase
            liveBootData.method(".ctor", 8).invoke(musicId, difficulty, vocalId, deckId, Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), 0), true, 0, 0) // Call the constructor of Sekai.FreeLiveBootData
            liveBootData.method("SetLiveMode").invoke(3) // 3 = Low
            SetProperty(liveBootData, "IsAuto", true)

            SetProperty(GetInstanceOfSingleton(AssemblyImage.class("Sekai.UserDataManager")), "FreeLiveBootData", liveBootData)

            // Start live
            GetScreenManagerInstance().method("AddScreen", 1).invoke(63) // 63 = LiveLoading
        }, "Start Live")

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerLiveTop").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }
})