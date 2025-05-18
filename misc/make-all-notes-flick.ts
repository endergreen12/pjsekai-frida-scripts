import { AssemblyImage } from "../lib/consts.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertNormalNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        noteInfo.value.method("set_Type").invoke(1)
        category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("Flick").value
        this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFlickNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        noteInfo.value.method("set_Type").invoke(1)
        this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFrictionNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        noteInfo.value.method("set_Type").invoke(1)
        category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("FrictionFlick").value
        this.method("ConvertFrictionFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }
})