import * as t3 from "three";

export default class Camera {

    camera: t3.PerspectiveCamera;

    constructor() {
        this.camera = new t3.PerspectiveCamera;
    }

    init(scene: t3.Scene) {
        scene.add(this.camera);
    }
}
