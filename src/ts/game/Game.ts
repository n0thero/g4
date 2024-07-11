import Player from "./Player.ts";
import {g3, gp} from "./../InitGame.ts";
import GameScene from "../scenes/game/GameScene.ts";
import WelcomeScene from "../scenes/game/WelcomeScene.ts";
import CharacterController from "./Controllers/CharacterController.ts";

export default class Game {

    private _players: Array<Player> = [];

    scene: GameScene;

    constructor() {

        this._players = [
            new Player(true)
        ];

        this.scene = new WelcomeScene();
    }

    controller() {
        return this.scene.controller;
    }

    characterController(): CharacterController | null {

        return this.scene.controller instanceof CharacterController
            ? this.scene.controller
            : null;
    }

    player() {
        return this._players[0];
    }

    players() {
        return this._players;
    }
}
