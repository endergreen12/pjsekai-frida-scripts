import "frida-il2cpp-bridge"

export const Assembly = Il2Cpp.domain.assembly("Assembly-CSharp")
export const AssemblyImage = Assembly.image
export const CoreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule")
export const CoreModuleImage = CoreModule.image
export const DebugClass = CoreModuleImage.class("UnityEngine.Debug")
export const Vector3 = CoreModuleImage.class("UnityEngine.Vector3")
export const MasterDataManagerInstace = Il2Cpp.gc.choose(AssemblyImage.class("Sekai.MasterDataManager"))[0]

// C# enums //
    // GooglePlayGames.BasicApi.SignInInteractivity
    export const SignInInteractivity = {
        NoPrompt: 0,
        CanPromptAlways: 1,
        CanPromptOnce: 2
    } as const

    // Sekai.Live.NoteCategory
    export const NoteCategory = {
        Normal: 0,
        Long: 1,
        Connection: 2,
        Flick: 3,
        Friction: 4,
        FrictionHide: 5,
        FrictionLong: 6,
        FrictionHideLong: 7,
        FrictionFlick: 8,
        Guide: 9,
        GuideEnd: 10,
        GuideHidden: 11,
        Combo: 12,
        Hidden: 13,
        Skip: 14,
        Error: 15
    } as const