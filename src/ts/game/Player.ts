import * as t3 from 'three';
import Character from "./Character.ts";
import {g3} from "../InitGame.ts";

export default class Player {

    mesh: t3.Mesh;
    character: Character;

    constructor(is_default: boolean = false) {

        if (is_default) {
        }

        // @ts-ignore
        this.mesh = g3.bot;
        this.mesh.castShadow = true;
        this.character = new Character(this.mesh);
    }

    spawn(scene: t3.Scene) {
        scene.add(this.mesh);
    }
}
