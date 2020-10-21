cd ionic
cd myApp
npm i @capacitor-community/electron
rm -rf capacitor
npx cap add @capacitor-community/electron
ionic build && npx cap copy @capacitor-community/electron
npx cap open @capacitor-community/electron
cd electron
npm install electron-packager --save-dev
electron-packager . --platform=win32 --overwrite

# update for angular 9
# ng update @angular/cli @angular/core --allow-dirty

# create ionic app 
# ionic start appName blank --type=angular --capacitor

    Changing the default configuration
    In the *yourAppDir*/electron/src/index.ts file there will be a line reading: const myCapacitorApp = createCapacitorElectronApp(); here you can pass an object with your desired config changes (see config options for details).

    For example if you wanted to disable the splashscreen from showing while the app starts up you would pass an object like the following:

    Copy
    const myCapacitorApp = createCapacitorElectronApp({
      splashScreen: {
        useSplashScreen: false,
      },
    });