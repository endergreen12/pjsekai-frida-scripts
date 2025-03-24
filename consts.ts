import "frida-il2cpp-bridge"

export const Assembly = Il2Cpp.domain.assembly("Assembly-CSharp")
export const AssemblyImage = Assembly.image
export const CoreModule = Il2Cpp.domain.assembly("UnityEngine.CoreModule")
export const CoreModuleImage = CoreModule.image
export const DebugClass = CoreModuleImage.class("UnityEngine.Debug")
export const Vector3 = CoreModuleImage.class("UnityEngine.Vector3")