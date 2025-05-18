import { AssemblyImage, SignInInteractivity } from "../lib/consts.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("GooglePlayGames.PlayGamesPlatform").method("Authenticate")
        .overload("GooglePlayGames.BasicApi.SignInInteractivity", "System.Action<GooglePlayGames.BasicApi.SignInStatus>")
        .implementation = function(signInInteractivity: number, callback: Il2Cpp.Object)
    {
        return this.method("Authenticate").overload("GooglePlayGames.BasicApi.SignInInteractivity", "System.Action<GooglePlayGames.BasicApi.SignInStatus>")
            .invoke(SignInInteractivity.NoPrompt, callback)
    }
})