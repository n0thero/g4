import * as t3 from "three";

export default class Character {

    private mesh: t3.Mesh;
    speed: number = 0;
    maxSpeed: number = 2;
    acceleration: number = 0;
    accelerationStep: number = .1;
    maxAcceleration: number = .5;
    private isJumping: boolean = false;
    private isJumpingUp: boolean = false;
    private jumpingInterval: number | null = null;

    constructor(mesh: t3.Mesh) {
        this.mesh = mesh;
    }

    moveForward() {
        this.accelerate();
        this.mesh.position.z -= this.speed;
    }

    moveBack() {
        this.accelerate();
        this.mesh.position.z += this.speed;
    }

    moveLeft() {
        this.accelerate();
        this.mesh.position.x -= this.speed;
    }

    moveRight() {
        this.accelerate();
        this.mesh.position.x += this.speed;
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
