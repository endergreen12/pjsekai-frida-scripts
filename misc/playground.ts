import { AssemblyImage } from "../lib/consts.js";
import { GetInstanceOfSingleton, GetScreenManagerInstance } from "../lib/lib.js";

Il2Cpp.perform(() => {
    // Fake Gacha
    /* AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickGacha").implementation = function()
    {
        const response = AssemblyImage.class("Sekai.UserGachaResponse").new()

        const prize = AssemblyImage.class("Sekai.UserGachaSpinObtainPrize").new()
        prize.field("card").value = AssemblyImage.class("Sekai.UserResource").new()
        prize.field<Il2Cpp.Object>("card").value.method(".ctor")
                .overload("System.Int32", "Sekai.Constants.ResourceType", "System.Int32", "System.Int32").invoke(999, 8, 0, 0)
        prize.field("newFlg").value = true

        response.field("obtainPrizes").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserGachaSpinObtainPrize"), [prize])

        const masterGacha = AssemblyImage.class("Sekai.GachaUtility").method<Il2Cpp.Object>("GetMasterGachaOf").invoke(593)
        const behavior = masterGacha.field<Il2Cpp.Array<Il2Cpp.Object>>("gachaBehaviors").value.get(0)

        AssemblyImage.class("Sekai.GachaUtility").method("TransitionSpinAnimation").invoke(response, masterGacha, behavior)
    } */

    // use mysekai button to execute whatever
    /* AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickJoinMysekai").implementation = function()
    {

    } */
        
    // Go to OutGame scene anytime with back button
    /* AssemblyImage.class("Sekai.ScreenManager").method("OnBackKey").implementation = function(results: Il2Cpp.Object)
    {
        GetScreenManagerInstance().method("RequestScene").invoke(0)
    } */
    
    // Supress communication error dialog
    /* AssemblyImage.class("Sekai.DialogUtility").method("ShowApiError2ButtonDialog").implementation = function()
    {
        return NULL
    } */

    // Inject custom chart
    /* AssemblyImage.class("Sekai.SUS.Converter").method<Il2Cpp.Object>("Convert").implementation = function(musicScoreData: Il2Cpp.String)
    {
        const scoreData = Il2Cpp.corlib.class("System.IO.File").method<Il2Cpp.String>("ReadAllText").overload("System.String").invoke(Il2Cpp.string("/sdcard/score.sus"))
        return this.method<Il2Cpp.Object>("Convert").invoke(scoreData)
    } */

    // Override AudioSyncedUnityTimer
    /* AssemblyImage.class("Sekai.SoundManager").method<number>("GetAudioSyncedUnityTimer").implementation = function()
    {
        return this.method<number>("GetAudioSyncedUnityTimer").invoke() * 2.0
    } */

    // Change MusicInfoView arguments
    /* AssemblyImage.class("Sekai.Live.MusicInfoView").method("Play").implementation = function(durationScale: number, disableOnlyJacketOnFinish: boolean, bgFadeoutDuration: number)
    {
        this.method("Play").invoke(durationScale * 0.5, disableOnlyJacketOnFinish, bgFadeoutDuration)
    } */
})
