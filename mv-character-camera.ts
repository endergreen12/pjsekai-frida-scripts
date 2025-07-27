import { ChangeImpl_RemoveTargetTracksFromTimeline, CharModelList_LogIndexAndCharName, 
    SetActiveOfDeactivateTargets, ChangeImpl_ForceDisableCameraDecoration,
    GetCharacterNameFromCharacterModel, isThirdPersonEnabled, GetCharacterModelListFromMVModel, GetMVModelInstance,
    GetTargetTransformOfCharModelToAttach, GetMainCamFromMVCameraModel, ChangeImpl_CreateOpenOptionDialogButton,
    ChangeImpl_ChangeFOV,
    ChangeImpl_DisablePausingByTouchingScreen} from "./lib/mv-utils";
import { AssemblyImage, UnityEngineInput } from "./lib/consts";
import { CreateVector3, GetField, GetProperty, GetTransform, SetParent, SetProperty } from "./lib/lib";

let targetCharIndex = 0

Il2Cpp.perform(() => {
    ChangeImpl_RemoveTargetTracksFromTimeline()
    ChangeImpl_ForceDisableCameraDecoration()
    ChangeImpl_ChangeFOV()
    ChangeImpl_CreateOpenOptionDialogButton()
    ChangeImpl_DisablePausingByTouchingScreen()

    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("Start").implementation = function()
    {
        this.method("Start").invoke()

        const mvModelInstance = GetMVModelInstance()
        const mainCam = GetMainCamFromMVCameraModel(GetProperty(mvModelInstance, "MainCameraModel"))
        const mainCamTransform = GetTransform(mainCam)
        const characterModelList = GetCharacterModelListFromMVModel(mvModelInstance)

        CharModelList_LogIndexAndCharName(characterModelList)
    
        if(targetCharIndex > characterModelList.length - 1)
        {
            console.log("The target index exceeds the range of characterList, setting to 0")
            targetCharIndex = 0
        }

        console.log(`Current target index: ${targetCharIndex} | ${GetCharacterNameFromCharacterModel(characterModelList.get(targetCharIndex))}`)

        const targetCharacter = characterModelList.get(targetCharIndex)
        SetParent(mainCamTransform, GetTargetTransformOfCharModelToAttach(targetCharacter))
        SetActiveOfDeactivateTargets(targetCharacter, false)

        SetProperty(mainCamTransform, "localEulerAngles", (isThirdPersonEnabled ? CreateVector3(180.0, 0.0, 180.0) : CreateVector3(0.0, 0.0, 90.0)).unbox())
        SetProperty(mainCamTransform, "localPosition", (isThirdPersonEnabled ? CreateVector3(0.0, 0.6, 1.5) : CreateVector3(-0.05, 0.0, 0.0)).unbox())

        SetProperty(mainCam, "nearClipPlane", 0.01)
    }

    let hasTargetBeenChanged = false
    let liveStateAtTouchBegan = "" // Used to prevent the music video from being immediately paused when it is resumed
    const swipeSensitivity = 30
    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("OnUpdate").implementation = function()
    {
        this.method("OnUpdate").invoke()

        const liveStateStr = GetField(this as Il2Cpp.Object, "state").toString()
        if(liveStateStr == "Exit")
        {
            return
        }

        if(GetProperty<number>(UnityEngineInput, "touchCount") > 0)
        {
            const touch = UnityEngineInput.method<Il2Cpp.Object>("GetTouch").invoke(0)
            const deltaX = GetField<number>(GetProperty<Il2Cpp.Object>(touch, "deltaPosition"), "x")

            switch(GetProperty(touch, "phase").toString())
            {
                case "Began":
                    liveStateAtTouchBegan = liveStateStr
                    return

                case "Ended":
                    if(!hasTargetBeenChanged && liveStateAtTouchBegan != "Pause")
                    {
                        this.method("OnPause").invoke()
                    } else {
                        hasTargetBeenChanged = false
                    }
                    return
            }

            if(!hasTargetBeenChanged && Math.abs(deltaX) >= swipeSensitivity)
            {
                hasTargetBeenChanged = true

                const mvModelInstance = GetMVModelInstance()
                const mainCam = GetMainCamFromMVCameraModel(GetProperty(mvModelInstance, "MainCameraModel"))
                const mainCamTransform = GetTransform(mainCam)
                const characterModelList = GetCharacterModelListFromMVModel(mvModelInstance)

                // Reactivate the elements of character deactivated before
                SetActiveOfDeactivateTargets(characterModelList.get(targetCharIndex), true)
            
                if(deltaX >= swipeSensitivity) // Right Swipe
                {
                    targetCharIndex = targetCharIndex - 1 < 0 ? characterModelList.length - 1 : targetCharIndex - 1
                } else if(deltaX <= -swipeSensitivity) // Left Swipe
                {
                    targetCharIndex = targetCharIndex + 1 > characterModelList.length - 1 ? 0 : targetCharIndex + 1
                }
            
                const newTargetCharacterModel = characterModelList.get(targetCharIndex)

                console.log(`Set target index to ${targetCharIndex} | ${GetCharacterNameFromCharacterModel(newTargetCharacterModel)}`)
                
                SetParent(mainCamTransform, GetTargetTransformOfCharModelToAttach(newTargetCharacterModel))
                SetActiveOfDeactivateTargets(newTargetCharacterModel, false)
            }
        }
    }
})