import {g3, game, gp} from "./../InitGame.ts";

import Player from "./Player.ts";
import GameScene from "../scenes/GameScene.ts";
import LoadingScene from "../scenes/LoadingScene.ts";

import CharacterController from "../input/controllers/CharacterController.ts";
import {AScene} from "../scenes/AScene.ts";
import Camera from "./cameras/Camera.ts";

export default class Game {

    scene: AScene;
    camera: Camera;

    private _players: Array<Player> = [];
    private debugStack: { [key: string]: any } = {};

    constructor() {
        this.camera = new Camera();
        this.scene = new LoadingScene();

        this.initPlayer();

        g3.loadResources()
            .then(() => {
                game.scene = new GameScene();
                this.showDebug();
            });
    }

    setCamera(newCamera: Camera) {
        this.camera = newCamera;
        g3.t3camera = newCamera.camera;
    }

    controller() {
        return this.scene.controller;
    }

    characterController(): CharacterController | null {

        return this.scene.controller instanceof CharacterController
            ? this.scene.controller
            : null;
    }

    initPlayer() {
        this._players = [
            new Player(true)
        ];
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
