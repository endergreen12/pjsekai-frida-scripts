import { AssemblyImage, SignInInteractivity } from "./consts.js";

//console.log(`Unity version: ${Il2Cpp.unityVersion}`)

// Force retire on exit
AssemblyImage.class("Sekai.Core.Live.SoloLiveController").method("OnExit").implementation = function()
{
    console.log("Live finished. Force retiring...")
    this.method("OnRetireByMySelf").invoke()
    this.method("OnExit").invoke()
}

// Supress Google Play Games authentication prompt
AssemblyImage.class("GooglePlayGames.PlayGamesPlatform").method("Authenticate")
    .overload("GooglePlayGames.BasicApi.SignInInteractivity", "System.Action<GooglePlayGames.BasicApi.SignInStatus>")
    .implementation = function(signInInteractivity: number, callback: Il2Cpp.Object)
{
    return this.method("Authenticate").overload("GooglePlayGames.BasicApi.SignInInteractivity", "System.Action<GooglePlayGames.BasicApi.SignInStatus>")
        .invoke(SignInInteractivity.NoPrompt, callback)
}

// Override interesting function implementations //
    /* AssemblyImage.class("Sekai.Core.Live.ScoreLogic").method("Damage").implementation = function(noteInfo: Il2Cpp.Object)
    {
        this.method("Damage").invoke(noteInfo)
    } */

    /* AssemblyImage.class("Sekai.Live.LiveConfig").method<Il2Cpp.Object>("GetJudgeResultInternal").implementation = function(offset: number, judgeFrameType: number, isDirection: boolean)
    {
        return this.method<Il2Cpp.Object>("GetJudgeResultInternal").invoke(offset, judgeFrameType, isDirection)
    } */

    /* AssemblyImage.class("Sekai.Core.Live.LiveLogic").method<number>("CalcNoteSpeedRatio").implementation = function(currentProgress: number, noteProgress: number)
    {
        return this.method<number>("CalcNoteSpeedRatio").invoke(currentProgress, noteProgress)
    } */

    /* AssemblyImage.class("Sekai.Live.MusicInfoView").method("Play").implementation = function(durationScale: number, disableOnlyJacketOnFinish: boolean, bgFadeoutDuration: number)
    {
        this.method("Play").invoke(durationScale, disableOnlyJacketOnFinish, bgFadeoutDuration)
    } */

    /* AssemblyImage.class("Sekai.SUS.Converter").method<Il2Cpp.Object>("Convert").implementation = function(musicScoreData: Il2Cpp.String)
    {
        const scoreData = this.method<Il2Cpp.Object>("Convert").invoke(musicScoreData)
        return scoreData
    } */