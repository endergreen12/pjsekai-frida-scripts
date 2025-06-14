import { AssemblyImage, Edge, RectTransform, SystemAction } from "../lib/consts.js";
import { CreateButton, GetComponentInChildrenFromObj } from "../lib/lib.js";

Il2Cpp.perform(() => {
    let isButtonCreated = false
    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method("OnInitComponent").implementation = function()
    {
        this.method("OnInitComponent").invoke()

        if(isButtonCreated)
        {
            return
        }

        CreateButton(Edge.Top, -200, -80, 400, 100, 38, GetComponentInChildrenFromObj(this as Il2Cpp.Object, RectTransform), (button: Il2Cpp.Object) => {
            const assetBundleNamesClass = AssemblyImage.class("Sekai.AssetBundleNames")

            const assetbundleName = Il2Cpp.string("event_canvas_2022") // poor Ena
            const scenarioAssetBundleName = assetBundleNamesClass.method<Il2Cpp.String>("GetEventStoryScenarioName").invoke(assetbundleName)
            const voiceAssetBundleName = assetBundleNamesClass.method<Il2Cpp.String>("GetEventStoryVoiceBundleName").invoke(assetbundleName)
            const scenarioId = Il2Cpp.string("event_53_02")
            const episodeId = 1000424

            const onFinished = Il2Cpp.delegate(SystemAction, () => console.log("Scenario finished"))

            AssemblyImage.class("Sekai.ScenarioUtility").method("PlayScenario")
                .invoke(scenarioAssetBundleName, voiceAssetBundleName, scenarioId, onFinished, NULL, NULL, episodeId, 0, NULL)
        }, "Play Scenario")

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }
})