import { AssemblyImage } from "../lib/consts.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickStory").implementation = function()
    {
        const masterDataManager = AssemblyImage.class("Sekai.MasterDataManager").method<Il2Cpp.Object>("get_Instance").invoke()
        const specialStoryEpisode = masterDataManager.method<Il2Cpp.Object>("GetMasterSpecialStoryEpisode").invoke(8) // 一周年カウントダウンムービー01

        AssemblyImage.class("Sekai.ScenarioUtility").method("PlaySpecialStoryEpisode").invoke(specialStoryEpisode)
    }
})