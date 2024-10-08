import * as t3 from "three";
import {g3, game} from "../../InitGame.ts";

export default class Sky {

    mesh: t3.Mesh;

    constructor() {

        const txrSky = g3.textureLoader.load(
            '/src/assets/textures/env/skybox.webp');

        this.mesh = new t3.Mesh(
            new t3.SphereGeometry(10000, 32, 32),
            new t3.MeshBasicMaterial({map: txrSky, side: t3.BackSide})
        );
    }

    init(scene: t3.Scene) {
        scene.add(this.mesh);
    }

    updatePositionByCharacter() {

        let player = game.player().character.mesh;

        if (!player) {
            return;
        }

        this.mesh.position.copy(player.position);
        this.mesh.updateMatrixWorld();
    }
}
