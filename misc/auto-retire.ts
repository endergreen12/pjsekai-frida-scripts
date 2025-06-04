import { AssemblyImage } from "../lib/consts.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.Core.Live.SoloLiveController").method("OnExit").implementation = function()
    {
        console.log("Live finished. Setting result to Retire...")
        this.field("result").value = AssemblyImage.class("Sekai.Core.Live.LiveResult").field("Retire").value

        this.method("OnExit").invoke()
    }
})