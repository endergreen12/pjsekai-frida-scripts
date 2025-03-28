import { ChangeImpl_RemoveUnneededTracksFromTimeline, ChangeImpl_SetupCameraInstanceStoring, CharList_LogIndexAndCharName, 
    AttachCamToTransfrom, GetMainCamTransformFromCameraModel, SetActiveOfDeactivateTargets, ChangeImpl_ForceDisableCameraDecoration,
    GetCharacterNameFromCharacterModel} from "./lib/mv-utils.js";
import { AssemblyImage, Vector3 } from "./lib/consts.js";
let targetCharIndex = 0
let CharacterModelArray: Il2Cpp.Array<Il2Cpp.Object> = null

const ENABLE_THIRD_PERSON = false

Il2Cpp.perform(() => {
    ChangeImpl_RemoveUnneededTracksFromTimeline()
    ChangeImpl_ForceDisableCameraDecoration()
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
    
        const characterModel = characterList.get(targetCharIndex)

        console.log(`Currently the target index is set to ${targetCharIndex} | ${GetCharacterNameFromCharacterModel(characterModel)}`)
    
        // Setting camera //
            const camTransform = GetMainCamTransformFromCameraModel(true)
            AttachCamToTransfrom(camTransform, GetTargetTransformOfCharModelToAttach(characterModel))
    
            // Changing parent makes eulerAngles (0.00, 0.00, 270.00) so set them all to 0.0, not sure why eulerAngles is changed
            const newAngles = Vector3.alloc()
            newAngles.method(".ctor").invoke(0.0, ENABLE_THIRD_PERSON ? 180.0 : 0.0, 0.0)
            camTransform.method("set_eulerAngles").invoke(newAngles.unbox())
    
            // Adjust position to about eye level
            const newLocalPos = Vector3.alloc()
            newLocalPos.method(".ctor").invoke(-0.07, 0.0, ENABLE_THIRD_PERSON ? 2.0 : 0.005)
            camTransform.method("set_localPosition").invoke(newLocalPos.unbox())
    
        // Deactivate some elements of target character
        if(!ENABLE_THIRD_PERSON)
            SetActiveOfDeactivateTargets(characterModel, false)
    
        CharacterModelArray = characterList
    }
    
    // Implementation of switching target by back button in Android
    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("OnBackKey").implementation = function()
    {
        if(CharacterModelArray == null)
        {
            console.log("CharacterModelArray is null, returning")
            return
        }
    
        // Reactivate the elements of character deactivated before
        if(!ENABLE_THIRD_PERSON)
            SetActiveOfDeactivateTargets(CharacterModelArray.get(targetCharIndex), true)
    
        // Increment targetCharIndex, set to 0 if it exceeds the range of CharacterModelArray
        targetCharIndex = targetCharIndex == CharacterModelArray.length - 1 ? 0 : targetCharIndex + 1
    
        const newTargetCharacterModel = CharacterModelArray.get(targetCharIndex)

        console.log(`Set target index to ${targetCharIndex} | ${GetCharacterNameFromCharacterModel(newTargetCharacterModel)}`)
        
        AttachCamToTransfrom(GetMainCamTransformFromCameraModel(true), GetTargetTransformOfCharModelToAttach(newTargetCharacterModel))
        if(!ENABLE_THIRD_PERSON)
            SetActiveOfDeactivateTargets(newTargetCharacterModel, false)
    }
    
    AssemblyImage.class("Sekai.Live.Background3DView").method("Unload").implementation = function()
    {
        this.method("Unload").invoke()
        
        CharacterModelArray = null
    }
    
    function GetTargetTransformOfCharModelToAttach(characterModel: Il2Cpp.Object)
    {
        return ENABLE_THIRD_PERSON ? characterModel.method<Il2Cpp.Object>("get_Hip").invoke().method<Il2Cpp.Object>("get_transform").invoke() : 
                                    characterModel.method<Il2Cpp.Object>("get_HeadTransform").invoke()
    }
})