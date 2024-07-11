import PWelcomeScene from "./scenes/phaser/PWelcomeScene.ts";
import PGameScene from "./scenes/phaser/PGameScene.ts";
import G3 from "./t3/G3.ts";
import Game from "./game/Game.ts";

export let gp: Phaser.Game;
export let g3: G3;
export let game: Game;

export default function InitGame(): void {

    const config: Phaser.Types.Core.GameConfig = {
        parent: 'app',
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transparent: true,
        scene: [PWelcomeScene, PGameScene],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    }

    if (!gp) {
        g3 = new G3();
        gp = new Phaser.Game(config);
        game = new Game();
    }
}

