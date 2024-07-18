import * as t3 from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
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
    public gltfLoader: any;

    public _renderer: t3.WebGLRenderer;
    private clock: t3.Clock;
    private controls: any;
    private isControlsInitialized: boolean = false;
    private _axesHelper: t3.AxesHelper;
    private stats: any;

    public bot: t3.Mesh | null = null;

    private animMixer: t3.AnimationMixer | null = null;

    constructor() {
        this._renderer = new t3.WebGLRenderer({antialias: true});
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = t3.PCFSoftShadowMap;

        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        document.getElementById('app')!.appendChild(this._renderer.domElement);

        this.textureLoader = new t3.TextureLoader();
        this.fbxLoader = new FBXLoader();
        this.gltfLoader = new GLTFLoader();
        this.clock = new t3.Clock();

        this._axesHelper = new t3.AxesHelper(1);

        this.stats = new StatsT3();
        this.stats.dom.id = 'stats-t3';
        document.body.appendChild(this.stats.dom);
    }

    loadResources(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.fbxLoader.load('/src/assets/meshes/bot.fbx', (object: any) => {

                let bot = object;

                let scale = 0.7;
                bot.scale.set(scale, scale, scale);

                this.animMixer = new t3.AnimationMixer(bot);
                this.animMixer.clipAction(bot.animations[1]).play();

                bot.traverse((mesh_details_item: any) => {
                    if (mesh_details_item.isMesh) {
                        mesh_details_item.castShadow = true;
                        mesh_details_item.receiveShadow = true;
                    }
                });

                this.bot = bot;

                resolve(1);
            }, undefined, (error: any) => { reject(error); })
        });
    }

    addOrbitControls(camera: t3.PerspectiveCamera) {
        this.controls = new OrbitControls(camera, this._renderer.domElement);
        this.isControlsInitialized = true;
    }

    createNewPlayerMesh() {
        return this.bot;
    }

    textureScaleHandler = (t: any) => {
        t.anisotropy = this._renderer.capabilities.getMaxAnisotropy();
        t.wrapS = t3.RepeatWrapping;
        t.wrapT = t3.RepeatWrapping;
        let repeats = 100;
        t.repeat.set(repeats, repeats);
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
        this._axesHelper.position.y += 4;
    }

    degToRad(degrees: number): number {
        return t3.MathUtils.degToRad(degrees);
    }

    animate = () => {

        requestAnimationFrame(this.animate);

        // game.player().mesh.rotation.y += 0.01;
        game.player().mesh.rotation.y = this.degToRad(180);

        this.camera!.updatePositionByCharacter();
        game.scene._sky.updatePositionByCharacter();

        if (this.isControlsInitialized) {
            this.controls.update();
        }

        if (this._axesHelper) {
            this.moveAxesHelper();
        }

        if (this.animMixer) {
            const delta = this.clock.getDelta();
            this.animMixer.update(delta);
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
