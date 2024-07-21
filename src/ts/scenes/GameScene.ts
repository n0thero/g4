import {g3, game, gp} from "../InitGame.ts";
import {AScene} from "./AScene.ts";
import CharacterController from "../input/controllers/CharacterController.ts";
import GridGround from "../visual/grounds/GridGround.ts";

export default class GameScene extends AScene {

    constructor() {
        super();

        this.ground = new GridGround();
        game.player().character.mesh = g3.getBotMesh();

        this.spawn3d();

        gp.scene.stop('PLoading');

        setTimeout(() => {
            gp.scene.start('PGame', {continue: false});
            this.controller = new CharacterController(game.player().character);
        }, 0);
    }

    spawn3d() {
        g3.scene = this.scene;
        super.spawn3d();

        g3.t3camera = this.camera.camera;
        g3.camera = this.camera;

        if (false) {

            this.ground.mesh.visible = false;
            this.lights.ambient.visible = false;
            this.lights.directional.visible = false;

            g3.gltfLoader.load('/src/assets/scenes/export-test.glb', (gltf: any) => {

                let scene = gltf.scene;
                scene.scale.set(50, 50, 50);
                scene.position.y += 100;
                scene.traverse((node: any) => {
                    if (node.isLight) {

                        if (node.name.includes('Sun')) {
                            node.intensity *= 0.002;
                            node.castShadow = false;
                            // node.visible = false;

                        } else {
                            node.intensity *= 0.05;
                            node.distance *= 1;
                            node.decay = 1;

                            node.castShadow = true;
                            node.shadow.bias = -0.00001;

                            node.shadow.mapSize.width = 2048;
                            node.shadow.mapSize.height = 2048;
                            node.shadow.camera.near = 0.5;
                            node.shadow.camera.far = 150000;
                            node.shadow.camera.left = -500;
                            node.shadow.camera.right = 500;
                            node.shadow.camera.top = 500;
                            node.shadow.camera.bottom = -500;
                        }

                    } else {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });

                g3.scene!.add(scene);
            });
        }

        this.camera.startFollowCharacter(game.player().character);

        g3.addAxesGizmo();
        g3.animate();
    }
}
