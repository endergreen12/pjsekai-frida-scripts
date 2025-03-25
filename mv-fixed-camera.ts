import { AssemblyImage, Vector3, MasterDataManagerInstace } from "./consts.js";
const ENABLE_FIRST_PERSON = true // true for first person, false for fixed camera
const targetCharIndex = 0 // First person target

// Remove only MainCamera animation from timeline assets
AssemblyImage.class("Sekai.Core.MVDataLoader").method<Il2Cpp.Object>("LoadTimelineAsset").implementation = function(timelineName: Il2Cpp.String, mvId: number)
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
                const name = arrayCopy.get(i).method<Il2Cpp.String>("get_name").invoke().toString()
                if(name == '"MainCamera"' || name == '"Sekai Dof Track"')
                {
                    trackObjects.method("RemoveAt").invoke(i)
                }
            }
        }
    }
    return asset
}

let CameraModelInstance: Il2Cpp.Object = null
// Set camera position and angles for fixed camera or store MusicVideoCameraModel instance for first person
AssemblyImage.class("Sekai.Live.Model.MusicVideoModel").method("RegisterMainCameraModel").implementation = function(cameraModel: Il2Cpp.Object)
{
    this.method("RegisterMainCameraModel").invoke(cameraModel)

    if(ENABLE_FIRST_PERSON)
    {
        CameraModelInstance = cameraModel
    } else {
        const newPos = Vector3.alloc()
        newPos.method(".ctor").invoke(0.0, 1.5, 7.0)
        const newAngles = Vector3.alloc()
        newAngles.method(".ctor").invoke(0.0, 180.0, 0.0)

        const cameraModelTransform = cameraModel.field<Il2Cpp.Object>("MainCameraModel").value
                                        .field<Il2Cpp.Object>("MainCamera").value
                                        .method<Il2Cpp.Object>("get_transform").invoke()

        cameraModelTransform.method("set_position").invoke(newPos.unbox())
        cameraModelTransform.method("set_eulerAngles").invoke(newAngles.unbox())
    }
}

if(ENABLE_FIRST_PERSON)
{
    // Set parent of MainCamera to target character
    AssemblyImage.class("Sekai.Live.Model.MusicVideoCharacterModel").method(".ctor").overload("Sekai.Core.CharacterModel[]", "Sekai.Core.CharacterInfo[]")
        .implementation = function(characterList: Il2Cpp.Array<Il2Cpp.Object>, characterInfos: Il2Cpp.Array<Il2Cpp.Object>)
    {
        this.method(".ctor").overload("Sekai.Core.CharacterModel[]", "Sekai.Core.CharacterInfo[]").invoke(characterList, characterInfos)

        // Log index and model of characters in MV
        console.log("Character models of this MV:")
        for(let i = 0; i < characterList.length; i++)
        {
            const character = MasterDataManagerInstace.method<Il2Cpp.Object>("GetMasterGameCharacter")
                                .invoke(characterList.get(i).method<number>("get_CharacterDataId").invoke())
            const characterName = character.method<Il2Cpp.String>("get_FullName").invoke()
            const characterNameEng = character.method<Il2Cpp.String>("get_FullNameEnglish").invoke()

            console.log(`Index: ${i} | Character Name: (JP: ${characterName} ENG: ${characterNameEng})`)
        }

        if(targetCharIndex > characterList.length - 1)
        {
            console.log(`The specified index "${targetCharIndex}" exceeds the size of the character list, returning`)
            return
        }
        
        const cameraModelTransform = CameraModelInstance.field<Il2Cpp.Object>("MainCameraModel").value
                                        .field<Il2Cpp.Object>("MainCamera").value
                                        .method<Il2Cpp.Object>("get_transform").invoke()
        const characterModel = characterList.get(targetCharIndex)

        cameraModelTransform.method("SetParent").overload("UnityEngine.Transform", "System.Boolean")
            .invoke(characterModel.method<Il2Cpp.Object>("get_HeadTransform").invoke(), false)

        // Changing parent makes eulerAngles (0.00, 0.00, 270.00) so set them all to 0.0, not sure why eulerAngles is changed
        const newAngles = Vector3.alloc()
        newAngles.method(".ctor").invoke(0.0, 0.0, 0.0)
        cameraModelTransform.method("set_eulerAngles").invoke(newAngles.unbox())

        // Deactivate the head of target character
        characterModel.method<Il2Cpp.Object>("get_Face").invoke().method("SetActive").invoke(false)
        characterModel.method<Il2Cpp.Object>("get_Hair").invoke().method("SetActive").invoke(false)
    }

    // Stop storing MusicVideoCameraModel instance
    AssemblyImage.class("Sekai.Live.Background3DPlayer").method("Unload").implementation = function()
    {
        this.method("Unload").invoke()
        CameraModelInstance = null
    }
}