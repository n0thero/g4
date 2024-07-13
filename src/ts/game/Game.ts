import Player from "./Player.ts";
import {g3, gp} from "./../InitGame.ts";
import GameScene from "../scenes/game/GameScene.ts";
import WelcomeScene from "../scenes/game/WelcomeScene.ts";
import CharacterController from "./Controllers/CharacterController.ts";

export default class Game {

    // @ts-ignore
    public scene: GameScene;

    private _players: Array<Player> = [];
    private debugStack: { [key: string]: any } = {};

    constructor() {

        g3.loadResources().then(() => {

            this._players = [
                new Player(true)
            ];

            // @ts-ignore
            this.scene = new WelcomeScene();

            this.showDebug();
        });
    }

    controller() {
        return this.scene.controller;
    }

    characterController(): CharacterController | null {

        return this.scene.controller instanceof CharacterController
            ? this.scene.controller
            : null;
    }

    camera() {
        return this.scene.camera();
    }

    player() {
        return this._players[0];
    }

    players() {
        return this._players;
    }

    stopWatchInDebug(code: string) {
        delete this.debugStack[code];
    }

    watchInDebug(code: string, value: any) {
        this.debugStack[code] = value;
    }

    getPhaserScene() {
        let activeScenes = gp.scene.getScenes(true);
        return activeScenes.length
            ? activeScenes[0]
            : null;
    }

    showDebug() {

        setInterval(() => {

            let scene = this.getPhaserScene();

            if (!scene) {
                return;
            }

            // @ts-ignore
            if (!scene.isDebugTextExists()) {
                // @ts-ignore
                scene.createDebugText();
            }

            let text = '';

            let order = 0;

            Object.entries(this.debugStack).map(([key, value]) => {
                order++;
                text += `${key}: ${value}`;
                if (order !== Object.keys(this.debugStack).length) {
                    text += '\n';
                }
            });

            // @ts-ignore
            scene.updateDebugText(text);

        }, 100);
    }
}
