# Disclaimer
If you use these scripts for a video, please give credit

You are not allowed to adapt the code of these scripts to other scripts or publish them as your own scripts

# Scripts
## logger.ts
Trace Unity log functions and loading of asset bundles

![image](https://github.com/user-attachments/assets/93d0e922-24d0-41ad-bfa6-3532bd9768e5)

## mv-fixed-camera.ts

![Screenshot_2025 03 25_04 07 30 921](https://github.com/user-attachments/assets/e34d21c3-00f4-458e-abc0-852615ea54e4)

## mv-character-camera.ts

- First person

  ![Screenshot_2025 05 27_22 56 52 202](https://github.com/user-attachments/assets/4176f90a-ea9f-41b9-8cfa-f9e6e4211881)
  
  ![Screenshot_2025 05 27_22 57 19 618](https://github.com/user-attachments/assets/7bb2363f-a69b-4e08-96e5-aa91adbe5da0)

- Third person

  ![out](https://github.com/user-attachments/assets/4b435987-d596-419e-88d2-48367a448349)

On Android, you can switch the target by pressing the back button

## lib/mv-utils.ts
Library used in fixed and character camera

There are some options value for users:

- reverseTargetJudge
  
  By default, this script removes all tracks except for the ones in the targets array, set this to true to remove the tracks in the targets array instead

  For example, if you want to keep post-processing but don't want DoF, set this true and target array to `['"Main Camera"', '"Sekai Dof Track"']`

- removeMeshOffTrack

  In some MV, characters may become disappeared due to staging

  This option prevents it

- ENABLE_THIRD_PERSON

  As the name suggests

- changeFOV

  As the name suggests

- targetFOV

  Specify the fov value that will be applied when changeFOV is true

For reverseTargetJudge and removeMeshOffTrack please note that they might not work because not every track of every MV has the same name

## misc/
There are some scripts in the folder:
- Force retire to avoid sending abnormal data to the server

  ![out](https://github.com/user-attachments/assets/712aa0b6-f172-4413-b464-b5ae287e0d6b)
  
- Supress Google Play Games authentication prompt

  ![Screenshot_2025 03 25_04 21 16 187](https://github.com/user-attachments/assets/05a01dbc-8b8e-45b6-9152-d9f3f767a356)

- Make all notes flick and critical

  https://github.com/user-attachments/assets/966f707d-e724-4e58-a992-54a559b4f2ca

There are other scripts which aren't introduced on this section, you can guess its feature from the file name

# How to use
## Requirements
- Node.js
- Frida
- Basic knowledge of how to use frida

---

1. Clone this repo and run this command:
```
npm install
```
2. After finished, Run this command:
```
frida -U -N com.sega.pjsekai -l the_script_you_want_to_use.ts
```

---

# Notes
I have not tested these scripts in the English version, but they will probably work
