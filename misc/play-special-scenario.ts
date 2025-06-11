import { AssemblyImage } from "../lib/consts.js";
import { GetMasterDataManagerInstance } from "../lib/lib.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickStory").implementation = function()
    {
        const masterDataManager = GetMasterDataManagerInstance()
        const specialStoryEpisode = masterDataManager.method<Il2Cpp.Object>("GetMasterSpecialStoryEpisode").invoke(8) // 一周年カウントダウンムービー01

        AssemblyImage.class("Sekai.ScenarioUtility").method("PlaySpecialStoryEpisode").invoke(specialStoryEpisode)
    }
})