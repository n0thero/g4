import Phaser from 'phaser';

class PWelcomeScene extends Phaser.Scene {

    private images_codes = {
        logo: 'logo'
    };

    constructor() {
        super({key: 'PWelcomeScene'});
    }

    preload() {
        this.load.image(this.images_codes.logo, '/src/assets/textures/ui/logo.png');
    }

    create() {

        /*
        * // todo вернуть клики. копипаста из GPT:
        *
function create() {
    // Пример создания кликабельного элемента
    const clickableElement = this.add.text(100, 100, 'Click me', { font: '24px Arial', fill: '#ffffff' })
        .setInteractive()
        .on('pointerdown', () => {
            console.log('Clicked on Phaser element');
            // Ваши действия при клике на элемент
        });

    // Обработчик события 'pointerdown' для canvas
    this.input.on('pointerdown', function (pointer) {
        const elements = this.input.hitTestPointer(pointer);
        if (elements.length === 0) {
            // Если ни один элемент не был нажат, пропускаем событие на canvas Three.js
            document.getElementById('threeCanvas').dispatchEvent(new MouseEvent('click', {
                clientX: pointer.clientX,
                clientY: pointer.clientY
            }));
        }
    }, this);
}

function update() {
    // your update code
}
        * */

        this.add.image(400, 200, this.images_codes.logo);

        const startText = this.add.text(400, 300, 'Start', {
            fontSize: '32px',
            color: '#fff'
        });
        startText.setInteractive();
        startText.on('pointerdown', () => {
            this.scene.start('GameScene', {continue: false});
        });

        const continueText = this.add.text(400, 300, 'Continue', {
            fontSize: '32px',
            color: '#fff'
        });
        continueText.setInteractive();
        continueText.on('pointerdown', () => {
            this.scene.start('GameScene', {continue: true});
        });

        Phaser.Display.Align.In.Center(startText, this.add.zone(400, 400, 800, 600));
        Phaser.Display.Align.In.Center(continueText, this.add.zone(400, 300, 800, 600));
    }
}

export default PWelcomeScene;
