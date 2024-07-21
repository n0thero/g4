import * as t3 from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {FBXLoader} from "three/addons";
import {game} from "../InitGame.ts";
import Camera from "../game/cameras/Camera.ts";
import StatsT3 from "stats.js";

export default class G3 {

    renderer: t3.WebGLRenderer;

    t3camera: t3.PerspectiveCamera | null = null;
    camera: Camera | null = null;
    scene: t3.Scene | null = null;

    requestDelta: number = 0;

    textureLoader: t3.TextureLoader;
    fbxLoader: any;
    gltfLoader: any;

    private clock: t3.Clock;
    private controls: any;
    private isControlsInitialized: boolean = false;
    private axesHelper: t3.AxesHelper;
    private stats: any;

    public bot: t3.Mesh | null = null;

    private animMixer: t3.AnimationMixer | null = null;

    constructor() {

        // Init renderer
        this.renderer = new t3.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = t3.PCFSoftShadowMap;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('app')!.appendChild(this.renderer.domElement);

        // Init loaders
        this.textureLoader = new t3.TextureLoader();
        this.fbxLoader = new FBXLoader();
        this.gltfLoader = new GLTFLoader();

        this.clock = new t3.Clock();
        this.axesHelper = new t3.AxesHelper(1);

        // Init stats
        this.stats = new StatsT3();
        this.stats.dom.id = 'stats-t3';
        document.body.appendChild(this.stats.dom);
    }

    animate = () => {

        this.requestDelta = this.clock.getDelta();

        requestAnimationFrame(this.animate);

        // game.player().mesh.rotation.y = this.degToRad(180);

        // game.player().mesh.rotation.y += 0.01;
        game.player().character.mesh.updateMatrixWorld();

        game.camera.updatePositionByCharacter();
        game.scene.sky.updatePositionByCharacter();

        if (this.isControlsInitialized) {
            this.controls.update();
        }

        if (this.axesHelper) {
            this.moveAxesHelper();
        }

        if (this.animMixer) {
            this.animMixer.update(this.requestDelta);
        }

        this.stats.begin();

        if (this.scene && this.t3camera) {

            this.renderer.render(
                this.scene,
                this.t3camera);
        }

        this.stats.end();
    }

    //

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

    getDefaultCube() {
        return new t3.Mesh(
            new t3.BoxGeometry(1, 1, 1),
            new t3.MeshBasicMaterial({color: '#fff'})
        )
    }

    getBotMesh(): t3.Mesh {
        return this.bot!;
    }

    // gizmo

    addAxesGizmo() {
        this.scene!.add(this.axesHelper);
    }

    moveAxesHelper() {
        const gizmoDistance = 20;
        const direction = new t3.Vector3();
        this.t3camera!.getWorldDirection(direction);
        this.axesHelper.position
            .copy(this.t3camera!.position)
            .add(direction.multiplyScalar(gizmoDistance));
        this.axesHelper.position.y += 4;
    }

    // misc.

    stop() {
        this.scene = null;
        this.t3camera = null;
        this.camera = null;
        this.isControlsInitialized = false;
    }

    addOrbitControls() {
        this.controls = new OrbitControls(this.t3camera, this.renderer.domElement);
        this.isControlsInitialized = true;
    }

    textureScaleHandler = (t: any) => {
        t.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        t.wrapS = t3.RepeatWrapping;
        t.wrapT = t3.RepeatWrapping;
        let repeats = 100;
        t.repeat.set(repeats, repeats);
        t.minFilter = t3.LinearMipMapLinearFilter;
    }

    degToRad(degrees: number): number {
        return t3.MathUtils.degToRad(degrees);
    }
}
