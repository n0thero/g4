import Phaser from 'phaser';
import {g3, game} from "./../../InitGame.ts";

class PGameScene extends Phaser.Scene {

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
    private keyW: Phaser.Input.Keyboard.Key | null = null;
    private keyA: Phaser.Input.Keyboard.Key | null = null;
    private keyS: Phaser.Input.Keyboard.Key | null = null;
    private keyD: Phaser.Input.Keyboard.Key | null = null;
    private keySpace: Phaser.Input.Keyboard.Key | null = null;

    constructor() {
        super({key: 'PGameScene'});
    }

    init(data: { continue: boolean }) {
        if (data.continue) {
            // load save
        } else {
            // create new save
        }
    }

    preload() {
    }

    create() {

        this.add.text(10, 10, 'Demo', {
            fontSize: '12px',
            fontFamily: 'sans-serif',
            color: '#222'
        });

        this.cursors = this.input.keyboard!.createCursorKeys();
        this.keyW = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.keyboard!.on('keydown-W',
            () => {
                game.characterController()!.moveForward()
            });

        this.input.keyboard!.on('keyup-W', () => {
            game.characterController()!.W_pressed = false;
        });

        this.input.keyboard!.on('keydown-S',
            () => {
                game.characterController()!.moveBack()
            });

        this.input.keyboard!.on('keyup-S', () => {
            game.characterController()!.S_pressed = false;
        });


        this.input.keyboard!.on('keydown-A',
            () => {
                game.characterController()!.moveLeft()
            });

        this.input.keyboard!.on('keyup-A', () => {
            game.characterController()!.A_pressed = false;
        });

        this.input.keyboard!.on('keydown-D',
            () => {
                game.characterController()!.moveRight()
            });

        this.input.keyboard!.on('keyup-D', () => {
            game.characterController()!.D_pressed = false;
        });



        this.input.keyboard!.on('keydown-SPACE',
            () => {
                game.characterController()!.moveForward()
            });
    }
}

export default PGameScene;
