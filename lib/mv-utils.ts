import { AssemblyImage, CoreModuleImage, RectTransform } from "./consts.js"
import { CreateButton, CreateInputField, CreateText, GetComponentInChildrenFromObj, SetParent } from "./lib.js"

// Shared //
    // For Camera timeline //
        const targets = ['"SubCamera"'] /* ['"MainCamera"', '"Sekai Dof Track"'] */
        const reverseTargetJudge = false
    // For Character timeline //
        let removeMeshOffTrack = false
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

    let changeFOV = false
    let targetFOV = 70
    export function ChangeImpl_ChangeFOV()
    {
        AssemblyImage.class("Sekai.Core.SekaiCameraAspect").method<number>("CalculateVerticalFov").implementation = function(currentFov: number)
        {
            return changeFOV ? targetFOV : this.method<number>("CalculateVerticalFov").invoke(currentFov)
        }

        AssemblyImage.class("Sekai.Core.SekaiCameraAspect").method<number>("CalculateInvertVerticalFov").implementation = function(currentFov: number)
        {
            return changeFOV ? targetFOV : this.method<number>("CalculateInvertVerticalFov").invoke(currentFov)
        }

        // Disable fov correction curve as it breaks rendering if the fov is increased
        Il2Cpp.domain.assembly("Unity.RenderPipelines.Universal.Runtime").image.class("Sekai.Rendering.SekaiCharacterOutlineFeature").method("Create").implementation = function()
        {
            this.field<Il2Cpp.Object>("settings").value.field("fovCurve").value = NULL
        }
    }
//

// For character camera //
    export let isThirdPersonEnabled = false

    let isButtonCreated = false
    export function ChangeImpl_CreateOpenOptionDialogButton(isFixedCamera: boolean = false)
    {
        // Create a button to switch between first person and third person
        AssemblyImage.class("Sekai.ScreenLayerMusicVideoConfirm").method("OnInitComponent").implementation = function()
        {
            this.method("OnInitComponent").invoke()

            if(isButtonCreated)
                return

            const parentTransform = GetComponentInChildrenFromObj(this as Il2Cpp.Object, RectTransform)

            const UnityTextMeshPro = Il2Cpp.domain.assembly("Unity.TextMeshPro").image
            CreateButton(0, 200, -400, 300, 100, 38, parentTransform, (button: Il2Cpp.Object) => {
                const screenManager = AssemblyImage.class("Sekai.ScreenManager").method<Il2Cpp.Object>("get_Instance").invoke()

                const dialog = screenManager.method<Il2Cpp.Object>("Show1ButtonDialog", 7).inflate(AssemblyImage.class("Sekai.Common1ButtonDialog"))
                    .invoke(0, Il2Cpp.string("empty"), Il2Cpp.string("WORD_CLOSE"), NULL, 4, 1, true)
                const dialogTransform = GetComponentInChildrenFromObj(dialog, RectTransform)

                // Mode Switch button
                const modeButton = CreateButton(0, 700, 200, 400, 100, 28, dialogTransform, (button: Il2Cpp.Object) => {
                    isThirdPersonEnabled = !isThirdPersonEnabled
                    GetComponentInChildrenFromObj(button, UnityTextMeshPro.class("TMPro.TextMeshProUGUI")).method("set_text").invoke(Il2Cpp.string(GetModeName()))
                }, GetModeName())

                if(isFixedCamera) // Disable mode button for fixed camera
                {
                    const buttonComponent = GetComponentInChildrenFromObj(modeButton, Il2Cpp.domain.assembly("UnityEngine.UI").image.class("UnityEngine.UI.Button"))
                    buttonComponent.method("set_interactable").invoke(false)
                }

                // Change FOV button
                CreateButton(0, 1200, 200, 400, 100, 28, dialogTransform, (button: Il2Cpp.Object) => {
                    changeFOV = !changeFOV
                    GetComponentInChildrenFromObj(button, UnityTextMeshPro.class("TMPro.TextMeshProUGUI")).method("set_text").invoke(Il2Cpp.string(GetValueStateText("Change FOV", changeFOV)))
                }, GetValueStateText("Change FOV", changeFOV))

                // Target FOV inputField
                CreateInputField(0, 1200, 0, 400, 100, 48, dialogTransform, (inputField: Il2Cpp.Object, string) => {
                    targetFOV = parseInt(string)
                }, String(targetFOV), 2)

                // Target FOV text
                const targetFOVtext = CreateText(0, 1200, 50, 400, 100, 34, dialogTransform, "Target FOV:")
                const targetFOVtextComponent = GetComponentInChildrenFromObj(targetFOVtext, Il2Cpp.domain.assembly("Unity.TextMeshPro").image.class("TMPro.TMP_Text"))
                targetFOVtextComponent.method("set_color").invoke(CoreModuleImage.class("UnityEngine.Color").method<Il2Cpp.Object>("get_black").invoke())

                // Remove MeshOff tracks button
                CreateButton(0, 700, 0, 400, 100, 28, dialogTransform, (button: Il2Cpp.Object) => {
                    removeMeshOffTrack = !removeMeshOffTrack
                    GetComponentInChildrenFromObj(button, UnityTextMeshPro.class("TMPro.TextMeshProUGUI")).method("set_text").invoke(Il2Cpp.string(GetValueStateText("Remove MeshOff tracks", removeMeshOffTrack)))
                }, GetValueStateText("Remove MeshOff tracks", removeMeshOffTrack))

            }, "Options")
            
            isButtonCreated = true
        }

        AssemblyImage.class("Sekai.ScreenLayerMusicVideoConfirm").method(".ctor").implementation = function()
        {
            this.method(".ctor").invoke()

            isButtonCreated = false
        }
    }

    function GetModeName(): string
    {
        return "Mode: " + (isThirdPersonEnabled ? "Third Person" : "First Person")
    }

    function GetValueStateText(name: string, value: boolean): string
    {
        return `${name}: ${value ? "Enabled": "Disabled"}`
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