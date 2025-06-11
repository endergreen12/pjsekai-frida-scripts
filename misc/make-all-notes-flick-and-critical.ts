import { AssemblyImage } from "../lib/consts.js";
import { SetProperty } from "../lib/lib.js";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertNormalNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("Flick").value
        this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFlickNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        this.method("ConvertFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFrictionNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("FrictionFlick").value
        this.method("ConvertFrictionFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFrictionFlickNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        category.value = AssemblyImage.class("Sekai.Live.NoteCategory").field("FrictionFlick").value
        this.method("ConvertFrictionFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertLongNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        this.method("ConvertLongNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }
})