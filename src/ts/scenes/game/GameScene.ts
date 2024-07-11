import {g3, game, gp} from "../../InitGame.ts";
import {_AbstractGameScene} from "./_AbstractGameScene.ts";
import CharacterController from "../../game/Controllers/CharacterController.ts";
import PGameScene from "../phaser/PGameScene.ts";
import PWelcomeScene from "../phaser/PWelcomeScene.ts";

export default class GameScene extends _AbstractGameScene {

    constructor() {
        super();
        this.init3d();

        gp.scene.stop('PWelcomeScene');

        setTimeout(() => {
            gp.scene.start('PGameScene', {continue: false});
        }, 0);

        this.controller = new CharacterController(game.player().character);
    }

    init3d() {
        super.init3d();

        this.camera().position.x = 0;
        this.camera().position.y = 100;
        this.camera().position.z = 250;

        g3.addOrbitControls(this.camera());

        g3.scene = this._scene;
        g3.camera = this.camera();

        g3.animate();
    }
}
