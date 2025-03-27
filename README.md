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

  ![image](https://github.com/user-attachments/assets/563a1c3b-7bb2-46fe-93f9-c27b35aa7daa)

- Third person

  ![output](https://github.com/user-attachments/assets/160091c4-6dfb-46f5-973d-0a68eea85099)

---

Third person is disabled by default and can be enabled by setting ENABLE_THIRD_PERSON to true in the script

The target can be switched by using the back button on Android while playing the music video

Or you can specify the index of target character with targetCharIndex in script

---

The index is logged at the start of the MV with the name of the corresponding character

![image](https://github.com/user-attachments/assets/233784ce-43dd-4aff-ac3a-64a4786c3ada)

---

## misc.ts
There are some features:
- Force retire at the end of the live to avoid sending abnormal data to the server

  ![out](https://github.com/user-attachments/assets/712aa0b6-f172-4413-b464-b5ae287e0d6b)
  
- Supress Google Play Games authentication prompt

  ![Screenshot_2025 03 25_04 21 16 187](https://github.com/user-attachments/assets/05a01dbc-8b8e-45b6-9152-d9f3f767a356)

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
frida -U -l [The file name of the script you want to use] "プロセカ"
```

---

Alternatively, you can use tasks of vscode to run script or frida server

![image](https://github.com/user-attachments/assets/693db1dc-afd5-41b8-9fc7-a453de7ddf6e)

If frida is installed on venv, you need to install the Python extension to vscode and select venv as interpreter

See this: https://code.visualstudio.com/docs/python/environments#_select-and-activate-an-environment

# Notes
I have not tested these scripts in the English version, but they will probably work

## Camera post-processing, etc.
For the fixed and character cameras, all tracks except SubCamera in the Camera Timeline are deleted to remove the MainCamera animation

Therefore, there is no post-processing or fade at the end of the music video

If you want to keep them, set removeOnlyMainCamTrack to true in lib/mv-utils.ts

However, it also contains blur, which may cause unnatural blurring of vision

Both have their drawbacks
