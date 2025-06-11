import { AssemblyImage, SystemAction } from "../lib/consts.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickStory").implementation = function()
    {
        const assetBundleNamesClass = AssemblyImage.class("Sekai.AssetBundleNames")

        const assetbundleName = Il2Cpp.string("event_canvas_2022") // poor Ena
        const scenarioAssetBundleName = assetBundleNamesClass.method<Il2Cpp.String>("GetEventStoryScenarioName").invoke(assetbundleName)
        const voiceAssetBundleName = assetBundleNamesClass.method<Il2Cpp.String>("GetEventStoryVoiceBundleName").invoke(assetbundleName)
        const scenarioId = Il2Cpp.string("event_53_02")
        const episodeId = 1000424

        const onFinished = Il2Cpp.delegate(SystemAction, () => console.log("Scenario finished"))

        AssemblyImage.class("Sekai.ScenarioUtility").method("PlayScenario")
            .invoke(scenarioAssetBundleName, voiceAssetBundleName, scenarioId, onFinished, NULL, NULL, episodeId, 0, NULL)
    }
})