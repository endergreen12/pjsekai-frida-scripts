import { AssemblyImage, UnityAction } from "../lib/consts";
import { COMMON_2BUTTON_DIALOG_CLASS_NAME, CreateButton, CreateInputField, CreateText, CreateVector2, CreateVector3, GetComponentInChildren, GetMasterDataManagerInstance, GetTransform, Show2ButtonDialog_1, ShowSubWindowDialog } from "../lib/lib";

Il2Cpp.perform(() => {
    let isButtonCreated = false

    let episodeId: number = 8 // 一周年カウントダウンムービー01

    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method("OnInitComponent").implementation = function()
    {
        this.method("OnInitComponent").invoke()

        if(isButtonCreated)
        {
            return
        }

        CreateButton("Play Special Scenario", 38, CreateVector3(-300, 450, 0), CreateVector2(400, 100), GetTransform(this as Il2Cpp.Object), (button: Il2Cpp.Object) => {
            const dialog = Show2ButtonDialog_1(COMMON_2BUTTON_DIALOG_CLASS_NAME, 2, "empty", "WORD_OK", "WORD_CANCEL", Il2Cpp.delegate(UnityAction, () => {
                const masterDataManager = GetMasterDataManagerInstance()
                const specialStoryEpisode = masterDataManager.method<Il2Cpp.Object>("GetMasterSpecialStoryEpisode").invoke(episodeId)

                if(specialStoryEpisode.isNull())
                {
                    ShowSubWindowDialog("The specified episode could not be found.")
                    return
                }

                AssemblyImage.class("Sekai.ScenarioUtility").method("PlaySpecialStoryEpisode").invoke(specialStoryEpisode)
            }), NULL)

            const dialogTransform = GetTransform(dialog)

            const episodeIdInputField = CreateInputField(String(episodeId), 48, CreateVector3(0, 15, 0), CreateVector2(400, 100), 2, dialogTransform, (inputField: Il2Cpp.Object, value: string) => {
                episodeId = parseInt(value)
            })
            CreateText("Episode ID:", 34, CreateVector3(0, 40, 0), CreateVector2(400, 100), GetTransform(episodeIdInputField), "black")
        })

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }
})