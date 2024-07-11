import Player from "./Player.ts";
import {gp} from "./../InitGame.ts";
import GameScene from "../scenes/game/GameScene.ts";

export default class Game {

    // noinspection TypeScriptFieldCanBeMadeReadonly
    private _players: Array<Player> = [];

    scene: GameScene;

    constructor() {
        this._players = [
            new Player(true)
        ];

        this.scene = new GameScene();

        setTimeout(() => {
            gp.scene.start('GameScene', {continue: false});
        }, 3000);
    }

    player() {
        return this._players[0];
    }

    players() {
        return this._players;
    }
}
