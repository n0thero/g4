import * as t3 from "three";
import Character from "./Character.ts";
import {game} from "../InitGame.ts";

export default class Camera {

    public camera: t3.PerspectiveCamera;
    private _character: t3.Mesh | null = null;

    constructor() {
        this.camera = new t3.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            100000
        );
    }

    init(scene: t3.Scene) {
        scene.add(this.camera);
    }

    startFollowCharacter(character: Character) {
        this._character = character.mesh;
        this.updatePositionByCharacter();
    }

    updatePositionByCharacter() {

        if (!this._character) {
            return;
        }

        const offset = new t3.Vector3(0, 150, 250);
        this.camera.position.copy(this._character!.position).add(offset);
        this.camera.lookAt(this._character!.position);
    }
}
