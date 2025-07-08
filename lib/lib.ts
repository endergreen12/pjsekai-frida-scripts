import { CoreModuleImage, UnityAction, UnityEngineUIButton, SystemString, AssemblyImage, DialogSize, DisplayLayerType, TMPInputField } from "./consts";

let TextMeshProImage: Il2Cpp.Image = null
let TextMeshProUGUI: Il2Cpp.Class = null
let TextMeshProText: Il2Cpp.Class = null
let TextMeshProDefaultControls: Il2Cpp.Class = null
Il2Cpp.perform(() => {
    TextMeshProImage = Il2Cpp.domain.assembly("Unity.TextMeshPro").image
    TextMeshProUGUI = TextMeshProImage.class("TMPro.TextMeshProUGUI")
    TextMeshProText = TextMeshProImage.class("TMPro.TMP_Text")
    TextMeshProDefaultControls = TextMeshProImage.class("TMPro.TMP_DefaultControls")
})

export function CreateButton(text: string, fontSize: number, localPosition: Il2Cpp.Object, sizeDelta: Il2Cpp.Object, parentTransform: Il2Cpp.Object, onClick: (button: Il2Cpp.Object) => void): Il2Cpp.Object
{
    // Create a button
    const resources = TextMeshProDefaultControls.nested("Resources").new()
    const button = TextMeshProDefaultControls.method<Il2Cpp.Object>("CreateButton").invoke(resources.unbox())

    SetupRectTransform(GetTransform(button), parentTransform, localPosition, sizeDelta)

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildren(button, TextMeshProUGUI)
    SetProperty(textComponent, "text", Il2Cpp.string(text))
    SetProperty(textComponent, "fontSize", fontSize)

    // Set onClick callback
    GetProperty(GetComponentInChildren(button, UnityEngineUIButton), "onClick")
        .method("AddListener").invoke(Il2Cpp.delegate(UnityAction, () => onClick(button)))

    return button
}

export function CreateInputField(text: string, fontSize: number, localPosition: Il2Cpp.Object, sizeDelta: Il2Cpp.Object, contentType: number, parentTransform: Il2Cpp.Object, onSubmit: (inputField: Il2Cpp.Object, value: string) => void): Il2Cpp.Object
{
    // Create new inputField
    const resources = TextMeshProDefaultControls.nested("Resources").new()
    const inputField = TextMeshProDefaultControls.method<Il2Cpp.Object>("CreateInputField").invoke(resources.unbox())

    SetupRectTransform(GetTransform(inputField), parentTransform, localPosition, sizeDelta)

    const inputFieldComponent = GetComponentInChildren(inputField, TextMeshProImage.class("TMPro.TMP_InputField"))

    // Set contentType
    SetProperty(inputFieldComponent, "contentType", contentType)

    // Set text
    SetProperty(inputFieldComponent, "text", Il2Cpp.string(text))

    const textComponent = GetProperty(inputFieldComponent, "textComponent")

    // Set font size
    SetProperty(textComponent, "fontSize", fontSize)

    // Set onSubmit callback
    const unityActionString = CoreModuleImage.class("UnityEngine.Events.UnityAction`1").inflate(SystemString)
    const call = Il2Cpp.delegate(unityActionString, (value: Il2Cpp.String) => onSubmit(inputField, value.toString().substring(1, value.length + 1))) // Use substring to remove double quotations, and im not sure why it goes well with "length + 1" but anyway
    GetProperty(inputFieldComponent, "onSubmit").method("AddListener").invoke(call)

    return inputField
}

export function CreateText(textStr: string, fontSize: number, localPosition: Il2Cpp.Object, sizeDelta: Il2Cpp.Object, parentTransform: Il2Cpp.Object, color: string = ""): Il2Cpp.Object
{
    // Create new text
    const resources = TextMeshProDefaultControls.nested("Resources").new()
    const text = TextMeshProDefaultControls.method<Il2Cpp.Object>("CreateText").invoke(resources.unbox())

    SetupRectTransform(GetTransform(text), parentTransform, localPosition, sizeDelta)

    // Set text and fontSize of the button
    const textComponent = GetComponentInChildren(text, TextMeshProText)
    SetProperty(textComponent, "text", Il2Cpp.string(textStr))
    SetProperty(textComponent, "fontSize", fontSize)

    if(color != "")
    {
        SetProperty(textComponent, "color", GetProperty(CoreModuleImage.class("UnityEngine.Color"), color))
    }

    return text
}

