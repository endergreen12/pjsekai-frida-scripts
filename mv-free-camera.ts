import { AssemblyImage, CoreModuleImage, UnityEngineInput } from "./lib/consts";
import { AddTwoVector3, CreateVector3, GetField, GetProperty, GetTransform, MultiplyVector3, SetProperty } from "./lib/lib";
import { ChangeImpl_RemoveTargetTracksFromTimeline, GetMainCamFromMVCameraModel, ChangeImpl_ForceDisableCameraDecoration, ChangeImpl_ChangeFOV, 
    ChangeImpl_CreateOpenOptionDialogButton, ChangeImpl_DisablePausingByTouchingScreen, GetMVModelInstance } from "./lib/mv-utils";

Il2Cpp.perform(() => {
    ChangeImpl_RemoveTargetTracksFromTimeline()
    ChangeImpl_ForceDisableCameraDecoration()
    ChangeImpl_ChangeFOV()
    ChangeImpl_CreateOpenOptionDialogButton(true)
    ChangeImpl_DisablePausingByTouchingScreen()
    
    // Set camera position and angles
    AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCameraModel").implementation = function(cameraModel: Il2Cpp.Object)
    {
        this.method("RegisterMainCameraModel").invoke(cameraModel)

        const mainCamTransform = GetTransform(GetMainCamFromMVCameraModel(cameraModel))
        SetProperty(mainCamTransform, "position", CreateVector3(0.0, 1.5, 7.0).unbox())
        SetProperty(mainCamTransform, "eulerAngles", CreateVector3(0.0, 180.0, 0.0).unbox())
    }

    let mvModelInstance: Il2Cpp.Object = null
    let mainCam: Il2Cpp.Object = null
    let mainCamTransform: Il2Cpp.Object = null
    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("Start").implementation = function()
    {
        mvModelInstance = GetMVModelInstance()
        mainCam = GetMainCamFromMVCameraModel(GetProperty(mvModelInstance, "MainCameraModel"))
        mainCamTransform = GetTransform(mainCam)
        screenWidth = GetProperty<number>(CoreModuleImage.class("UnityEngine.Screen"), "width")
    }

    const speed = 0.001
    const angleSpeed = 0.02
    let screenWidth = 0
    let storedLeftTouchPos: Il2Cpp.Object = null
    let storedRightTouchPos: Il2Cpp.Object = null
    AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("OnUpdate").implementation = function()
    {
        this.method("OnUpdate").invoke()

        if(GetField(this as Il2Cpp.Object, "state").toString() == "Exit")
        {
            return
        }

        if(GetProperty<number>(UnityEngineInput, "touchCount") > 0)
        {
            const touches = GetProperty<Il2Cpp.Array<Il2Cpp.Object>>(UnityEngineInput, "touches")
            
            for(let i = 0; i < touches.length; i++)
            {
                const touch = touches.get(i)
                const touchPos = GetProperty(touch, "position")
                const touchPhaseStr = GetProperty(touch, "phase").toString()

                if(GetField<number>(touchPos, "x") <= screenWidth / 2) // Left
                {
                    if(touchPhaseStr == "Began")
                    {
                        storedLeftTouchPos = touchPos
                        return
                    }

                    if(storedLeftTouchPos.isNull())
                    {
                        return
                    }

                    // Throwing readability away for performance
                    SetProperty(mainCamTransform, "position", AddTwoVector3(
                        AddTwoVector3(
                            GetProperty(mainCamTransform, "position"), 
                            MultiplyVector3(GetProperty(mainCamTransform, "right"), (GetField<number>(touchPos, "x") - GetField<number>(storedLeftTouchPos, "x")) * speed)),
                        MultiplyVector3(
                            GetProperty(mainCamTransform, "forward"), (GetField<number>(touchPos, "y") - GetField<number>(storedLeftTouchPos, "y")) * speed)))
                } else { // Right
                    if(touchPhaseStr == "Began")
                    {
                        storedRightTouchPos = touchPos
                        return
                    }

                    if(storedRightTouchPos.isNull())
                    {
                        return
                    }

                    SetProperty(mainCamTransform, "eulerAngles", 
                        AddTwoVector3(
                            GetProperty(mainCamTransform, "eulerAngles"), 
                            CreateVector3((GetField<number>(touchPos, "y") - GetField<number>(storedRightTouchPos, "y")) * -1 * angleSpeed, (GetField<number>(touchPos, "x") - GetField<number>(storedRightTouchPos, "x")) * angleSpeed, 0)))
                }
            }
        }
    }
})