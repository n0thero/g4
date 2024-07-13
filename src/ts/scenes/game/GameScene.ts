import {g3, game, gp} from "../../InitGame.ts";
import {_AbstractGameScene} from "./_AbstractGameScene.ts";
import CharacterController from "../../game/Controllers/CharacterController.ts";
import PGameScene from "../phaser/PGameScene.ts";
import PWelcomeScene from "../phaser/PWelcomeScene.ts";
import * as t3 from "three";

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
        this.initCoolGround();
        this._camera.startFollowCharacter(game.player().character);

        g3.scene = this._scene;
        g3.t3camera = this.camera();
        g3.camera = this._camera;

        // g3.addAxesGizmo();

        g3.animate();
    }

    private initCoolGround() {

        const txrBase = g3.textureLoader.load('/src/assets/textures/env/txr-earth-2-base.jpg', g3.textureScaleHandler);
        const txrHeight = g3.textureLoader.load('/src/assets/textures/env/txr-earth-2-height.png', g3.textureScaleHandler);
        const txrNormal = g3.textureLoader.load('/src/assets/textures/env/txr-earth-2-normal.jpg', g3.textureScaleHandler);

        this._ground.removeFromScene(this._scene);

        this._ground.setMesh(new t3.Mesh(
            new t3.PlaneGeometry(15000, 15000, 32, 32),
            new t3.MeshStandardMaterial({
                map: txrBase,
                normalMap: txrNormal,
                displacementMap: txrHeight,
                side: t3.DoubleSide
            })
        ));

        this._ground.addToScene(this._scene);
    }
}
