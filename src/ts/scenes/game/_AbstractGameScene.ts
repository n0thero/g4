import {g3, game} from "../../InitGame.ts";
import * as t3 from "three";

import SceneLights from "../../Env/SceneLights.ts";
import Ground from "../../Env/Ground.ts";
import Sky from "../../Env/Sky.ts";

import Player from "../../game/Player.ts";
import Controller from "../../game/Controllers/Controller.ts";
import Camera from "../../game/Camera.ts";

export abstract class _AbstractGameScene {

    controller: Controller;

    _scene: t3.Scene;
    _ground: Ground;
    _sky: Sky;
    _lights: SceneLights;
    _camera: Camera;

    protected constructor() {

        this.controller = new Controller();

        this._scene = new t3.Scene();
        this._ground = new Ground();
        this._sky = new Sky();
        this._lights = new SceneLights();
        this._camera = new Camera();
    }

    init3d() {
        g3.stop();

        this._ground.addToScene(this._scene);
        this._lights.init(this._scene);
        this._sky.init(this._scene);
        this._camera.init(this._scene);

        this._lights.directional.target = this._ground.mesh;

        this.player().spawn(this._scene);
    }

    player() {
        return game.player();
    }

    camera(): t3.PerspectiveCamera {
        return this._camera.camera;
    }
}
