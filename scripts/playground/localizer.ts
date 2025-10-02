import "frida-il2cpp-bridge"
import { GetAssemblyCSharpImage } from "../lib/exports/get/assembly"
import { GetSystemStringClass } from "../lib/exports/get/corlib"

Il2Cpp.perform(() => {
    load()

    const AssemblyCSharpImage = GetAssemblyCSharpImage()

    AssemblyCSharpImage.class("Sekai.WordingManager").method("AddMasterWording").implementation = function()
    {
        load()
    }

    AssemblyCSharpImage.class("Sekai.WordingManager").method<Il2Cpp.String>("Get").implementation = function(key: Il2Cpp.String)
    {
        const result = this.method<Il2Cpp.String>("Get").invoke(key)
        return result.isNull() ? Il2Cpp.string("") : result
    }
})

function load()
{
    const AssemblyCSharpImage = GetAssemblyCSharpImage()

    const json = Il2Cpp.corlib.class("System.IO.File").method<Il2Cpp.String>("ReadAllText", 1).invoke(Il2Cpp.string("/data/local/tmp/WordingDictionary.json"))
    const dic = AssemblyCSharpImage.class("CP.JsonSerializer")
        .method<Il2Cpp.Object>("FromJson").inflate(Il2Cpp.corlib.class("System.Collections.Generic.Dictionary`2").inflate(GetSystemStringClass(), GetSystemStringClass())).invoke(json)
    
    AssemblyCSharpImage.class("Sekai.WordingManager").field("dictionary").value = dic
}