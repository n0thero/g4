import * as t3 from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from "three/addons";
import {game} from "../InitGame.ts";

export default class G3 {

    private readonly _renderer: t3.WebGLRenderer;
    textureLoader: t3.TextureLoader;

    fbxLoader: any;
    clock: t3.Clock;

    private controls: any;
    private is_controls_initialized: boolean = false;

    camera: t3.PerspectiveCamera | null = null;
    scene: t3.Scene | null = null;

    constructor() {
        this._renderer = new t3.WebGLRenderer({antialias: true});
        this._renderer.shadowMap.enabled = true;
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('app')!.appendChild(this._renderer.domElement);

        this.textureLoader = new t3.TextureLoader();
        this.fbxLoader = new FBXLoader();
        this.clock = new t3.Clock();

        // this.animate();
    }

    addOrbitControls(camera: t3.PerspectiveCamera) {
        this.controls = new OrbitControls(camera, this._renderer.domElement);
        this.is_controls_initialized = true;
    }

    createNewPlayerMesh() {

        let mesh = new t3.Mesh(
            new t3.ConeGeometry(10, 20, 4),
            new t3.MeshBasicMaterial({color: 0xdddddd})
        );

        mesh.castShadow = true;
        mesh.position.y += 12;

        return mesh;
    }

    textureScaleHandler = (t: any) => {
        t.anisotropy = this._renderer.capabilities.getMaxAnisotropy();
        t.wrapS = t3.RepeatWrapping;
        t.wrapT = t3.RepeatWrapping;
        t.repeat.set(40, 40);
        t.minFilter = t3.LinearMipMapLinearFilter;
    }

    stop() {
        this.scene = null;
        this.camera = null;
        this.is_controls_initialized = false;
    }

    animate = () => {

        requestAnimationFrame(this.animate);

        game.player().mesh.rotation.y += 0.01;

        if (this.is_controls_initialized) {
            this.controls.update();
        }

        if (this.scene && this.camera) {

            this._renderer.render(
                this.scene,
                this.camera);
        }
    }
}
