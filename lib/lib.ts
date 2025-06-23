import { CoreModuleImage, RectTransform, UnityAction, Vector2, TextMeshProImage, TextMeshProUGUI, UnityEngineUIButton, TextMeshProText, SystemString, AssemblyImage, TextMeshProDefaultControls } from "./consts.js";

export function CreateButton(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, onClick: (button: Il2Cpp.Object) => void, text: string): Il2Cpp.Object
{
    // Create a button
    const resources = TextMeshProDefaultControls.nested("Resources").new()
    const button = TextMeshProDefaultControls.method<Il2Cpp.Object>("CreateButton").invoke(resources.unbox())

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildrenFromObj(button, TextMeshProUGUI)
    SetProperty(textComponent, "text", Il2Cpp.string(text))
    SetProperty(textComponent, "fontSize", fontSize)

    SetParent(GetTransform(button), parentTransform)
    SetPositionAndSizeOfRectTransform(GetComponentInChildrenFromObj(button, RectTransform), edge, x, y, sizeX, sizeY)

    const buttonComponent = GetComponentInChildrenFromObj(button, UnityEngineUIButton)

    // Set onClick callback
    GetFromProperty(buttonComponent, "onClick").method("AddListener").invoke(Il2Cpp.delegate(UnityAction, () => onClick(button)))

    return button
}

export function CreateInputField(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, onSubmit: (inputField: Il2Cpp.Object, string: string) => void, text: string, contentType: number): Il2Cpp.Object
{
    // Create new inputField
    const resources = TextMeshProDefaultControls.nested("Resources").new()
    const inputField = TextMeshProDefaultControls.method<Il2Cpp.Object>("CreateInputField").invoke(resources.unbox())

    const inputFieldComponent = GetComponentInChildrenFromObj(inputField, TextMeshProImage.class("TMPro.TMP_InputField"))

    SetParent(GetTransform(inputField), parentTransform)
    SetPositionAndSizeOfRectTransform(GetComponentInChildrenFromObj(inputField, RectTransform), edge, x, y, sizeX, sizeY)

    // Set contentType
    SetProperty(inputFieldComponent, "contentType", contentType)

    // Set text
    SetProperty(inputFieldComponent, "text", Il2Cpp.string(text))

    const textComponent = GetFromProperty(inputFieldComponent, "textComponent")

    // Set font size
    SetProperty(textComponent, "fontSize", fontSize)

    // Set onSubmit callback
    const unityActionString = CoreModuleImage.class("UnityEngine.Events.UnityAction`1").inflate(SystemString)
    const call = Il2Cpp.delegate(unityActionString, (string: Il2Cpp.String) => onSubmit(inputField, string.toString().substring(1, string.length + 1))) // Use substring to remove double quotations, and im not sure why it goes well with "length + 1" but anyway
    GetFromProperty(inputFieldComponent, "onSubmit").method("AddListener").invoke(call)

    return inputField
}

export function CreateText(edge: number, x: number, y: number, sizeX: number, sizeY: number, fontSize: number, parentTransform: Il2Cpp.Object, textStr: string): Il2Cpp.Object
{
    // Create new text
    const resources = TextMeshProDefaultControls.nested("Resources").new()
    const text = TextMeshProDefaultControls.method<Il2Cpp.Object>("CreateText").invoke(resources.unbox())

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildrenFromObj(text, TextMeshProText)
    SetProperty(textComponent, "text", Il2Cpp.string(textStr))
    SetProperty(textComponent, "fontSize", fontSize)

    SetParent(GetTransform(text), parentTransform)
    SetPositionAndSizeOfRectTransform(GetComponentInChildrenFromObj(text, RectTransform), edge, x, y, sizeX, sizeY)

    return text
}

export function SetPositionAndSizeOfRectTransform(rectTransform: Il2Cpp.Object, edge: number, x: number, y: number, sizeX: number, sizeY: number)
{
    // Set position
    rectTransform.method("SetInsetAndSizeFromParentEdge").invoke(edge, 0, 0)
    const pos = Vector2.alloc()
    pos.method(".ctor").invoke(x, y)
    SetProperty(rectTransform, "anchoredPosition", pos.unbox())

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
    targetTransform.method("SetParent", 2).invoke(parentTransform, false)
}

export function GetFromProperty<T extends Il2Cpp.Method.ReturnType = Il2Cpp.Object>(obj: Il2Cpp.Object | Il2Cpp.Class, propertyName: string): T
{
    return obj.method<T>(`get_${propertyName}`).invoke()
}

export function SetProperty(obj: Il2Cpp.Object | Il2Cpp.Class, propertyName: string, value: Il2Cpp.Parameter.Type)
{
    obj.method(`set_${propertyName}`).invoke(value)
}

export function GetInstanceOfSingleton(klass: Il2Cpp.Class): Il2Cpp.Object
{
    return GetFromProperty(klass, "Instance")
}

export function GetTransform(obj: Il2Cpp.Object): Il2Cpp.Object
{
    return GetFromProperty(obj, "transform")
}

export function GetMasterDataManagerInstance(): Il2Cpp.Object
{
    return GetInstanceOfSingleton(AssemblyImage.class("Sekai.MasterDataManager"))
}