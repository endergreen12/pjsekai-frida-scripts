import { AssemblyImage, DialogSize, DisplayLayerType, TMPInputField } from "./consts"
import { CreateButton, Show1ButtonDialog_1, GetComponentInChildren, GetProperty, GetInstanceOfSingleton, SetProperty, COMMON_1BUTTON_DIALOG_CLASS_NAME, GetTransform, CreateVector2, CreateVector3, CreateOptionToggleButton, CreateOptionInputField, GetField } from "./lib"

// Shared //
    // For Camera timeline //
        let tryToLeavePostProcessing = false
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
                    RemoveTracksFromTimeLine(trackObjects, (name: string): boolean => {
                        if(tryToLeavePostProcessing)
                        {
                            const searchStrArray = ["maincamera", "dof", "effect"]
                            const lowerCasedName = name.toLowerCase()
                            for(let i = 0; i < searchStrArray.length; i++) // forEach is gay
                            {
                                if(lowerCasedName.includes(searchStrArray[i]))
                                {
                                    return true
                                }
                            }

                            return false
                        } else {
                            return name != '"SubCamera"'
                        }
                    })
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
        return GetField(GetField<Il2Cpp.Object>(cameraModel, "MainCameraModel"), "MainCamera")
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

    export function ChangeImpl_DisablePausingByTouchingScreen()
    {
        AssemblyImage.class("Sekai.Core.Live.MusicVideoController").method("Pause").implementation = function()
        {

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
                const dialog = Show1ButtonDialog_1(COMMON_1BUTTON_DIALOG_CLASS_NAME, 0, "empty", "WORD_CLOSE", NULL, DisplayLayerType.Layer_Dialog, DialogSize.Large)
                const dialogTransform = GetTransform(dialog)

                const sharedSizeDelta = CreateVector2(400, 100)

                const modeButton = CreateOptionToggleButton(isThirdPersonEnabled, () => {
                    isThirdPersonEnabled = !isThirdPersonEnabled
                    return isThirdPersonEnabled
                }, "Mode", 28, CreateVector3(-250, 250, 0), sharedSizeDelta, dialogTransform, (value: boolean): string => value ? "Third Person" : "First Person", !isFixedCamera)

                const targetFOVInputField = CreateOptionInputField(targetFOV, (value: number) => {targetFOV = value}, "Target FOV:", 48, 34, CreateVector3(-250, 30, 0), sharedSizeDelta, dialogTransform, changeFOV)
                CreateOptionToggleButton(changeFOV, () => {
                    changeFOV = !changeFOV
                    SetProperty(GetComponentInChildren(targetFOVInputField, TMPInputField), "interactable", changeFOV)
                    return changeFOV
                }, "Change FOV", 28, CreateVector3(250, 250, 0), sharedSizeDelta, dialogTransform)

                CreateOptionToggleButton(removeMeshOffTrack, () => {removeMeshOffTrack = !removeMeshOffTrack; return removeMeshOffTrack}, "Remove MeshOff tracks", 28, CreateVector3(250, 30, 0), sharedSizeDelta, dialogTransform)
                CreateOptionToggleButton(tryToLeavePostProcessing, () => {
                    tryToLeavePostProcessing = !tryToLeavePostProcessing
                    return tryToLeavePostProcessing
                }, "Try to leave post-processing", 28, CreateVector3(-250, -190, 0), sharedSizeDelta, dialogTransform)
            })
            
            isButtonCreated = true
        }

        AssemblyImage.class("Sekai.ScreenLayerMusicVideoConfirm").method(".ctor").implementation = function()
        {
            this.method(".ctor").invoke()

            isButtonCreated = false
        }
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

        // For accessories
        const charModelTransform = GetTransform(characterModel)
        const accessoryObjName = GetField<Il2Cpp.String>(AssemblyImage.class("Sekai.Core.CharacterModel").nested("GameObjectNameDefine"), "Acc").toString()
        for(let i = 0; i < GetProperty<number>(charModelTransform, "childCount"); i++)
        {
            const childTransform = charModelTransform.method<Il2Cpp.Object>("GetChild").invoke(i)
            if(GetProperty<Il2Cpp.String>(childTransform, "name").toString() === accessoryObjName)
            {
                GetProperty(childTransform, "gameObject").method("SetActive").invoke(value)
            }
        }
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