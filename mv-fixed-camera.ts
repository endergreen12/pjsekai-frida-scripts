import { AssemblyImage, Vector3 } from "./lib/consts.js";
import { ChangeImpl_RemoveMainCamAnimAndDofFromTimeline, GetMainCamTransformFromCameraModel } from "./lib/mv-utils.js";

ChangeImpl_RemoveMainCamAnimAndDofFromTimeline()

// Set camera position and angles
AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCameraModel").implementation = function(cameraModel: Il2Cpp.Object)
{
    this.method("RegisterMainCameraModel").invoke(cameraModel)

    const newPos = Vector3.alloc()
    newPos.method(".ctor").invoke(0.0, 1.5, 7.0)
    const newAngles = Vector3.alloc()
    newAngles.method(".ctor").invoke(0.0, 180.0, 0.0)

    const mainCamTransform = GetMainCamTransformFromCameraModel(false, cameraModel)
    mainCamTransform.method("set_position").invoke(newPos.unbox())
    mainCamTransform.method("set_eulerAngles").invoke(newAngles.unbox())
}