import { AssemblyImage, SignInInteractivity } from "./lib/consts";

Il2Cpp.perform(() => {
    //console.log(`Unity version: ${Il2Cpp.unityVersion}`)

    // Force retire
    AssemblyImage.class("Sekai.Core.Live.SoloLiveController").method("OnExit").implementation = function()
    {
        console.log("Live finished. Setting result to Retire...")
        this.field("result").value = AssemblyImage.class("Sekai.Core.Live.LiveResult").field("Retire").value

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

    // Skip splash screen
    AssemblyImage.class("Sekai.SceneManager").method("OnInitialize").implementation = function()
    {
        this.method("OnInitialize").invoke()
        this.method("RequestScene").invoke(0)
    }

    // Playgrounds //
        // All notes are flick and critical //
            /* AssemblyImage.class("Sekai.SUS.Converter").method("ConvertNormalNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
            {
                noteInfo.value.method("set_Type").invoke(1)
                category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("Flick").value
                this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
            }

            AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFlickNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
            {
                noteInfo.value.method("set_Type").invoke(1)
                this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
            }

            AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFrictionNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
            {
                noteInfo.value.method("set_Type").invoke(1)
                category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("FrictionFlick").value
                this.method("ConvertFrictionFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
            } */
        //

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

        // Inject custom chart
        /* AssemblyImage.class("Sekai.SUS.Converter").method<Il2Cpp.Object>("Convert").implementation = function(musicScoreData: Il2Cpp.String)
        {
            const scoreData = Il2Cpp.corlib.class("System.IO.File").method<Il2Cpp.String>("ReadAllText").overload("System.String").invoke(Il2Cpp.string("/sdcard/score.sus"))
            return this.method<Il2Cpp.Object>("Convert").invoke(scoreData)
        } */

        // Override FreeLiveBootData
        /* AssemblyImage.class("Sekai.FreeLiveBootData").method("SetLiveMode").implementation = function(liveMode: number)
        {
            this.method("SetLiveMode").invoke(liveMode)

            this.method("set_IsAuto").invoke(true)
            const musicData = this.method<Il2Cpp.Object>("get_MusicData").invoke()
            musicData.method<Il2Cpp.Object>("get_Difficulty").invoke().field("musicDifficulty").value = Il2Cpp.string("master")
        } */

        // Override AudioSyncedUnityTimer
        /* AssemblyImage.class("Sekai.SoundManager").method<number>("GetAudioSyncedUnityTimer").implementation = function()
        {
            return this.method<number>("GetAudioSyncedUnityTimer").invoke() * 2.0
        } */
    //
})