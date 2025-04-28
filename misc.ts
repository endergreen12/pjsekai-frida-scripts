import { AssemblyImage, SignInInteractivity } from "./lib/consts.js";

Il2Cpp.perform(() => {
    //console.log(`Unity version: ${Il2Cpp.unityVersion}`)

    // Forcing retire
    AssemblyImage.class("Sekai.Core.Live.SoloLiveController").method<number>("GetLiveResultAnimationType").implementation = function()
    {
        const result = this.method<number>("GetLiveResultAnimationType").invoke()
        console.log("Setting result to Retire...")
        this.field("result").value = AssemblyImage.class("Sekai.Core.Live.LiveResult").field("Retire").value
        return result
    }

    // Supress Google Play Games authentication prompt
    AssemblyImage.class("GooglePlayGames.PlayGamesPlatform").method("Authenticate")
        .overload("GooglePlayGames.BasicApi.SignInInteractivity", "System.Action<GooglePlayGames.BasicApi.SignInStatus>")
        .implementation = function(signInInteractivity: number, callback: Il2Cpp.Object)
    {
        return this.method("Authenticate").overload("GooglePlayGames.BasicApi.SignInInteractivity", "System.Action<GooglePlayGames.BasicApi.SignInStatus>")
            .invoke(SignInInteractivity.NoPrompt, callback)
    }

    // Playgrounds
    // All normal notes are flick and critical
    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertNormalNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        noteInfo.value.method("set_Type").invoke(1)
        category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("Flick").value
        this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    // Fake Gacha
    AssemblyImage.class("Sekai.ScreenLayerHome").method("OnClickGacha").implementation = function()
    {
        const response = AssemblyImage.class("Sekai.UserGachaResponse").new()
        response.field("consumedCosts").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserResource"), 0)
        response.field("obtainGachaBonusItems").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserResource"), 0)
        response.field("obtainGachaCeilItems").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserResource"), 0)
        response.field("obtainGachaExtras").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserResource"), 0)
        response.field("obtainGachaFreebies").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserGachaFreebie"), 0)
        response.field("obtainPrizes").value = Il2Cpp.array(AssemblyImage.class("Sekai.UserGachaSpinObtainPrize"), 0)
        response.field("updatedResources").value = AssemblyImage.class("Sekai.SuiteUser").new()
        response.field("userGacha").value = AssemblyImage.class("Sekai.UserGacha").new()

        const masterGacha = AssemblyImage.class("Sekai.GachaUtility").method<Il2Cpp.Object>("GetMasterGachaOf").invoke(593)
        const behavior = masterGacha.field<Il2Cpp.Array<Il2Cpp.Object>>("gachaBehaviors").value.get(0)

        AssemblyImage.class("Sekai.GachaUtility").method("TransitionSpinAnimation").invoke(response, masterGacha, behavior)
    }
})