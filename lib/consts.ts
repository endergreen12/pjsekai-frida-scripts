import "frida-il2cpp-bridge"

export let AssemblyImage: Il2Cpp.Image = null

export let SystemString: Il2Cpp.Class = null
export let SystemAction: Il2Cpp.Class = null

export let CoreModuleImage: Il2Cpp.Image = null
export let UnityAction: Il2Cpp.Class = null
export let UnityEngineUIButton: Il2Cpp.Class = null
export let UnityEngineInput: Il2Cpp.Class = null

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
    AssemblyImage = Il2Cpp.domain.assembly("Assembly-CSharp").image

    SystemString = Il2Cpp.corlib.class("System.String")
    SystemAction = Il2Cpp.corlib.class("System.Action")
    
    CoreModuleImage = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image
    UnityAction = CoreModuleImage.class("UnityEngine.Events.UnityAction")
    UnityEngineUIButton = Il2Cpp.domain.assembly("UnityEngine.UI").image.class("UnityEngine.UI.Button")
    UnityEngineInput = Il2Cpp.domain.assembly("UnityEngine.InputLegacyModule").image.class("UnityEngine.Input")

    TMPInputField = Il2Cpp.domain.assembly("Unity.TextMeshPro").image.class("TMPro.TMP_InputField")
})