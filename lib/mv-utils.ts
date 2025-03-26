import { AssemblyImage, MasterDataManagerInstace } from "./consts.js"

// Shared //
export function ChangeImpl_RemoveAllTracksExceptSubCamFromCamTimeline()
{
    AssemblyImage.class("Sekai.Core.MVDataLoader").method<Il2Cpp.Object>("LoadTimelineAsset").implementation = function(timelineName: Il2Cpp.String, mvId: number)
    {
        const asset = this.method<Il2Cpp.Object>("LoadTimelineAsset").invoke(timelineName, mvId)
        if(timelineName.toString() == '"Camera"')
        {
            const trackObjects = asset.method<Il2Cpp.Object>("get_trackObjects").invoke()
            const arrayCopy = trackObjects.method<Il2Cpp.Array<Il2Cpp.Object>>("ToArray").invoke()
            for(let i = arrayCopy.length - 1; i >= 0; i--)
            {
                const track = arrayCopy.get(i)
                if(!track.isNull())
                {
                    const name = track.method<Il2Cpp.String>("get_name").invoke().toString()
                    if(name != '"SubCamera"')
                    {
                        trackObjects.method("RemoveAt").invoke(i)
                    }
                }
            }
        }
        return asset
    }
}

export function ChangeImpl_ForceDisableCameraDecoration()
{
    AssemblyImage.class("Sekai.AssetBundleNames").method<Il2Cpp.String>("GetLiveCameraDecorationModelName").implementation = function(id: number, isCutIn: boolean)
    {
        return Il2Cpp.string("")
    }
}
//

// Partially shared //
let MVCameraModelInstance: Il2Cpp.Object = null
export function GetMainCamTransformFromCameraModel(getFromStoredInstance: boolean = false, cameraModel: Il2Cpp.Object = null): Il2Cpp.Object
{
    if(getFromStoredInstance && MVCameraModelInstance == null)
    {
        console.log("MVCameraModelInstance is null, returning null")
        return null
    }

    if(!getFromStoredInstance && cameraModel == null)
    {
        console.log("Given cameraModel is null, returning null")
        return null
    }

    return (getFromStoredInstance ? MVCameraModelInstance : cameraModel).field<Il2Cpp.Object>("MainCameraModel").value
                                                                        .field<Il2Cpp.Object>("MainCamera").value
                                                                        .method<Il2Cpp.Object>("get_transform").invoke()
}

export function ChangeImpl_SetupCameraInstanceStoring()
{
    // Store MVCameraModelInstance
    AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCameraModel").implementation = function(cameraModel: Il2Cpp.Object)
    {
        this.method("RegisterMainCameraModel").invoke(cameraModel)
    
        MVCameraModelInstance = cameraModel
    }

    // Stop storing
    AssemblyImage.class("Sekai.Live.Background3DPlayer").method("Unload").implementation = function()
    {
        this.method("Unload").invoke()
        MVCameraModelInstance = null
    }
}
//

// For first person //
export function CharList_LogIndexAndCharName(characterList: Il2Cpp.Array<Il2Cpp.Object>)
{
    if(MasterDataManagerInstace.isNull())
    {
        console.log("MasterDataManagerInstace is null, returning")
        return
    }
    
    console.log("\nCharacter models of this MV:")
    for(let i = 0; i < characterList.length; i++)
    {
        const character = MasterDataManagerInstace.method<Il2Cpp.Object>("GetMasterGameCharacter")
                            .invoke(characterList.get(i).method<number>("get_CharacterDataId").invoke())
        const characterName = character.method<Il2Cpp.String>("get_FullName").invoke()
        const characterNameEng = character.method<Il2Cpp.String>("get_FullNameEnglish").invoke()

        console.log(`Index: ${i} | Character Name: (JP: ${characterName} ENG: ${characterNameEng})`)
    }
}

export function AttachCamToCharHead(camTransform: Il2Cpp.Object, character: Il2Cpp.Object)
{
    if(character.isNull())
    {
        console.log("character is null, returning")
        return
    }

    if(camTransform.isNull())
    {
        console.log("camTransform is null, returning")
        return
    }

    camTransform.method("SetParent").overload("UnityEngine.Transform", "System.Boolean")
        .invoke(character.method<Il2Cpp.Object>("get_HeadTransform").invoke(), false)
}

const deactivateTargetArray = ["Face", "Hair"]
export function SetActiveOfDeactivateTargets(character: Il2Cpp.Object, value: boolean)
{
    deactivateTargetArray.forEach(deactivateTarget => {
        character.method<Il2Cpp.Object>(`get_${deactivateTarget}`).invoke().method("SetActive").invoke(value)
    })
}
//