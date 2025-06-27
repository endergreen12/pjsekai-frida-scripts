import { AssemblyImage, DialogSize, DisplayLayerType, UnityAction } from "../lib/consts.js"
import { COMMON_2BUTTON_DIALOG_CLASS_NAME, CreateButton, CreateInputField, CreateText, CreateVector2, CreateVector3, GetInstanceOfSingleton, GetScreenManagerInstance, GetTransform, GetValueStateText, SetProperty, Show2ButtonDialog_1, ShowSubWindowDialog, UpdateTextOfDefaultControls } from "../lib/lib.js"
import * as autoRetire from './auto-retire.js'

Il2Cpp.perform(() => {
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

            const sizeDelta = CreateVector2(400, 100)

            const musicIdInputField = CreateInputField(String(musicId), 48, CreateVector3(-250, 150, 0), sizeDelta, 2, dialogTransform, (inputField: Il2Cpp.Object, value: string) => {
                musicId = parseInt(value)
            })
            CreateText("Music ID:", 34, CreateVector3(0, 40, 0), sizeDelta, GetTransform(musicIdInputField), "black")

            const difficultyInputField = CreateInputField(difficulty, 48, CreateVector3(250, 150, 0), sizeDelta, 4, dialogTransform, (inputField: Il2Cpp.Object, value: string) => {
                difficulty = value
            })
            CreateText("Difficulty:", 34, CreateVector3(0, 40, 0), sizeDelta, GetTransform(difficultyInputField), "black")

            const vocalIdInputField = CreateInputField(String(vocalId), 48, CreateVector3(-250, -70, 0), sizeDelta, 2, dialogTransform, (inputField: Il2Cpp.Object, value: string) => {
                vocalId = parseInt(value)
            })
            CreateText("Vocal ID:", 34, CreateVector3(0, 40, 0), sizeDelta, GetTransform(vocalIdInputField), "black")

            CreateButton(GetValueStateText("Auto Live", isAuto), 28, CreateVector3(250, -70, 0), sizeDelta, dialogTransform, (button: Il2Cpp.Object) => {
                isAuto = !isAuto
                UpdateTextOfDefaultControls(button, GetValueStateText("Auto Live", isAuto))
            })
        })

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerLiveTop").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }

    autoRetire
})