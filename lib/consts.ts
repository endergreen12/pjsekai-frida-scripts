import "frida-il2cpp-bridge"

export let Assembly: Il2Cpp.Assembly = null
export let AssemblyImage: Il2Cpp.Image = null
export let CoreModule: Il2Cpp.Assembly = null
export let CoreModuleImage: Il2Cpp.Image = null
export let DebugClass: Il2Cpp.Class = null
export let Vector3: Il2Cpp.Class = null
export let MasterDataManagerInstance: Il2Cpp.Object = null

// C# enums //
    // GooglePlayGames.BasicApi.SignInInteractivity
    export const SignInInteractivity = {
        NoPrompt: 0,
        CanPromptAlways: 1,
        CanPromptOnce: 2
    } as const

Il2Cpp.perform(() => {
    Assembly = Il2Cpp.domain.assembly("Assembly-CSharp")
    AssemblyImage = Assembly.image
    CoreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule")
    CoreModuleImage = CoreModule.image
    DebugClass = CoreModuleImage.class("UnityEngine.Debug")
    Vector3 = CoreModuleImage.class("UnityEngine.Vector3")
    MasterDataManagerInstance = Il2Cpp.gc.choose(AssemblyImage.class("Sekai.MasterDataManager"))[0]
})