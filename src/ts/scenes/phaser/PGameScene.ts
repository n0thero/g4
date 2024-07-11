import Phaser from 'phaser';
import {g3} from "./../../InitGame.ts";

class PGameScene extends Phaser.Scene {

    constructor() {
        super({key: 'GameScene'});
    }

    init(data: { continue: boolean }) {
        if (data.continue) {
            // load save
        } else {
            // create new save
        }
    }

    create() {
        g3.createBaseScene();
    }
}

export default PGameScene;
