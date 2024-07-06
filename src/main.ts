import './style.css';
import {game, initGame} from "./common/utils.ts";

const platform = import.meta.env.VITE_PLATFORM;

let mainModule;

if (platform === 'web') {
    mainModule = import('./platform/web/main.ts');
} else if (platform === 'android') {
    mainModule = import('./platform/android/main.ts');
} else if (platform === 'ios') {
    mainModule = import('./platform/ios/main.ts');
} else {
    throw new Error('Unsupported platform');
}

mainModule.then(module => {

    module
        .init()
        .then(() => {
            initGame();


        });
});
