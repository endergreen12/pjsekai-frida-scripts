import { CoreModuleImage, RectTransform } from "./consts.js";

export function CreateButton(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, onClick: (button: Il2Cpp.Object) => void, text: string): Il2Cpp.Object
{
    const UnityEngineUI = Il2Cpp.domain.assembly("UnityEngine.UI").image
    const UnityTextMeshPro = Il2Cpp.domain.assembly("Unity.TextMeshPro").image
    const DefaultControls = Il2Cpp.domain.assembly("Unity.TextMeshPro").image.class("TMPro.TMP_DefaultControls")
    const Vector2 = CoreModuleImage.class("UnityEngine.Vector2")
    const UnityAction = CoreModuleImage.class("UnityEngine.Events.UnityAction")

    // Create a button
    const resources = DefaultControls.nested("Resources").new()
    const button = DefaultControls.method<Il2Cpp.Object>("CreateButton").invoke(resources.unbox())

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildrenFromObj(button, UnityTextMeshPro.class("TMPro.TextMeshProUGUI"))
    textComponent.method("set_text").invoke(Il2Cpp.string(text))
    textComponent.method("set_fontSize").invoke(fontSize)

    const rectTransform = GetComponentInChildrenFromObj(button, RectTransform)

    // Set position of the button
    rectTransform.method("SetInsetAndSizeFromParentEdge").invoke(edge, 0, 0)
    const pos = Vector2.alloc()
    pos.method(".ctor").invoke(x, y)
    rectTransform.method("set_anchoredPosition").invoke(pos.unbox())

    // Set size of the button
    rectTransform.method("SetSizeWithCurrentAnchors").invoke(0, sizeX)
    rectTransform.method("SetSizeWithCurrentAnchors").invoke(1, sizeY)

    // Set onClick callback
    const buttonComponent = button.method<Il2Cpp.Object>("GetComponent", 0).inflate(UnityEngineUI.class("UnityEngine.UI.Button")).invoke()
    buttonComponent.method<Il2Cpp.Object>("get_onClick").invoke().method("AddListener").invoke(Il2Cpp.delegate(UnityAction, () => onClick(button)))

    // Set transform of the button to parentTransform
    SetParent(button.method<Il2Cpp.Object>("get_transform").invoke(), parentTransform)

    return button
}

export function GetComponentInChildrenFromObj(obj: Il2Cpp.Object, klass: Il2Cpp.Class): Il2Cpp.Object
{
    return obj.method<Il2Cpp.Object>("GetComponentInChildren", 0).inflate(klass).invoke()
}

export function SetParent(targetTransform: Il2Cpp.Object, parentTransform: Il2Cpp.Object)
{
    targetTransform.method("SetParent").overload("UnityEngine.Transform", "System.Boolean").invoke(parentTransform, false)
}