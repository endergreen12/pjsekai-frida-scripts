import { CoreModuleImage, RectTransform, UnityAction, Vector2 } from "./consts.js";

const DefaultControls = Il2Cpp.domain.assembly("Unity.TextMeshPro").image.class("TMPro.TMP_DefaultControls")
const TextMeshPro = Il2Cpp.domain.assembly("Unity.TextMeshPro").image

export function CreateButton(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, onClick: (button: Il2Cpp.Object) => void, text: string): Il2Cpp.Object
{
    // Create a button
    const resources = DefaultControls.nested("Resources").new()
    const button = DefaultControls.method<Il2Cpp.Object>("CreateButton").invoke(resources.unbox())

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildrenFromObj(button, TextMeshPro.class("TMPro.TextMeshProUGUI"))
    textComponent.method("set_text").invoke(Il2Cpp.string(text))
    textComponent.method("set_fontSize").invoke(fontSize)

    SetPositionAndSizeOfRectTransform(GetComponentInChildrenFromObj(button, RectTransform), edge, x, y, sizeX, sizeY)

    const buttonComponent = GetComponentInChildrenFromObj(button, Il2Cpp.domain.assembly("UnityEngine.UI").image.class("UnityEngine.UI.Button"))

    // Set onClick callback
    buttonComponent.method<Il2Cpp.Object>("get_onClick").invoke().method("AddListener")
        .invoke(Il2Cpp.delegate(UnityAction, () => onClick(button)))

    // Set transform of the button to parentTransform
    SetParent(button.method<Il2Cpp.Object>("get_transform").invoke(), parentTransform)

    return button
}

export function CreateInputField(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, onSubmit: (inputField: Il2Cpp.Object, string: string) => void, text: string, contentType: number): Il2Cpp.Object
{
    // Create new inputField
    const resources = DefaultControls.nested("Resources").new()
    const inputField = DefaultControls.method<Il2Cpp.Object>("CreateInputField").invoke(resources.unbox())

    const inputFieldComponent = GetComponentInChildrenFromObj(inputField, TextMeshPro.class("TMPro.TMP_InputField"))

    SetPositionAndSizeOfRectTransform(GetComponentInChildrenFromObj(inputField, RectTransform), edge, x, y, sizeX, sizeY)

    // Set contentType
    inputFieldComponent.method("set_contentType").invoke(contentType)

    // Set text
    inputFieldComponent.method("set_text").invoke(Il2Cpp.string(text))

    const textComponent = inputFieldComponent.method<Il2Cpp.Object>("get_textComponent").invoke()

    // Set font size
    textComponent.method("set_fontSize").invoke(fontSize)

    // Set onSubmit callback
    const unityActionString = CoreModuleImage.class("UnityEngine.Events.UnityAction`1").inflate(Il2Cpp.corlib.class("System.String"))
    const call = Il2Cpp.delegate(unityActionString, (string: Il2Cpp.String) => onSubmit(inputField, string.toString().substring(1, string.length + 1))) // Use substring to remove double quotations, and im not sure why it goes well with "length + 1" but anyway
    inputFieldComponent.method<Il2Cpp.Object>("get_onSubmit").invoke().method("AddListener").invoke(call)

    SetParent(inputField.method<Il2Cpp.Object>("get_transform").invoke(), parentTransform)

    return inputField
}

export function CreateText(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, textStr: string): Il2Cpp.Object
{
    // Create new text
    const resources = DefaultControls.nested("Resources").new()
    const text = DefaultControls.method<Il2Cpp.Object>("CreateText").invoke(resources.unbox())

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildrenFromObj(text, TextMeshPro.class("TMPro.TMP_Text"))
    textComponent.method("set_text").invoke(Il2Cpp.string(textStr))
    textComponent.method("set_fontSize").invoke(fontSize)

    SetPositionAndSizeOfRectTransform(GetComponentInChildrenFromObj(text, RectTransform), edge, x, y, sizeX, sizeY)

    // Set transform of the button to parentTransform
    SetParent(text.method<Il2Cpp.Object>("get_transform").invoke(), parentTransform)

    return text
}

export function SetPositionAndSizeOfRectTransform(rectTransform: Il2Cpp.Object, edge: number, x: number, y: number, sizeX: number, sizeY: number)
{
    // Set position
    rectTransform.method("SetInsetAndSizeFromParentEdge").invoke(edge, 0, 0)
    const pos = Vector2.alloc()
    pos.method(".ctor").invoke(x, y)
    rectTransform.method("set_anchoredPosition").invoke(pos.unbox())

    // Set size
    rectTransform.method("SetSizeWithCurrentAnchors").invoke(0, sizeX)
    rectTransform.method("SetSizeWithCurrentAnchors").invoke(1, sizeY)
}

export function GetComponentInChildrenFromObj(obj: Il2Cpp.Object, klass: Il2Cpp.Class): Il2Cpp.Object
{
    return obj.method<Il2Cpp.Object>("GetComponentInChildren", 0).inflate(klass).invoke()
}

export function SetParent(targetTransform: Il2Cpp.Object, parentTransform: Il2Cpp.Object)
{
    targetTransform.method("SetParent").overload("UnityEngine.Transform", "System.Boolean").invoke(parentTransform, false)
}