import './css/index.scss';
import InitGame from "./ts/InitGame.ts";

const platform = import.meta.env.VITE_PLATFORM;

let mainModule;

if (platform === 'web') {
    mainModule = import('./ts/platform/web/main.ts');
} else if (platform === 'android') {
    mainModule = import('./ts/platform/android/main.ts');
} else if (platform === 'ios') {
    mainModule = import('./ts/platform/ios/main.ts');
} else {
    throw new Error('Unsupported platform');
}

mainModule.then(module => {

    module
        .init()
        .then(() => {
            InitGame();
        });
});
