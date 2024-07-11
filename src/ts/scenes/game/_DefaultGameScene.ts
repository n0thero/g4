import Player from "../../game/Player.ts";
import Ground from "../../Env/Ground.ts";
import Sky from "../../Env/Sky.ts";
import Controller from "../../game/Controller.ts";
import Camera from "../../game/Camera.ts";
import {game} from "../../InitGame.ts";

export abstract class _DefaultGameScene {

    ground: Ground;
    sky: Sky;
    controller: Controller;
    player: Player;
    camera: Camera;

    // todo выяснить зачем менять тип конструктора на protected
    // todo продолжать писать классы основных сцен
    constructor() {
        this.ground = new Ground();
        this.sky = new Sky();
        this.controller = new Controller();
        this.player = game.player();
        this.camera = new Camera();
    }
}
