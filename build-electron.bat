cd ionic
cd myApp
npm i @capacitor-community/electron
npx cap add @capacitor-community/electron
ionic build && npx cap copy @capacitor-community/electron
npx cap open @capacitor-community/electron
cd electron
electron-packager . --platform=win32 --overwrite