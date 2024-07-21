import {g3, game} from "../InitGame.ts";
import * as t3 from "three";

import SceneLights from "../visual/lights/SceneLights.ts";
import BaseGround from "../visual/grounds/BaseGround.ts";
import Sky from "../visual/sky/Sky.ts";

import Camera from "../game/cameras/Camera.ts";
import {AController} from "../input/controllers/AController.ts";

export abstract class AScene {

    scene: t3.Scene;
    ground: BaseGround;
    sky: Sky;
    lights: SceneLights;
    camera: Camera;

    controller: AController|null = null;

    constructor() {
        g3.stop();
        this.scene = new t3.Scene();

        this.ground = new BaseGround();
        this.sky = new Sky();
        this.lights = new SceneLights();

        this.camera = new Camera();
        this.scene.add(this.camera.camera);

        if (game) {
            game.setCamera(this.camera);
        }
    }

    spawn3d() {
        this.ground.addToScene(this.scene);

        this.lights.init(this.scene);
        this.lights.directional.target = this.ground.mesh;

        this.sky.init(this.scene);

        game.player().spawn(this.scene);
    }
}
