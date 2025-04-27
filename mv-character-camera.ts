import { ChangeImpl_RemoveTargetTracksFromTimeline, CharModelList_LogIndexAndCharName, 
    SetParentOfTransform, GetMainCamTransformFromMVCameraModel, SetActiveOfDeactivateTargets, ChangeImpl_ForceDisableCameraDecoration,
    GetCharacterNameFromCharacterModel, ENABLE_THIRD_PERSON, GetCharacterModelListFromMVModel, GetMVModelInstance,
    GetTargetTransformOfCharModelToAttach} from "./lib/mv-utils.js";
import { AssemblyImage, Vector3 } from "./lib/consts.js";
let targetCharIndex = 0

Il2Cpp.perform(() => {
    ChangeImpl_RemoveTargetTracksFromTimeline()
    ChangeImpl_ForceDisableCameraDecoration()

    AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCharacterModel").implementation = function(characterModel: Il2Cpp.Object)
    {
        this.method("RegisterMainCharacterModel").invoke(characterModel)

        const characterList = characterModel.method<Il2Cpp.Array<Il2Cpp.Object>>("get_CharacterModelList").invoke()
        CharModelList_LogIndexAndCharName(characterList)
    
        if(targetCharIndex > characterList.length - 1)
        {
            console.log("targetCharIndex exceeds the range of characterList, setting to 0")
            targetCharIndex = 0
        }

        console.log(`Currently the target index is set to ${targetCharIndex} | ${GetCharacterNameFromCharacterModel(characterList.get(targetCharIndex))}`)
    }

    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("Start").implementation = function()
    {
        this.method("Start").invoke()

        const mvModelInstance = GetMVModelInstance()
        const mainCamTransform = GetMainCamTransformFromMVCameraModel(mvModelInstance.method<Il2Cpp.Object>("get_MainCameraModel").invoke())
        const characterModelList = GetCharacterModelListFromMVModel(mvModelInstance)

        const targetCharacter = characterModelList.get(targetCharIndex)
        SetParentOfTransform(mainCamTransform, GetTargetTransformOfCharModelToAttach(targetCharacter))
        SetActiveOfDeactivateTargets(targetCharacter, false)

        // Changing parent makes eulerAngles (0.00, 0.00, 270.00) so set them all to 0.0, not sure why eulerAngles is changed
        const newAngles = Vector3.alloc()
        newAngles.method(".ctor").invoke(0.0, ENABLE_THIRD_PERSON ? 180.0 : 0.0, 0.0)
        mainCamTransform.method("set_eulerAngles").invoke(newAngles.unbox())

        // Adjust position to about eye level
        const newLocalPos = Vector3.alloc()
        newLocalPos.method(".ctor").invoke(-0.07, 0.0, ENABLE_THIRD_PERSON ? 2.0 : 0.005)
        mainCamTransform.method("set_localPosition").invoke(newLocalPos.unbox())
    }
    
    // Implementation of switching target by back button in Android
    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("OnBackKey").implementation = function()
    {
        const mvModelInstance = GetMVModelInstance()
        const mainCamTransform = GetMainCamTransformFromMVCameraModel(mvModelInstance.method<Il2Cpp.Object>("get_MainCameraModel").invoke())
        const characterModelList = GetCharacterModelListFromMVModel(mvModelInstance)

        // Reactivate the elements of character deactivated before
        SetActiveOfDeactivateTargets(characterModelList.get(targetCharIndex), true)
    
        // Increment targetCharIndex, set to 0 if it exceeds the range of CharacterModelArray
        targetCharIndex = targetCharIndex >= characterModelList.length - 1 ? 0 : targetCharIndex + 1
    
        const newTargetCharacterModel = characterModelList.get(targetCharIndex)

        console.log(`Set target index to ${targetCharIndex} | ${GetCharacterNameFromCharacterModel(newTargetCharacterModel)}`)
        
        SetParentOfTransform(mainCamTransform, GetTargetTransformOfCharModelToAttach(newTargetCharacterModel))
        SetActiveOfDeactivateTargets(newTargetCharacterModel, false)
    }
})