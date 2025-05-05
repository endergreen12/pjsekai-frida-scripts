import { ChangeImpl_RemoveTargetTracksFromTimeline, CharModelList_LogIndexAndCharName, 
    SetParentOfTransform, SetActiveOfDeactivateTargets, ChangeImpl_ForceDisableCameraDecoration,
    GetCharacterNameFromCharacterModel, ENABLE_THIRD_PERSON, GetCharacterModelListFromMVModel, GetMVModelInstance,
    GetTargetTransformOfCharModelToAttach, GetMainCamFromMVCameraModel} from "./lib/mv-utils.js";
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
        const mainCam = GetMainCamFromMVCameraModel(mvModelInstance.method<Il2Cpp.Object>("get_MainCameraModel").invoke())
        const mainCamTransform = mainCam.method<Il2Cpp.Object>("get_transform").invoke()
        const characterModelList = GetCharacterModelListFromMVModel(mvModelInstance)

        const targetCharacter = characterModelList.get(targetCharIndex)
        SetParentOfTransform(mainCamTransform, GetTargetTransformOfCharModelToAttach(targetCharacter))
        SetActiveOfDeactivateTargets(targetCharacter, false)

        const newAngles = Vector3.alloc()
        if(ENABLE_THIRD_PERSON)
        {
            newAngles.method(".ctor").invoke(180.0, 0.0, 180.0)
        } else {
            newAngles.method(".ctor").invoke(0.0, 0.0, 90.0) // Fixing the camera tilt caused when changing the parent. Not sure why it tilts
        }
        mainCamTransform.method("set_localEulerAngles").invoke(newAngles.unbox())

        const newLocalPos = Vector3.alloc()
        if(ENABLE_THIRD_PERSON)
        {
            newLocalPos.method(".ctor").invoke(0.0, 0.6, 1.5)
        } else {
            newLocalPos.method(".ctor").invoke(-0.07, 0.0, 0.005)
        }
        mainCamTransform.method("set_localPosition").invoke(newLocalPos.unbox())
    }
    
    // Implementation of switching target by back button in Android
    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("OnBackKey").implementation = function()
    {
        const mvModelInstance = GetMVModelInstance()
        const mainCam = GetMainCamFromMVCameraModel(mvModelInstance.method<Il2Cpp.Object>("get_MainCameraModel").invoke())
        const mainCamTransform = mainCam.method<Il2Cpp.Object>("get_transform").invoke()
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

    // Change FOV, idk why but when the value exceeds around 100, the rendering becomes abnormal, such as thicker outlines
    /* AssemblyImage.class("Sekai.Core.SekaiCameraAspect").method<number>("CalculateVerticalFov").implementation = function(currentFov: number)
    {
        return 50 // Change here
    } */
})