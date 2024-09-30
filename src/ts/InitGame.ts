import PLoading from "./scenes/phaser/PLoading.ts";
import PGame from "./scenes/phaser/PGame.ts";
import G3 from "./game/G3.ts";
import Game from "./game/Game.ts";
import Config from "./game/config/Config";

export let gp: Phaser.Game;
export let g3: G3;
export let game: Game;
export let config: Config;

export default function InitGame(): void {

    config = new Config();

    const phaser_config: Phaser.Types.Core.GameConfig = {
        parent: 'app',
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        transparent: true,
        scene: [PLoading, PGame],
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        }
    }

    if (!game) {
        g3 = new G3();
        gp = new Phaser.Game(phaser_config);

        game = new Game();
    }
}

