import { AssemblyImage, DialogSize, DisplayLayerType, SystemAction, UnityAction } from "../lib/consts";
import { COMMON_2BUTTON_DIALOG_CLASS_NAME, CreateButton, CreateOptionInputField, CreateVector2, CreateVector3, GetTransform, Show2ButtonDialog_1 } from "../lib/lib";

Il2Cpp.perform(() => {
    let isButtonCreated = false

    let assetbundleName = "event_canvas_2022" // poor Ena
    let scenarioId = "event_53_02"
    let episodeId = 1000424
    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method("OnInitComponent").implementation = function()
    {
        this.method("OnInitComponent").invoke()

        if(isButtonCreated)
        {
            return
        }

        CreateButton("Play Scenario", 38, CreateVector3(-300, 450, 0), CreateVector2(400, 100), GetTransform(this as Il2Cpp.Object), (button: Il2Cpp.Object) => {
            const dialog = Show2ButtonDialog_1(COMMON_2BUTTON_DIALOG_CLASS_NAME, 2, "empty", "WORD_OK", "WORD_CANCEL", Il2Cpp.delegate(UnityAction, () => {
                const assetBundleNamesClass = AssemblyImage.class("Sekai.AssetBundleNames")

                const scenarioAssetBundleName = assetBundleNamesClass.method<Il2Cpp.String>("GetEventStoryScenarioName").invoke(Il2Cpp.string(assetbundleName))
                const voiceAssetBundleName = assetBundleNamesClass.method<Il2Cpp.String>("GetEventStoryVoiceBundleName").invoke(Il2Cpp.string(assetbundleName))

                const onFinished = Il2Cpp.delegate(SystemAction, () => console.log("Scenario finished"))

                AssemblyImage.class("Sekai.ScenarioUtility").method("PlayScenario")
                    .invoke(scenarioAssetBundleName, voiceAssetBundleName, Il2Cpp.string(scenarioId), onFinished, NULL, NULL, episodeId, 0, NULL)
            }), NULL, DisplayLayerType.Layer_Dialog, DialogSize.Medium)

            const dialogTransform = GetTransform(dialog)

            const sharedSizeDelta = CreateVector2(400, 100)
            
            CreateOptionInputField(assetbundleName, (value: string) => assetbundleName = value, "Asset Bundle Name:", 48, 28, CreateVector3(-250, 150, 0), sharedSizeDelta, dialogTransform)
            CreateOptionInputField(scenarioId, (value: string) => scenarioId = value, "Scenario ID:", 48, 28, CreateVector3(250, 150, 0), sharedSizeDelta, dialogTransform)
            CreateOptionInputField(episodeId, (value: number) => episodeId = value, "Episode ID:", 48, 28, CreateVector3(-250, -70, 0), sharedSizeDelta, dialogTransform)
        })

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }
})