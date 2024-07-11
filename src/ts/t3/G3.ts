import * as t3 from 'three';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from "three/addons";

interface G3Cameras {
    main: t3.PerspectiveCamera;
    second: t3.PerspectiveCamera;
}

interface G3Lights {
    ambient: t3.AmbientLight,
    directional: t3.DirectionalLight
}

export default class G3 {

    private cameras: G3Cameras;
    private readonly _renderer: t3.WebGLRenderer;
    private readonly _scene: t3.Scene;

    // noinspection TypeScriptFieldCanBeMadeReadonly
    private _player: t3.Mesh;
    private _ground: t3.Mesh | null = null;
    private _lights: G3Lights | null = null;

    private textureLoader: t3.TextureLoader;
    private fbxLoader: any;
    private clock: t3.Clock;
    private skybox: t3.Mesh | null = null;
    private controls: any;

    constructor() {

        this._renderer = new t3.WebGLRenderer({ antialias: true });
        this.renderer().shadowMap.enabled = true;
        this.renderer().setSize(window.innerWidth, window.innerHeight);

        this._scene = new t3.Scene();

        this.cameras = {
            main: new t3.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000),
            second: new t3.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000),
        }

        this.camera().position.z = 50;
        this.camera().position.y = 10;

        document.getElementById('app')!
            .appendChild(this.renderer().domElement);

        this._player = this.createNewPlayerMesh();

        this.scene().add(this._player);

        this.controls = new OrbitControls(this.camera(), this.renderer().domElement);

        this.textureLoader = new t3.TextureLoader();
        this.fbxLoader = new FBXLoader();
        this.clock = new t3.Clock();

        this.animate();
    }

    camera() {
        return this.cameras.main;
    }

    renderer() {
        return this._renderer
    }

    scene() {
        return this._scene;
    }

    player() {
        return this._player;
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

    createBaseScene() {

        this._ground = new t3.Mesh(
            new t3.PlaneGeometry(1000, 1000),
            new t3.MeshBasicMaterial({color: '#513b35'})
        );
        this._ground.rotation.x = -Math.PI / 2;

        this._lights = {
            ambient: new t3.AmbientLight(0x404040),
            directional: new t3.DirectionalLight(0xfff, 1)
        }

        this.lights()!.directional.position.set(50, 50, 100);
        this.lights()!.directional.castShadow = true;

        this.lights()!.directional.shadow.mapSize.width = 1024;
        this.lights()!.directional.shadow.mapSize.height = 1024;
        this.lights()!.directional.shadow.camera.near = 0.5;
        this.lights()!.directional.shadow.camera.far = 500;
        this.lights()!.directional.shadow.camera.left = -50;
        this.lights()!.directional.shadow.camera.right = 50;
        this.lights()!.directional.shadow.camera.top = 50;
        this.lights()!.directional.shadow.camera.bottom = -50;

        this.createSkyBox();

        this.scene().add(this._ground);
        this.scene().add(this._lights.ambient);
        this.scene().add(this._lights.directional);

        this.lights()!.directional.target = this._ground;
    }

    lights() {
        return this._lights;
    }

    createSkyBox() {
        const txrSky = this.textureLoader.load('/src/assets/textures/env/skybox.webp');

        this.skybox = new t3.Mesh(
            new t3.SphereGeometry(1000, 32, 32),
            new t3.MeshBasicMaterial({map: txrSky, side: t3.BackSide})
        );

        this.scene().add(this.skybox);
    }

    textureScaleHandler = (t: any) => {
        t.anisotropy = this.renderer().capabilities.getMaxAnisotropy();
        t.wrapS = t3.RepeatWrapping;
        t.wrapT = t3.RepeatWrapping;
        t.repeat.set(40, 40);
        t.minFilter = t3.LinearMipMapLinearFilter;
    }

    //

    animate = () => {
        requestAnimationFrame(this.animate);

        this.player().rotation.y += 0.01;

        this.controls.update();
        this.renderer().render(this.scene(), this.camera());
    }
}
