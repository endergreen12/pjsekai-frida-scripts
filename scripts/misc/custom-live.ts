import { AssemblyImage, DialogSize, DisplayLayerType, UnityAction } from "../lib/consts"
import { COMMON_2BUTTON_DIALOG_CLASS_NAME, CreateButton, CreateOptionInputField, CreateOptionToggleButton, CreateVector2, CreateVector3, GetInstanceOfSingleton, GetScreenManagerInstance, GetTransform, SetProperty, Show2ButtonDialog_1, ShowSubWindowDialog } from "../lib/lib"
import { ChangeImpl_AutoRetire } from "./auto-retire"

Il2Cpp.perform(() => {
    ChangeImpl_AutoRetire()
    
    let isButtonCreated = false

    let musicId = 578 // ハローセカイ (Hello Sekai)
    let difficulty = "master"
    let vocalId = 1572 // バーチャル・シンガーver (Virtual Singer ver.)
    const deckId = 1
    let isAuto: boolean = false

    AssemblyImage.class("Sekai.ScreenLayerLiveTop").method("OnInitComponent").implementation = function()
    {
        this.method("OnInitComponent").invoke()

        if(isButtonCreated)
        {
            return
        }

        CreateButton("Custom Live", 38, CreateVector3(-150, 400, 0), CreateVector2(400, 100), GetTransform(this as Il2Cpp.Object), (button: Il2Cpp.Object) => {
            const dialog = Show2ButtonDialog_1(COMMON_2BUTTON_DIALOG_CLASS_NAME, 2, "empty", "WORD_OK", "WORD_CANCEL", Il2Cpp.delegate(UnityAction, () => {
                if(AssemblyImage.class("Sekai.MusicUtility").method<Il2Cpp.Object>("GetMasterMusicAllAt").invoke(musicId).isNull()) // Check whether the music the user specified exists
                {
                    ShowSubWindowDialog("The specified music could not be found.")
                    return
                }

                // Set Sekai.Core.EntryPoint.PlayMode
                SetProperty(AssemblyImage.class("Sekai.Core.EntryPoint"), "PlayMode", 3) // 3 = SoloLive
                
                // Set up liveBootData
                const liveBootData = AssemblyImage.class("Sekai.FreeLiveBootData").alloc()

                liveBootData.method(".ctor", 6).invoke(musicId, Il2Cpp.string(difficulty), vocalId, deckId, 0, false) // Call the constructor of Sekai.LiveBootDataBase
                liveBootData.method(".ctor", 8).invoke(musicId, Il2Cpp.string(difficulty), vocalId, deckId, Il2Cpp.array(Il2Cpp.corlib.class("System.Int32"), 0), true, 0, 0) // Call the constructor of Sekai.FreeLiveBootData
                liveBootData.method("SetLiveMode").invoke(3) // 3 = Low
                SetProperty(liveBootData, "IsAuto", isAuto)

                SetProperty(GetInstanceOfSingleton(AssemblyImage.class("Sekai.UserDataManager")), "FreeLiveBootData", liveBootData)

                // Start live
                GetScreenManagerInstance().method("AddScreen", 1).invoke(63) // 63 = LiveLoading
                }), NULL, DisplayLayerType.Layer_Dialog, DialogSize.Medium)

            const dialogTransform = GetTransform(dialog)

            const sharedSizeDelta = CreateVector2(400, 100)

            CreateOptionInputField(musicId, (value: number) => musicId = value, "Music ID:", 48, 34, CreateVector3(-250, 150, 0), sharedSizeDelta, dialogTransform)
            CreateOptionInputField(difficulty, (value: string) => difficulty = value, "Difficulty:", 48, 34, CreateVector3(250, 150, 0), sharedSizeDelta, dialogTransform)
            CreateOptionInputField(vocalId, (value: number) => vocalId = value, "Vocal ID:", 48, 34, CreateVector3(-250, -70, 0), sharedSizeDelta, dialogTransform)
            CreateOptionToggleButton(isAuto, () => {isAuto = !isAuto; return isAuto}, "Auto Live", 28, CreateVector3(250, -70, 0), sharedSizeDelta, dialogTransform)
        })

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerLiveTop").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }
})