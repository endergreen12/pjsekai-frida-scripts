import "frida-il2cpp-bridge"
import { GetAssemblyCSharpImage } from "../../../../lib/exports/get/assembly"
import { GetCoreModuleImage, GetUnityEngineInputClass } from "../../../../lib/exports/get/unity"
import { GetField, GetProperty, SetProperty } from "../../../../lib/utils/unity/get-set"
import { AddTwoVector3, MultiplyVector3, CreateVector3 } from "../../../../lib/utils/unity/vector"
import { GetTransform } from "../../../../lib/utils/unity/transform"
import { GetMainCamFromMVModel, GetMVModelInstance } from "../../get"
import { ChangeImpl_DisablePausingByTouchingScreen } from "../../process"

const speed = 0.001
const angleSpeed = 0.02
let storedLeftTouchPos: Il2Cpp.Object = null
let storedRightTouchPos: Il2Cpp.Object = null
export function ChangeImpl_FreeCameraLogic()
{
    ChangeImpl_DisablePausingByTouchingScreen()

    GetAssemblyCSharpImage().class("Sekai.Core.Live.MusicVideoController").method("OnUpdate").implementation = function()
    {
        this.method("OnUpdate").invoke()

        if(GetField(this as Il2Cpp.Object, "state").toString() == "Exit")
        {
            return
        }

        const UnityEngineInputClass = GetUnityEngineInputClass()

        if(GetProperty<number>(UnityEngineInputClass, "touchCount") > 0)
        {
            const touches = GetProperty<Il2Cpp.Array<Il2Cpp.Object>>(UnityEngineInputClass, "touches")
            
            for(let i = 0; i < touches.length; i++)
            {
                const touch = touches.get(i)
                const touchPos = GetProperty(touch, "position")
                const touchPhaseStr = GetProperty(touch, "phase").toString()

                const mainCamTransform = GetTransform(GetMainCamFromMVModel(GetMVModelInstance()))

                if(GetField<number>(touchPos, "x") <= GetProperty<number>(GetCoreModuleImage().class("UnityEngine.Screen"), "width") / 2) // Left
                {
                    if(touchPhaseStr === "Began")
                    {
                        storedLeftTouchPos = touchPos
                        return
                    }

                    if(storedLeftTouchPos === null || storedLeftTouchPos.isNull())
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
                    if(touchPhaseStr === "Began")
                    {
                        storedRightTouchPos = touchPos
                        return
                    }

                    if(storedRightTouchPos === null || storedRightTouchPos.isNull())
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
}