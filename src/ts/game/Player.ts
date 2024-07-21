import * as t3 from 'three';
import Character from "../visual/characters/Character.ts";
import {g3} from "../InitGame.ts";

export default class Player {

    character: Character;

    constructor(is_default: boolean = false) {

        if (is_default) {
        }

        let mesh = g3.getDefaultCube();
        mesh.castShadow = true;

        this.character = new Character(mesh);
    }

    spawn(scene: t3.Scene) {
        scene.add(this.character.mesh);
    }
}
