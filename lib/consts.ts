import "frida-il2cpp-bridge"

// Game-related
export let Assembly: Il2Cpp.Assembly = null
export let AssemblyImage: Il2Cpp.Image = null

// corlib-related
export let SystemString: Il2Cpp.Class = null
export let SystemAction: Il2Cpp.Class = null

// Unity-related
export let CoreModule: Il2Cpp.Assembly = null
export let CoreModuleImage: Il2Cpp.Image = null
export let DebugClass: Il2Cpp.Class = null
export let Vector3: Il2Cpp.Class = null
export let Vector2: Il2Cpp.Class = null
export let RectTransform: Il2Cpp.Class = null
export let UnityAction: Il2Cpp.Class = null

export let TextMeshProImage: Il2Cpp.Image = null
export let TextMeshProUGUI: Il2Cpp.Class = null
export let TextMeshProText: Il2Cpp.Class = null
export let TextMeshProDefaultControls: Il2Cpp.Class = null

export let UnityEngineUIImage: Il2Cpp.Image = null
export let UnityEngineUIButton: Il2Cpp.Class = null

// C# enums //
    // GooglePlayGames.BasicApi.SignInInteractivity
    export const SignInInteractivity = {
        NoPrompt: 0,
        CanPromptAlways: 1,
        CanPromptOnce: 2
    } as const

    // UnityEngine.RectTransform.Edge
    export const Edge = {
        Left: 0,
        Right: 1,
        Top: 2,
        Bottom: 3
    } as const

    // Sekai.DisplayLayerType
    export const DisplayLayerType = {
        Layer_BG: 0,
        Layer_UI: 1,
        Layer_Header: 2,
        Layer_Scenario: 3,
        Layer_Dialog: 4,
        Layer_Loading: 5,
        Layer_ScreenEffect: 6,
        Layer_Overlay: 7
    } as const

    // Sekai.DialogSize
    export const DialogSize = {
        Small: 0,
        Medium: 1,
        Large: 2,
        Manual: 3
    } as const

Il2Cpp.perform(() => {
    Assembly = Il2Cpp.domain.assembly("Assembly-CSharp")
    AssemblyImage = Assembly.image

    SystemString = Il2Cpp.corlib.class("System.String")
    SystemAction = Il2Cpp.corlib.class("System.Action")
    
    CoreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule")
    CoreModuleImage = CoreModule.image
    DebugClass = CoreModuleImage.class("UnityEngine.Debug")
    Vector3 = CoreModuleImage.class("UnityEngine.Vector3")
    Vector2 = CoreModuleImage.class("UnityEngine.Vector2")
    RectTransform = CoreModuleImage.class("UnityEngine.RectTransform")
    UnityAction = CoreModuleImage.class("UnityEngine.Events.UnityAction")

    TextMeshProImage = Il2Cpp.domain.assembly("Unity.TextMeshPro").image
    TextMeshProUGUI = TextMeshProImage.class("TMPro.TextMeshProUGUI")
    TextMeshProText = TextMeshProImage.class("TMPro.TMP_Text")
    TextMeshProDefaultControls = TextMeshProImage.class("TMPro.TMP_DefaultControls")
    
    UnityEngineUIImage = Il2Cpp.domain.assembly("UnityEngine.UI").image
    UnityEngineUIButton = UnityEngineUIImage.class("UnityEngine.UI.Button")
})