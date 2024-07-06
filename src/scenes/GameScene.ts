import Phaser from 'phaser';

class GameScene extends Phaser.Scene {

    private counter!: number;
    private counterText!: Phaser.GameObjects.Text;

    constructor() {
        super({key: 'GameScene'});
    }

    init(data: { continue: boolean }) {
        if (data.continue) {

            let storedCounter = localStorage.getItem('counter');

            this.counter = storedCounter
                ? parseInt(storedCounter, 10)
                : 0;

        } else {

            this.counter = 0;
        }
    }

    create() {
        this.counterText = this.add.text(400, 200, `Счётчик: ${this.counter}`, {
            fontSize: '20px',
            color: '#f00'
        });

        const button = this.add.text(400, 200, 'Нажми меня', {
            fontSize: '16px',
            color: '#0ff'
        });

        button.setInteractive();
        button.on('pointerdown', () => {
            this.counter++;
            this.counterText.setText(`Счётчик: ${this.counter}`);
            localStorage.setItem('counter', this.counter.toString());
        });

        const exitButton = this.add.text(400, 400, 'В главное меню', {
            fontSize: '16px',
            color: '#f0f'
        });

        exitButton.setInteractive();
        exitButton.on('pointerdown', () => {
            this.scene.start('WelcomeScene');
        });

        Phaser.Display.Align.In.Center(this.counterText, this.add.zone(400, 200, 800, 600));
        Phaser.Display.Align.In.Center(button, this.add.zone(400, 300, 800, 600));
        Phaser.Display.Align.In.Center(exitButton, this.add.zone(400, 400, 800, 600));
    }
}

export default GameScene;
