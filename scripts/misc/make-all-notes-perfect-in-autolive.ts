import "frida-il2cpp-bridge"
import { GetAssemblyCSharpImage } from "../lib/exports/get/assembly"
import { GetField, GetProperty, SetField, SetProperty } from "../lib/utils/unity/get-set"
import { ChangeImpl_AutoRetire } from "./auto-retire"

Il2Cpp.perform(() => {
    ChangeImpl_AutoRetire()

    const AssemblyCSharpImage = GetAssemblyCSharpImage()

    AssemblyCSharpImage.class("Sekai.Core.Live.ScoreLogic").method("UpdateNoteResult").implementation = function(note: Il2Cpp.Object)
    {
        makeNotePerfect(note)
        this.method("UpdateNoteResult").invoke(note)
    }

    AssemblyCSharpImage.class("Sekai.Core.Live.ScoreLogic").method("UpdateCombo").implementation = function(note: Il2Cpp.Object)
    {
        makeNotePerfect(note)
        this.method("UpdateCombo").invoke(note)
    }
})

function makeNotePerfect(note: Il2Cpp.Object)
{
    const AssemblyCSharpImage = GetAssemblyCSharpImage()

    const judgeInfo = GetProperty<Il2Cpp.ValueType>(note, "JudgeInfo")
    if(GetField(judgeInfo, "Item1").toString() !== "Auto")
    {
        return
    }
    
    SetField(judgeInfo, "Item1", GetField(AssemblyCSharpImage.class("Sekai.Live.NoteResult"), "JustPerfect"))
    SetField(judgeInfo, "Item2", GetField(AssemblyCSharpImage.class("Sekai.Live.NoteResultDescription"), "Just"))
    SetProperty(note, "JudgeInfo", judgeInfo)
}