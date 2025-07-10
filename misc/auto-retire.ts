import { AssemblyImage } from "../lib/consts";
import { GetField, SetField } from "../lib/lib";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.Core.Live.SoloLiveController").method("OnExit").implementation = function()
    {
        console.log("Live finished. Setting result to Retire...")
        SetField(this as Il2Cpp.Object, "result", GetField(AssemblyImage.class("Sekai.Core.Live.LiveResult"), "Retire"))

        this.method("OnExit").invoke()
    }
})