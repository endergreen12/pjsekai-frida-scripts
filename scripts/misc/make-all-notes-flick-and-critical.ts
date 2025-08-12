import { AssemblyImage } from "../lib/consts";
import { GetField, SetProperty } from "../lib/lib";

Il2Cpp.perform(() => {
    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertNormalNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        category.value = GetField(AssemblyImage.class("Sekai.Live.NoteCategory"), "Flick")
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
        category.value = GetField(AssemblyImage.class("Sekai.Live.NoteCategory"), "FrictionFlick")
        this.method("ConvertFrictionFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertFrictionFlickNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        category.value = GetField(AssemblyImage.class("Sekai.Live.NoteCategory"), "FrictionFlick")
        this.method("ConvertFrictionFlickNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }

    AssemblyImage.class("Sekai.SUS.Converter").method("ConvertLongNote").implementation = function(id, noteInfo: Il2Cpp.Reference<Il2Cpp.Object>, info, laneStart, laneEnd, category: Il2Cpp.Reference)
    {
        SetProperty(noteInfo.value, "Type", 1)
        this.method("ConvertLongNote").invoke(id, noteInfo, info, laneStart, laneEnd, category)
    }
})