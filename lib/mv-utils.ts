import { AssemblyImage, MasterDataManagerInstace } from "./consts.js"

// Shared //
const excludeFromRemovingTargets = ['"SubCamera"', '"Fade Out Track"']
export function ChangeImpl_RemoveUnneededTracksFromCamTimeline()
{
    AssemblyImage.class("Sekai.Core.MVDataLoader").method<Il2Cpp.Object>("LoadTimelineAsset").implementation = function(timelineName: Il2Cpp.String, mvId: number)
    {
        const asset = this.method<Il2Cpp.Object>("LoadTimelineAsset").invoke(timelineName, mvId)

        try
        {
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
                        if(!excludeFromRemovingTargets.includes(name))
                        {
                            trackObjects.method("RemoveAt").invoke(i)
                        }
                    }
                }
            }
        } catch(e)
        {
            console.log("An exception occoured while processing TimelineAsset:" + e)
        }
        return asset
    }
}

export function ChangeImpl_ForceDisableCameraDecoration() // TODO: find a better way
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
    console.log("\nCharacter models of this MV:")
    for(let i = 0; i < characterList.length; i++)
    {
        console.log(`Index: ${i} | ${GetCharacterNameFromCharacterModel(characterList.get(i))}`)
    }
}

export function GetCharacterNameFromCharacterModel(characterModel: Il2Cpp.Object): string
{
    if(MasterDataManagerInstace.isNull())
    {
        console.log("MasterDataManagerInstace is null, returning")
        return
    }

    const gameCharacter = MasterDataManagerInstace.method<Il2Cpp.Object>("GetMasterGameCharacter")
                            .invoke(characterModel.method<number>("get_CharacterDataId").invoke())

    return `Character Name: (JP: ${gameCharacter.method<Il2Cpp.String>("get_FullName").invoke()} ENG: ${gameCharacter.method<Il2Cpp.String>("get_FullNameEnglish").invoke()})`
}

export function AttachCamToTransfrom(camTransform: Il2Cpp.Object, targetTransform: Il2Cpp.Object)
{
    if(targetTransform.isNull())
    {
        console.log("targetTransform is null, returning")
        return
    }

    if(camTransform.isNull())
    {
        console.log("camTransform is null, returning")
        return
    }

    camTransform.method("SetParent").overload("UnityEngine.Transform", "System.Boolean").invoke(targetTransform, false)
}

const deactivateTargetArray = ["Face", "Hair"]
export function SetActiveOfDeactivateTargets(characterModel: Il2Cpp.Object, value: boolean)
{
    if(characterModel.isNull())
    {
        console.log("characterModel is null, returning")
        return
    }

    deactivateTargetArray.forEach(deactivateTarget => {
        characterModel.method<Il2Cpp.Object>(`get_${deactivateTarget}`).invoke().method("SetActive").invoke(value)
    })
}
//