export function UpdateTextOfDefaultControls(obj: Il2Cpp.Object, text: string)
{
    SetProperty(GetComponentInChildren(obj, TextMeshProUGUI), "text", Il2Cpp.string(text))
}

function SetupRectTransform(rectTransform: Il2Cpp.Object, parentTransform: Il2Cpp.Object, localPos: Il2Cpp.Object, sizeDelta: Il2Cpp.Object)
{
    SetParent(rectTransform, parentTransform)
    SetProperty(rectTransform, "localPosition", localPos.unbox())
    SetProperty(rectTransform, "sizeDelta", sizeDelta.unbox())
}

export function GetComponentInChildren(obj: Il2Cpp.Object, klass: Il2Cpp.Class): Il2Cpp.Object
{
    return obj.method<Il2Cpp.Object>("GetComponentInChildren", 0).inflate(klass).invoke()
}

export function SetParent(targetTransform: Il2Cpp.Object, parentTransform: Il2Cpp.Object)
{
    targetTransform.method("SetParent", 2).invoke(parentTransform, false)
}

export function CreateVector3(x: number, y: number, z: number): Il2Cpp.Object
{
    const vector3 = CoreModuleImage.class("UnityEngine.Vector3").alloc()
    vector3.method(".ctor").invoke(x, y, z)
    return vector3
}

export function CreateVector2(x: number, y: number): Il2Cpp.Object
{
    const vector2 = CoreModuleImage.class("UnityEngine.Vector2").alloc()
    vector2.method(".ctor").invoke(x, y)
    return vector2
}

// Property
export function GetProperty<T extends Il2Cpp.Method.ReturnType = Il2Cpp.Object>(obj: Il2Cpp.Object | Il2Cpp.Class, propertyName: string): T
{
    return obj.method<T>(`get_${propertyName}`).invoke()
}

export function SetProperty(obj: Il2Cpp.Object | Il2Cpp.Class, propertyName: string, value: Il2Cpp.Parameter.Type)
{
    obj.method(`set_${propertyName}`).invoke(value)
}

export function GetInstanceOfSingleton(klass: Il2Cpp.Class): Il2Cpp.Object
{
    return GetProperty(klass, "Instance")
}

export function GetTransform(obj: Il2Cpp.Object): Il2Cpp.Object
{
    return GetProperty(obj, "transform")
}

export function GetMasterDataManagerInstance(): Il2Cpp.Object
{
    return GetInstanceOfSingleton(AssemblyImage.class("Sekai.MasterDataManager"))
}

export function GetScreenManagerInstance(): Il2Cpp.Object
{
    return GetInstanceOfSingleton(AssemblyImage.class("Sekai.ScreenManager"))
}

// Dialog
export const COMMON_1BUTTON_DIALOG_CLASS_NAME = "Sekai.Common1ButtonDialog"
export function Show1ButtonDialog_1(className: string, dialogType: number, messageBodyKey: string, okButtonLabelKey: string, onClickOK: Il2Cpp.Object | NativePointer, layerType: number = DisplayLayerType.Layer_Dialog, dialogSize: number = DialogSize.Manual, allowCloseExternal: boolean = true): Il2Cpp.Object
{
    return GetScreenManagerInstance()
        .method<Il2Cpp.Object>("Show1ButtonDialog", 7).inflate(AssemblyImage.class(className))
        .invoke(dialogType, Il2Cpp.string(messageBodyKey), Il2Cpp.string(okButtonLabelKey), onClickOK, layerType, dialogSize, allowCloseExternal)
}

