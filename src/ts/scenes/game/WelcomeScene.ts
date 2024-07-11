import {_AbstractGameScene} from "./_AbstractGameScene.ts";
import GameScene from "./GameScene.ts";
import {game} from "../../InitGame.ts";

/**
 * Does not create a Phaser scene because
 * one is pre-initialized in the startup script.
 */
export default class WelcomeScene extends _AbstractGameScene {

    constructor() {
        super();

        setTimeout(() => {
            game.scene = new GameScene();
        }, 20);
    }
}
