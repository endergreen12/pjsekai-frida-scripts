import "frida-il2cpp-bridge"
import { GetCoreModuleImage } from "./lib/exports/get/unity"

Il2Cpp.perform(() => {
    Il2Cpp.trace(true).classes(GetCoreModuleImage().class("UnityEngine.Debug")).filterMethods(method => method.name.startsWith("Log")).and().attach()
})