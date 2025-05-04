import { AssemblyImage } from "./consts.js"

// Shared //
    // For Camera timeline //
        const targets = ['"SubCamera"'] /* ['"MainCamera"', '"Sekai Dof Track"'] */
        const reverseTargetJudge = false
    // For Character timeline //
        const removeMeshOffTrack = false
    export function ChangeImpl_RemoveTargetTracksFromTimeline()
    {
        AssemblyImage.class("Sekai.Core.MVDataLoader").method<Il2Cpp.Object>("LoadTimelineAsset").implementation = function(timelineName: Il2Cpp.String, mvId: number)
        {
            const asset = this.method<Il2Cpp.Object>("LoadTimelineAsset").invoke(timelineName, mvId)

            const timelineNameStr = timelineName.toString()
            const trackObjects = asset.method<Il2Cpp.Object>("get_trackObjects").invoke()
            switch(timelineNameStr)
            {
                case '"Camera"':
                    RemoveTracksFromTimeLine(trackObjects, (name: string): boolean => targets.includes(name) === reverseTargetJudge)
                    break

                case '"Character"':
                    // Remove timeline for switching character visibility
                    if(removeMeshOffTrack)
                    {
                        RemoveTracksFromTimeLine(trackObjects, (name: string): boolean => name.includes("MeshOff"))
                    }
                    break
            }

            return asset
        }
    }

    function RemoveTracksFromTimeLine(trackObjects: Il2Cpp.Object, targetTracksJudgement: (name: string) => boolean)
    {
        const arrayCopy = trackObjects.method<Il2Cpp.Array<Il2Cpp.Object>>("ToArray").invoke()
        for(let i = arrayCopy.length - 1; i >= 0; i--)
        {
            const track = arrayCopy.get(i)
            if(!track.isNull())
            {
                if(targetTracksJudgement(track.method<Il2Cpp.String>("get_name").invoke().toString()))
                {
                    trackObjects.method("RemoveAt").invoke(i)
                }
            }
        }
    }

    export function ChangeImpl_ForceDisableCameraDecoration()
    {
        AssemblyImage.class("Sekai.Core.Setup3DUtility.CameraFactory").method<Il2Cpp.Object>("SetupCameraDecoration").implementation = function(targetCamera: Il2Cpp.Object, mvId: number)
        {
            return AssemblyImage.class("Sekai.CameraDecoration").new()
        }
    }

    export function GetMainCamTransformFromMVCameraModel(cameraModel: Il2Cpp.Object): Il2Cpp.Object
    {
        return cameraModel.field<Il2Cpp.Object>("MainCameraModel")
                .value.field<Il2Cpp.Object>("MainCamera")
                .value.method<Il2Cpp.Object>("get_transform").invoke()
    }
//

// For character camera //
    export const ENABLE_THIRD_PERSON = false

    export function CharModelList_LogIndexAndCharName(characterList: Il2Cpp.Array<Il2Cpp.Object>)
    {
        console.log("\nCharacter models of this MV:")
        for(let i = 0; i < characterList.length; i++)
        {
            console.log(`Index: ${i} | ${GetCharacterNameFromCharacterModel(characterList.get(i))}`)
        }
    }

    export function GetCharacterNameFromCharacterModel(characterModel: Il2Cpp.Object): string
    {
        const characterId = characterModel.method<number>("get_CharacterDataId").invoke()
        const gameCharacter = AssemblyImage.class("Sekai.CharacterUtility").method<Il2Cpp.Object>("GetMasterGameCharacter").invoke(characterId)

        return `Character Name: (JP: ${gameCharacter.method<Il2Cpp.String>("get_FullName").invoke()} ENG: ${gameCharacter.method<Il2Cpp.String>("get_FullNameEnglish").invoke()})`
    }

    export function SetParentOfTransform(transform: Il2Cpp.Object, targetTransform: Il2Cpp.Object)
    {
        transform.method("SetParent").overload("UnityEngine.Transform", "System.Boolean").invoke(targetTransform, false)
    }

    const deactivateTargetArray = ["Face", "Hair"]
    export function SetActiveOfDeactivateTargets(characterModel: Il2Cpp.Object, value: boolean)
    {
        if(ENABLE_THIRD_PERSON)
        {
            return
        }

        deactivateTargetArray.forEach(deactivateTarget => {
            characterModel.method<Il2Cpp.Object>(`get_${deactivateTarget}`).invoke().method("SetActive").invoke(value)
        })
    }

    export function GetTargetTransformOfCharModelToAttach(characterModel: Il2Cpp.Object): Il2Cpp.Object
    {
        return ENABLE_THIRD_PERSON ? characterModel.method<Il2Cpp.Object>("get_PositionNote").invoke() : 
                                    characterModel.method<Il2Cpp.Object>("get_HeadTransform").invoke()
    }

    export function GetMVModelInstance(): Il2Cpp.Object
    {
        return AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method<Il2Cpp.Object>("get_Instance").invoke()
    }

    export function GetCharacterModelListFromMVModel(mvModel: Il2Cpp.Object): Il2Cpp.Array<Il2Cpp.Object>
    {
        return mvModel.method<Il2Cpp.Object>("get_MainCharacterModel").invoke().method<Il2Cpp.Array<Il2Cpp.Object>>("get_CharacterModelList").invoke()
    }
//