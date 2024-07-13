import * as t3 from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from "three/addons";
import {game} from "../InitGame.ts";
import Camera from "../game/Camera.ts";
import StatsT3 from "stats.js";

export default class G3 {

    public t3camera: t3.PerspectiveCamera | null = null;
    public camera: Camera | null = null;
    public scene: t3.Scene | null = null;
    public textureLoader: t3.TextureLoader;
    public fbxLoader: any;

    private readonly _renderer: t3.WebGLRenderer;
    private clock: t3.Clock;
    private controls: any;
    private isControlsInitialized: boolean = false;
    private _axesHelper: t3.AxesHelper;
    private stats: any;

    constructor() {
        this._renderer = new t3.WebGLRenderer({antialias: true});
        this._renderer.shadowMap.enabled = true;
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('app')!.appendChild(this._renderer.domElement);

        this.textureLoader = new t3.TextureLoader();
        this.fbxLoader = new FBXLoader();
        this.clock = new t3.Clock();

        this._axesHelper = new t3.AxesHelper(1);

        this.stats = new StatsT3();
        this.stats.dom.id = 'stats-t3';
        document.body.appendChild(this.stats.dom);
    }

    addOrbitControls(camera: t3.PerspectiveCamera) {
        this.controls = new OrbitControls(camera, this._renderer.domElement);
        this.isControlsInitialized = true;
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
        this.t3camera = null;
        this.camera = null;
        this.isControlsInitialized = false;
    }

    addAxesGizmo() {
        this.scene!.add(this._axesHelper);
    }

    moveAxesHelper() {
        const gizmoDistance = 20;
        const direction = new t3.Vector3();
        this.t3camera!.getWorldDirection(direction);
        this._axesHelper.position
            .copy(this.t3camera!.position)
            .add(direction.multiplyScalar(gizmoDistance));
    }

    animate = () => {

        requestAnimationFrame(this.animate);

        game.player().mesh.rotation.y += 0.01;
        this.camera!.updatePositionByCharacter();
        game.scene._sky.updatePositionByCharacter();

        if (this.isControlsInitialized) {
            this.controls.update();
        }

        if (this._axesHelper) {
            this.moveAxesHelper();
        }

        this.stats.begin();

        if (this.scene && this.t3camera) {

            this._renderer.render(
                this.scene,
                this.t3camera);
        }

        this.stats.end();
    }
}