export function ShowSubWindowDialog(messageBody: string = null, onClose: Il2Cpp.Object | NativePointer = NULL, allowCloseExternal: boolean = true, dialogType: number = 240, layerType: number = DisplayLayerType.Layer_Dialog): Il2Cpp.Object
{
    return GetScreenManagerInstance()
        .method<Il2Cpp.Object>("ShowSubWindowDialog").inflate(AssemblyImage.class("Sekai.SubWindowDialog"))
        .invoke(Il2Cpp.string(messageBody), onClose, allowCloseExternal, dialogType, layerType)
}

export const COMMON_2BUTTON_DIALOG_CLASS_NAME = "Sekai.Common2ButtonDialog"
export function Show2ButtonDialog_1(className: string, dialogType: number, messageBodyKey: string, okButtonLabelKey: string, cancelButtonLabelKey: string, onClickOK: Il2Cpp.Object | NativePointer, onClickCancel: Il2Cpp.Object | NativePointer, layerType: number = DisplayLayerType.Layer_Dialog, dialogSize: number = DialogSize.Manual, allowCloseExternal: boolean = true): Il2Cpp.Object
{
    return GetScreenManagerInstance()
        .method<Il2Cpp.Object>("Show2ButtonDialog", 9).inflate(AssemblyImage.class(className))
        .invoke(dialogType, Il2Cpp.string(messageBodyKey), Il2Cpp.string(okButtonLabelKey), Il2Cpp.string(cancelButtonLabelKey), onClickOK, onClickCancel, layerType, dialogSize, allowCloseExternal)
}

// Vector3
export function AddTwoVector3(value1: Il2Cpp.Object, value2: Il2Cpp.Object): Il2Cpp.Object
{
    value1.field<number>("x").value += value2.field<number>("x").value
    value1.field<number>("y").value += value2.field<number>("y").value
    value1.field<number>("z").value += value2.field<number>("z").value

    return value1
}

export function MultiplyVector3(value: Il2Cpp.Object, ratio: number)
{
    value.field<number>("x").value *= ratio
    value.field<number>("y").value *= ratio
    value.field<number>("z").value *= ratio

    return value
}

// Misc
function GetValueStateText(name: string, value: boolean, customValueText: string): string
{
    return `${name}: ${customValueText === "" ? (value ? "Enabled": "Disabled") : customValueText}`
}

// Primitive types require this tedious method because changing them in a function does not change their original value
export function CreateOptionToggleButton(targetValue: boolean, valueChangeFunc: () => boolean, text: string, fontSize: number, position: Il2Cpp.Object, sizeDelta: Il2Cpp.Object, parentTransform: Il2Cpp.Object, customValueTextFunc: (value: boolean) => string = () => "", isInteractable: boolean = true): Il2Cpp.Object
{
    const button = CreateButton(GetValueStateText(text, targetValue, customValueTextFunc(targetValue)), fontSize, position, sizeDelta, parentTransform, (button: Il2Cpp.Object) => {
                targetValue = valueChangeFunc() // Sync the value of this function with the changed value
                UpdateTextOfDefaultControls(button, GetValueStateText(text, targetValue, customValueTextFunc(targetValue)))
            })
    SetProperty(GetComponentInChildren(button, UnityEngineUIButton), "interactable", isInteractable)

    return button
}

export function CreateOptionInputField(targetValue: string | number, valueChangeFunc: (value: string | number) => void, text: string, inputFieldFontSize: number, textFontSize: number, position: Il2Cpp.Object, sizeDelta: Il2Cpp.Object, parentTransform: Il2Cpp.Object, isInteractable: boolean = true): Il2Cpp.Object
{
    const inputField = CreateInputField(String(targetValue), inputFieldFontSize, position, sizeDelta, typeof targetValue === "number" ? 2 : 0, parentTransform, (inputField: Il2Cpp.Object, value: string) => {
                valueChangeFunc(typeof targetValue === "number" ? parseInt(value) : value)
            })
    CreateText(text, textFontSize, CreateVector3(0, 40, 0), sizeDelta, GetTransform(inputField), "black")

    SetProperty(GetComponentInChildren(inputField, TMPInputField), "interactable", isInteractable)

    return inputField
}