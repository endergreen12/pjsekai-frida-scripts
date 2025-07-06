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
export let UnityAction: Il2Cpp.Class = null

export let UnityEngineUIImage: Il2Cpp.Image = null
export let UnityEngineUIButton: Il2Cpp.Class = null

export let TMPInputField: Il2Cpp.Class = null

// C# enums //
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
    UnityAction = CoreModuleImage.class("UnityEngine.Events.UnityAction")

    UnityEngineUIImage = Il2Cpp.domain.assembly("UnityEngine.UI").image
    UnityEngineUIButton = UnityEngineUIImage.class("UnityEngine.UI.Button")

    TMPInputField = Il2Cpp.domain.assembly("Unity.TextMeshPro").image.class("TMPro.TMP_InputField")
})