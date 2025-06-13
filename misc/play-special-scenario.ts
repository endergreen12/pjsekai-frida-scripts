import { AssemblyImage, RectTransform } from "../lib/consts.js";
import { CreateButton, GetComponentInChildrenFromObj, GetMasterDataManagerInstance } from "../lib/lib.js";

Il2Cpp.perform(() => {
    let isButtonCreated = false
    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method("OnInitComponent").implementation = function()
    {
        this.method("OnInitComponent").invoke()

        if(isButtonCreated)
        {
            return
        }

        CreateButton(2, -200, -80, 400, 100, 38, GetComponentInChildrenFromObj(this as Il2Cpp.Object, RectTransform), (button: Il2Cpp.Object) => {
            const masterDataManager = GetMasterDataManagerInstance()
            const specialStoryEpisode = masterDataManager.method<Il2Cpp.Object>("GetMasterSpecialStoryEpisode").invoke(56) // 一周年カウントダウンムービー01

            AssemblyImage.class("Sekai.ScenarioUtility").method("PlaySpecialStoryEpisode").invoke(specialStoryEpisode)
        }, "Play Special Scenario")

        isButtonCreated = true
    }

    AssemblyImage.class("Sekai.ScreenLayerStoryCategorySelect").method(".ctor").implementation = function()
    {
        this.method(".ctor").invoke()

        isButtonCreated = false
    }
})