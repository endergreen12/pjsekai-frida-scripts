import { ChangeImpl_RemoveMainCamAnimAndDofFromTimeline, ChangeImpl_SetupCameraInstanceStoring, CharList_LogIndexAndCharName, 
    AttachCamToChar, GetMainCamTransformFromCameraModel } from "./lib/mv-utils.js";
import { AssemblyImage } from "./lib/consts.js";
let targetCharIndex = 0

ChangeImpl_RemoveMainCamAnimAndDofFromTimeline()
ChangeImpl_SetupCameraInstanceStoring()

AssemblyImage.class("Sekai.Live.Model.MusicVideoCharacterModel").method(".ctor").overload("Sekai.Core.CharacterModel[]", "Sekai.Core.CharacterInfo[]")
    .implementation = function(characterList: Il2Cpp.Array<Il2Cpp.Object>, characterInfos: Il2Cpp.Array<Il2Cpp.Object>)
{
    this.method(".ctor").overload("Sekai.Core.CharacterModel[]", "Sekai.Core.CharacterInfo[]").invoke(characterList, characterInfos)

    CharList_LogIndexAndCharName(characterList)

    AttachCamToChar(GetMainCamTransformFromCameraModel(true), characterList.get(targetCharIndex))
}