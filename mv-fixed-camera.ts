import { AssemblyImage } from "./lib/consts";
import { CreateVector3, GetTransform, SetProperty } from "./lib/lib";
import { ChangeImpl_RemoveTargetTracksFromTimeline, GetMainCamFromMVCameraModel, ChangeImpl_ForceDisableCameraDecoration, ChangeImpl_ChangeFOV, ChangeImpl_CreateOpenOptionDialogButton } from "./lib/mv-utils";

Il2Cpp.perform(() => {
    ChangeImpl_RemoveTargetTracksFromTimeline()
    ChangeImpl_ForceDisableCameraDecoration()
    ChangeImpl_ChangeFOV()
    ChangeImpl_CreateOpenOptionDialogButton(true)
    
    // Set camera position and angles
    AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCameraModel").implementation = function(cameraModel: Il2Cpp.Object)
    {
        this.method("RegisterMainCameraModel").invoke(cameraModel)

        const mainCamTransform = GetTransform(GetMainCamFromMVCameraModel(cameraModel))
        SetProperty(mainCamTransform, "position", CreateVector3(0.0, 1.5, 7.0).unbox())
        SetProperty(mainCamTransform, "eulerAngles", CreateVector3(0.0, 180.0, 0.0).unbox())
    }
})