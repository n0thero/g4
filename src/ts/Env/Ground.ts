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

        this.makeDefaultRotation();
        this.mesh.receiveShadow = true;
    }

    setMesh(mesh: t3.Mesh) {
        this.mesh = mesh;
        this.makeDefaultRotation();
        this.mesh.receiveShadow = true;
    }

    private makeDefaultRotation(){
        this.mesh.rotation.x = -Math.PI / 2;
        this.mesh.rotation.z = 35;
    }

    removeFromScene(scene: t3.Scene) {
        scene.remove(this.mesh);
    }

    addToScene(scene: t3.Scene) {
        scene.add(this.mesh);
    }
}
