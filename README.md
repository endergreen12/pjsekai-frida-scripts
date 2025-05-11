# Disclaimer
If you use these scripts for a video, please give credit

You are not allowed to adapt the code of these scripts to other scripts or publish them as your own scripts

# Scripts
## logger.ts
Hook Unity Log functions and display logs to console

Also log the loading of AssetBundle

![image](https://github.com/user-attachments/assets/86d89e18-2615-42e5-99f4-35a75a77600d)

## mv-fixed-camera.ts

![Screenshot_2025 03 25_04 07 30 921](https://github.com/user-attachments/assets/e34d21c3-00f4-458e-abc0-852615ea54e4)

## mv-character-camera.ts

- First person

  ![Screenshot_2025 05 05_23 46 21 495](https://github.com/user-attachments/assets/15216d7f-bacd-4a0d-a096-4800e38f7cf7)

- Third person

  ![out](https://github.com/user-attachments/assets/4b435987-d596-419e-88d2-48367a448349)

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

## misc.ts
There are some features:
- Force retire to avoid sending abnormal data to the server

  ![out](https://github.com/user-attachments/assets/712aa0b6-f172-4413-b464-b5ae287e0d6b)
  
- Supress Google Play Games authentication prompt

  ![Screenshot_2025 03 25_04 21 16 187](https://github.com/user-attachments/assets/05a01dbc-8b8e-45b6-9152-d9f3f767a356)

- Playgrounds

  It's just for fun. For example, there's code that changes all the notes into flicks

  To enable, uncomment them

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
