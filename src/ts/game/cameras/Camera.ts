import * as t3 from "three";
import Character from "../../visual/characters/Character.ts";
import {g3} from "../../InitGame.ts";

export default class Camera {

    public camera: t3.PerspectiveCamera;
    private character: Character | null = null;

    constructor() {
        this.camera = new t3.PerspectiveCamera(
            110,
            window.innerWidth / window.innerHeight,
            1,
            100000
        );
    }

    startFollowCharacter(character: Character) {
        this.character = character;
        this.updatePositionByCharacter();
    }

    updatePositionByCharacter() {

        if (!this.character) {
            return;
        }

        const offset = new t3.Vector3(0, 150, 150);

        this.camera.position.copy(this.character.mesh.position).add(offset);
        this.camera.lookAt(this.character.mesh.position);
        this.camera.rotation.x += g3.degToRad(35);

        this.camera.updateMatrixWorld();
    }
}
