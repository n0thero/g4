import * as t3 from "three";
import {g3, game} from "../../InitGame.ts";

export default class Character {

    mesh: t3.Mesh;
    speed: number = 0;
    maxSpeed: number = 3;
    acceleration: number = 0;
    accelerationStep: number = .1;
    maxAcceleration: number = .5;

    private isJumping: boolean = false;
    private isJumpingUp: boolean = false;
    private jumpingInterval: number | null = null;

    constructor(mesh: t3.Mesh) {

        // this.maxSpeed *= 10;
        // this.maxAcceleration *= 10;

        this.mesh = mesh;

        setInterval(() => {
            game.watchInDebug('speed', this.speed.toFixed(1));
            game.watchInDebug('acceleration', this.acceleration.toFixed(1));
            game.watchInDebug('x', Math.floor(this.mesh.position.x));
            game.watchInDebug('y', Math.floor(this.mesh.position.y));
            game.watchInDebug('z', Math.floor(this.mesh.position.z));
        }, 1);
    }

    moveForward() {
        this.accelerate();
        this.mesh.position.z -= this.speed;
        this.mesh.rotation.y = g3.degToRad(180);
    }

    moveBack() {
        this.accelerate();
        this.mesh.position.z += this.speed;
        this.mesh.rotation.y = g3.degToRad(0);
    }

    moveLeft() {
        this.accelerate();
        this.mesh.position.x -= this.speed;
        this.mesh.rotation.y = g3.degToRad(270);
    }

    moveRight() {
        this.accelerate();
        this.mesh.position.x += this.speed;
        this.mesh.rotation.y = g3.degToRad(90);
    }

    stopMoving() {
        this.acceleration = 0;
        this.speed = 0;
    }

    jump() {

        if (this.isJumping) {
            return;
        }

        this.isJumping = true;
        this.isJumpingUp = true;

        this.jumpingInterval = setInterval(() => {

            this.mesh.position.z += this.isJumpingUp
                ? 0.1
                : -0.1;

            if (this.mesh.position.z > 5) {
                this.isJumpingUp = false;
            }

            if (this.mesh.position.z <= 0
                && !this.isJumpingUp
                && this.jumpingInterval) {

                this.isJumping = false;
                clearInterval(this.jumpingInterval);
            }
        }, 20);

    }

    private accelerate() {

        if (this.acceleration < this.maxAcceleration) {
            this.acceleration = Math.min(
                this.maxAcceleration,
                this.acceleration + this.accelerationStep);
        }

        if (this.speed < this.maxSpeed) {
            this.speed = Math.min(
                this.maxSpeed,
                this.speed + this.acceleration);
        }
    }
}
