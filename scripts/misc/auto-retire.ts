import { AssemblyImage } from "../lib/consts";
import { GetField, SetField } from "../lib/lib";

export function ChangeImpl_AutoRetire()
{
    console.log("Auto Retire installed")
}

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.Core.Live.SoloLiveController").method("OnExit").implementation = function()
    {
        console.log("Live finished. Setting result to Retire...")
        SetField(this as Il2Cpp.Object, "result", GetField(AssemblyImage.class("Sekai.Core.Live.LiveResult"), "Retire"))

        this.method("OnExit").invoke()
    }
})