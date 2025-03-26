import { ChangeImpl_RemoveMainCamAnimAndDofFromTimeline, ChangeImpl_SetupCameraInstanceStoring, CharList_LogIndexAndCharName, 
    AttachCamToCharHead, GetMainCamTransformFromCameraModel, SetActiveOfDeactivateTarget } from "./lib/mv-utils.js";
import { AssemblyImage, Vector3 } from "./lib/consts.js";
let targetCharIndex = 0
let CharacterModelArray: Il2Cpp.Array<Il2Cpp.Object> = null

ChangeImpl_RemoveMainCamAnimAndDofFromTimeline()
ChangeImpl_SetupCameraInstanceStoring()

// On MV starts
AssemblyImage.class("Sekai.Live.Model.MusicVideoCharacterModel").method(".ctor").overload("Sekai.Core.CharacterModel[]", "Sekai.Core.CharacterInfo[]")
    .implementation = function(characterList: Il2Cpp.Array<Il2Cpp.Object>, characterInfos: Il2Cpp.Array<Il2Cpp.Object>)
{
    this.method(".ctor").overload("Sekai.Core.CharacterModel[]", "Sekai.Core.CharacterInfo[]").invoke(characterList, characterInfos)

    CharList_LogIndexAndCharName(characterList)

    if(targetCharIndex > characterList.length - 1)
    {
        console.log("targetCharIndex exceeds the range of characterList, setting to 0")
        targetCharIndex = 0
    }

    const character = characterList.get(targetCharIndex)

    // Setting camera //
        const camTransform = GetMainCamTransformFromCameraModel(true)
        AttachCamToCharHead(camTransform, character)

        // Changing parent makes eulerAngles (0.00, 0.00, 270.00) so set them all to 0.0, not sure why eulerAngles is changed
        const newAngles = Vector3.alloc()
        newAngles.method(".ctor").invoke(0.0, 0.0, 0.0)
        camTransform.method("set_eulerAngles").invoke(newAngles.unbox())

        // Raise the camera height slightly to avoid arm transparency
        const newLocalPos = Vector3.alloc()
        newLocalPos.method(".ctor").invoke(-0.06, 0.0, 0.0)
        camTransform.method("set_localPosition").invoke(newLocalPos.unbox())

    // Deactivate some elements of target character
    SetActiveOfDeactivateTarget(character, false)

    CharacterModelArray = characterList
}

AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("OnBackKey").implementation = function()
{
    if(CharacterModelArray == null)
    {
        console.log("CharacterModelArray is null, returning")
        return
    }

    // Reactivate the elements of character deactivated before
    SetActiveOfDeactivateTarget(CharacterModelArray.get(targetCharIndex), true)

    // Increment targetCharIndex, set to 0 if it exceeds the range of CharacterModelArray
    targetCharIndex = targetCharIndex == CharacterModelArray.length - 1 ? 0 : targetCharIndex + 1

    const newTargetCharacter = CharacterModelArray.get(targetCharIndex)
    
    AttachCamToCharHead(GetMainCamTransformFromCameraModel(true), newTargetCharacter)

    SetActiveOfDeactivateTarget(newTargetCharacter, false)
}

AssemblyImage.class("Sekai.Live.Background3DView").method("Unload").implementation = function()
{
    this.method("Unload").invoke()
    
    CharacterModelArray = null
}