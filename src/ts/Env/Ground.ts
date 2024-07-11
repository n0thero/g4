import * as t3 from "three";

export default class Ground {

    public mesh: t3.Mesh;

    private size_default: number = 1000;
    private color_default: string = '#513b35';

    constructor() {
        this.mesh = new t3.Mesh(
            new t3.PlaneGeometry(this.size_default, this.size_default),
            new t3.MeshBasicMaterial({color: this.color_default})
        );
        this.mesh.rotation.x = -Math.PI / 2;
    }

    init(scene: t3.Scene) {
        scene.add(this.mesh);
    }
}
