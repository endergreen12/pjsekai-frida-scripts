import "frida-il2cpp-bridge"
import { GetCoreModuleImage } from "../../exports/get/unity"

export function CreateVector3(x: number, y: number, z: number): Il2Cpp.Object
{
    const vector3 = GetCoreModuleImage().class("UnityEngine.Vector3").alloc()
    vector3.method(".ctor").invoke(x, y, z)
    return vector3
}

export function CreateVector2(x: number, y: number): Il2Cpp.Object
{
    const vector2 = GetCoreModuleImage().class("UnityEngine.Vector2").alloc()
    vector2.method(".ctor").invoke(x, y)
    return vector2
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