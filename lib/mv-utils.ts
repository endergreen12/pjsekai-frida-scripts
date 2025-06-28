import { AssemblyImage, DialogSize, DisplayLayerType, UnityEngineUIButton, } from "./consts"
import { CreateButton, Show1ButtonDialog_1, CreateInputField, CreateText, GetComponentInChildren, GetProperty, GetInstanceOfSingleton, SetProperty, COMMON_1BUTTON_DIALOG_CLASS_NAME, GetTransform, CreateVector2, CreateVector3, UpdateTextOfDefaultControls, GetValueStateText } from "./lib"

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
            const trackObjects = GetProperty(asset, "trackObjects")
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
                if(targetTracksJudgement(GetProperty<Il2Cpp.String>(track, "name").toString()))
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

        // Disable outline as it breaks rendering when fov is increased
        Il2Cpp.domain.assembly("Unity.RenderPipelines.Universal.Runtime").image.class("Sekai.Rendering.SekaiCharacterOutlinePass").method("UpdateOutline").implementation = function(camera: Il2Cpp.Object)
        {
            if(!changeFOV)
            {
                this.method("UpdateOutline").invoke(camera)
            }
        }
    }
//

// For character camera //
    export let isThirdPersonEnabled = false

    let isButtonCreated = false
    export function ChangeImpl_CreateOpenOptionDialogButton(isFixedCamera: boolean = false)
    {
        AssemblyImage.class("Sekai.ScreenLayerMusicVideoCellPhone").method("OnInitComponent").implementation = function()
        {
            this.method("OnInitComponent").invoke()

            if(isButtonCreated)
                return

            CreateButton("Options", 38, CreateVector3(400, 400, 0), CreateVector2(300, 100), GetTransform(this as Il2Cpp.Object), (button: Il2Cpp.Object) => {
                const dialog = Show1ButtonDialog_1(COMMON_1BUTTON_DIALOG_CLASS_NAME, 0, "empty", "WORD_CLOSE", NULL, DisplayLayerType.Layer_Dialog, DialogSize.Medium)
                const dialogTransform = GetTransform(dialog)

                const sizeDelta = CreateVector2(400, 100)

                // Mode Switch button
                const modeButton = CreateButton(GetModeName(), 28, CreateVector3(-250, 150, 0), sizeDelta, dialogTransform, (button: Il2Cpp.Object) => {
                    isThirdPersonEnabled = !isThirdPersonEnabled
                    UpdateTextOfDefaultControls(button, GetModeName())
                })

                if(isFixedCamera) // Disable mode button for fixed camera
                {
                    const buttonComponent = GetComponentInChildren(modeButton, UnityEngineUIButton)
                    SetProperty(buttonComponent, "interactable", false)
                }

                // Change FOV button
                CreateButton(GetValueStateText("Change FOV", changeFOV), 28, CreateVector3(250, 150, 0), sizeDelta, dialogTransform, (button: Il2Cpp.Object) => {
                    changeFOV = !changeFOV
                    UpdateTextOfDefaultControls(button, GetValueStateText("Change FOV", changeFOV))
                })

                // Target FOV inputField
                const targetFOVInputField = CreateInputField(String(targetFOV), 48, CreateVector3(-250, -70, 0), sizeDelta, 2, dialogTransform, (inputField: Il2Cpp.Object, value: string) => {
                    targetFOV = parseInt(value)
                })
                CreateText("Target FOV:", 34, CreateVector3(0, 40, 0), sizeDelta, GetTransform(targetFOVInputField), "black")

                // Remove MeshOff tracks button
                CreateButton(GetValueStateText("Remove MeshOff tracks", removeMeshOffTrack), 28, CreateVector3(250, -70, 0), sizeDelta, dialogTransform, (button: Il2Cpp.Object) => {
                    removeMeshOffTrack = !removeMeshOffTrack
                    UpdateTextOfDefaultControls(button, GetValueStateText("Remove MeshOff tracks", removeMeshOffTrack))
                })
            })
            
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
        const characterId = GetProperty<number>(characterModel, "CharacterDataId")
        const gameCharacter = AssemblyImage.class("Sekai.CharacterUtility").method<Il2Cpp.Object>("GetMasterGameCharacter").invoke(characterId)

        return `Character Name: (JP: ${GetProperty<Il2Cpp.String>(gameCharacter, "FullName")} ENG: ${GetProperty<Il2Cpp.String>(gameCharacter, "FullNameEnglish")})`
    }

    const deactivateTargetArray = ["Face", "Hair"]
    export function SetActiveOfDeactivateTargets(characterModel: Il2Cpp.Object, value: boolean)
    {
        if(isThirdPersonEnabled)
        {
            return
        }

        deactivateTargetArray.forEach(deactivateTarget => {
            GetProperty(characterModel, deactivateTarget).method("SetActive").invoke(value)
        })
    }

    export function GetTargetTransformOfCharModelToAttach(characterModel: Il2Cpp.Object): Il2Cpp.Object
    {
        return GetProperty(characterModel, isThirdPersonEnabled ? "PositionNote" : "HeadTransform")
    }

    export function GetMVModelInstance(): Il2Cpp.Object
    {
        return GetInstanceOfSingleton(AssemblyImage.class("Sekai.Live.Model.MusicVideoModel"))
    }

    export function GetCharacterModelListFromMVModel(mvModel: Il2Cpp.Object): Il2Cpp.Array<Il2Cpp.Object>
    {
        return GetProperty(GetProperty<Il2Cpp.Object>(mvModel, "MainCharacterModel"), "CharacterModelList")
    }
//