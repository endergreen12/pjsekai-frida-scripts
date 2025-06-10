import { AssemblyImage, CoreModuleImage } from "./consts.js"
import { CreateButton } from "./lib.js"

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

    export function GetMainCamFromMVCameraModel(cameraModel: Il2Cpp.Object): Il2Cpp.Object
    {
        return cameraModel.field<Il2Cpp.Object>("MainCameraModel").value.field<Il2Cpp.Object>("MainCamera").value
    }

    const changeFOV = false
    const targetFOV = 70
    if(changeFOV)
    {
        Il2Cpp.perform(() => {
            AssemblyImage.class("Sekai.Core.SekaiCameraAspect").method<number>("CalculateVerticalFov").implementation = function(currentFov: number)
            {
                return targetFOV
            }

            AssemblyImage.class("Sekai.Core.SekaiCameraAspect").method<number>("CalculateInvertVerticalFov").implementation = function(currentFov: number)
            {
                return targetFOV
            }

            // Disable fov correction curve as it breaks rendering if the fov is increased
            Il2Cpp.domain.assembly("Unity.RenderPipelines.Universal.Runtime").image.class("Sekai.Rendering.SekaiCharacterOutlineFeature").method("Create").implementation = function()
            {
                this.field<Il2Cpp.Object>("settings").value.field("fovCurve").value = NULL
            }
        })
    }
//

// For character camera //
    export let isThirdPersonEnabled = false

    let isButtonCreated = false
    export function ChangeImpl_CreateModeSwitchingButton()
    {
        // Create a button to switch between first person and third person
        AssemblyImage.class("Sekai.ScreenLayerMusicVideoCellPhone").method("OnInitComponent").implementation = function()
        {
            this.method("OnInitComponent").invoke()

            if(isButtonCreated)
                return

            const parentTransform = this.method<Il2Cpp.Object>("GetComponent", 0).inflate(CoreModuleImage.class("UnityEngine.RectTransform")).invoke()
            const onClick = (button: Il2Cpp.Object) => {
                isThirdPersonEnabled = !isThirdPersonEnabled
                
                const textComponent = button.method<Il2Cpp.Object>("GetComponentInChildren", 0)
                    .inflate(Il2Cpp.domain.assembly("Unity.TextMeshPro").image.class("TMPro.TextMeshProUGUI")).invoke()
                textComponent.method("set_text").invoke(Il2Cpp.string(GetModeName()))
            }

            CreateButton(3, 350, 100, 300, 50, 24, parentTransform, onClick, GetModeName())
            
            isButtonCreated = true
        }

        AssemblyImage.class("Sekai.ScreenLayerMusicVideoCellPhone").method(".ctor").implementation = function()
        {
            this.method(".ctor").invoke()

            isButtonCreated = false
        }
    }

    function GetModeName(): string
    {
        return "Mode: " + (isThirdPersonEnabled ? "Third Person" : "First Person")
    }

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

    const deactivateTargetArray = ["Face", "Hair"]
    export function SetActiveOfDeactivateTargets(characterModel: Il2Cpp.Object, value: boolean)
    {
        if(isThirdPersonEnabled)
        {
            return
        }

        deactivateTargetArray.forEach(deactivateTarget => {
            characterModel.method<Il2Cpp.Object>(`get_${deactivateTarget}`).invoke().method("SetActive").invoke(value)
        })
    }

    export function GetTargetTransformOfCharModelToAttach(characterModel: Il2Cpp.Object): Il2Cpp.Object
    {
        return isThirdPersonEnabled ? characterModel.method<Il2Cpp.Object>("get_PositionNote").invoke() : 
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