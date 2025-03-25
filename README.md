# PJSekai-frida-scripts
## Scripts
### logger.ts
Hook Unity Log functions and display logs to console

Also log the loading of AssetBundle

![image](https://github.com/user-attachments/assets/86d89e18-2615-42e5-99f4-35a75a77600d)

### mv-fixed-camera.ts
As the file name says, fix the camera on the music video

![Screenshot_2025 03 25_04 07 30 921](https://github.com/user-attachments/assets/e34d21c3-00f4-458e-abc0-852615ea54e4)

### misc.ts
There are some features:
- Force retire at the end of the live to avoid sending invalid data to the server

  ![out](https://github.com/user-attachments/assets/712aa0b6-f172-4413-b464-b5ae287e0d6b)
  
- Supress Google Play Games authentication prompt

  ![Screenshot_2025 03 25_04 21 16 187](https://github.com/user-attachments/assets/05a01dbc-8b8e-45b6-9152-d9f3f767a356)

## How to use
### Requirements
- Node.js
- Frida
- Basic knowledge of how to use frida

1. Clone this repo and run this command:
```
npm install
```
2. After finished, Run this command:
```
frida -U -l [The file name of the script you want to use] "プロセカ"
```

## Notes
I have not tested these scripts in the English version, but they will probably work
