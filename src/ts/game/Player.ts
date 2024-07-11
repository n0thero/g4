import * as t3 from 'three';
import {g3, game} from "./../InitGame.ts";
import Character from "./Character.ts";

export default class Player {

    mesh: t3.Mesh;
    character: Character;

    constructor(is_default: boolean = false) {

        if (is_default) {}

        this.mesh = g3.createNewPlayerMesh();
        this.character = new Character(this.mesh);
    }

    spawn(scene: t3.Scene) {
        scene.add(this.mesh);
    }
}
