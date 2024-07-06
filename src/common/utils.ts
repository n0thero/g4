import WelcomeScene from "../scenes/WelcomeScene.ts";
import GameScene from "../scenes/GameScene.ts";
import * as THREE from 'three';

export let game: Phaser.Game | null = null;

export function initGame(): void {

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    document.body.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x102010 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    animate();

    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transparent: true,
        scene: [WelcomeScene, GameScene],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    }

    if (!game) {
        game = new Phaser.Game(config);
    }
}

