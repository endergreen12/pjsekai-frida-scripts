import { AssemblyImage, Vector3 } from "./consts.js";

// Remove only MainCamera animation from timeline assets
AssemblyImage.class("Sekai.Core.MVDataLoader").method<Il2Cpp.Object>("LoadTimelineAsset").implementation = function(timelineName:Il2Cpp.String, mvId:number)
{
    const asset = this.method<Il2Cpp.Object>("LoadTimelineAsset").invoke(timelineName, mvId)
    if(timelineName.toString() == '"Camera"')
    {
        const trackObjects = asset.method<Il2Cpp.Object>("get_trackObjects").invoke()
        const arrayCopy = trackObjects.method<Il2Cpp.Array<Il2Cpp.Object>>("ToArray").invoke()
        for(let i = arrayCopy.length - 1; i >= 0; i--)
        {
            if(!arrayCopy.get(i).isNull())
            {
                if(arrayCopy.get(i).method<Il2Cpp.String>("get_name").invoke().toString() == '"MainCamera"')
                {
                    trackObjects.method("RemoveAt").invoke(i)
                }
            }
        }
    }
    return asset
}

// Set camera position and angles
AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCameraModel").implementation = function(cameraModel: Il2Cpp.Object)
{
    const newPos = Vector3.alloc()
    newPos.method(".ctor").invoke(0.0, 1.5, 7.0)
    const newAngles = Vector3.alloc()
    newAngles.method(".ctor").invoke(0.0, 180.0, 0.0)

    cameraModel.field<Il2Cpp.Object>("MainCameraModel").value
        .field<Il2Cpp.Object>("MainCamera").value
        .method<Il2Cpp.Object>("get_transform").invoke()
        .method("set_position").invoke(newPos.unbox())

    cameraModel.field<Il2Cpp.Object>("MainCameraModel").value
        .field<Il2Cpp.Object>("MainCamera").value
        .method<Il2Cpp.Object>("get_transform").invoke()
        .method("set_eulerAngles").invoke(newAngles.unbox())

    this.method("RegisterMainCameraModel").invoke(cameraModel)
}