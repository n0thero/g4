import Controller from "./Controller.ts";
import Character from "../Character.ts";

export default class CharacterController extends Controller {

    private target: Character;

    interval_w: number | null = null;
    interval_a: number | null = null;
    interval_s: number | null = null;
    interval_d: number | null = null;
    interval_space: number | null = null;

    W_pressed: boolean = false;
    A_pressed: boolean = false;
    S_pressed: boolean = false;
    D_pressed: boolean = false;

    constructor(target: Character) {
        super();
        this.target = target;

        setInterval(() => {
            this.checkThisIsMoving();
        }, 20);
    }

    isMovementKeyPressed(): boolean {
        return this.W_pressed
            || this.A_pressed
            || this.S_pressed
            || this.D_pressed;
    }

    moveForward() {
        if (this.interval_w) {
            return;
        }

        this.W_pressed = true;

        this.interval_w = setInterval(() => {
            this.target.moveForward();
        }, 20);

        if (this.interval_s) {
            this.S_pressed = false;
            clearInterval(this.interval_s);
            this.interval_s = null;
        }
    }

    moveBack() {
        if (this.interval_s) {
            return;
        }

        this.S_pressed = true;

        this.interval_s = setInterval(() => {
            this.target.moveBack();
        }, 20);

        if (this.interval_w) {
            this.W_pressed = false;
            clearInterval(this.interval_w);
            this.interval_w = null;
        }
    }

    moveLeft() {
        if (this.interval_a) {
            return;
        }

        this.A_pressed = true;

        this.interval_a = setInterval(() => {
            this.target.moveLeft();
        }, 20);

        if (this.interval_d) {
            this.D_pressed = false;
            clearInterval(this.interval_d);
            this.interval_d = null;
        }
    }

    moveRight() {
        if (this.interval_d) {
            return;
        }

        this.D_pressed = true;

        this.interval_d = setInterval(() => {
            this.target.moveRight();
        }, 20);

        if (this.interval_a) {
            this.A_pressed = false;
            clearInterval(this.interval_a);
            this.interval_a = null;
        }
    }

    jump() {
        this.target.jump();
    }

    private checkThisIsMoving() {

        if (!this.isMovementKeyPressed()) {

            if (this.interval_w) {
                clearInterval(this.interval_w);
                this.interval_w = null;
            }

            if (this.interval_s) {
                clearInterval(this.interval_s);
                this.interval_s = null;
            }

            if (this.interval_a) {
                clearInterval(this.interval_a);
                this.interval_a = null;
            }

            if (this.interval_d) {
                clearInterval(this.interval_d);
                this.interval_d = null;
            }

            this.target.stopMoving();

        } else {

            if (!this.W_pressed) {
                clearInterval(this.interval_w!);
                this.interval_w = null;
            }

            if (!this.A_pressed) {
                clearInterval(this.interval_a!);
                this.interval_a = null;
            }

            if (!this.S_pressed) {
                clearInterval(this.interval_s!);
                this.interval_s = null;
            }

            if (!this.D_pressed) {
                clearInterval(this.interval_d!);
                this.interval_d= null;
            }
        }
    }
}
