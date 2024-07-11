import * as THREE from 'three';
import {g3} from "./../InitGame.ts";

export default class Player {

    private mesh: THREE.Mesh;

    constructor(is_default: boolean = false) {

        if (is_default) {
            this.mesh = g3.player();
        } else {
            this.mesh = g3.createNewPlayerMesh();
        }
    }
}
