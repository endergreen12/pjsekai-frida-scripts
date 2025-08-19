import "frida-il2cpp-bridge"
import { GetAssemblyCSharpImage } from "../../exports/get/assembly"
import { GetField } from "../unity/get-set"

export function IsEnglishVersion(): boolean
{
    return GetField<Il2Cpp.String>(GetAssemblyCSharpImage().class("Sekai.EnvironmentConfig"), "PHOTON_CHAT_REGION").toString() == '"us"'
}