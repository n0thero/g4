import Phaser from 'phaser';

class PWelcomeScene extends Phaser.Scene {

    private images_codes = {
        logo: 'logo'
    };

    constructor() {
        super({key: 'WelcomeScene'});
    }

    preload() {
        this.load.image(this.images_codes.logo, '/src/assets/textures/ui/logo.png');
    }

    create() {
        // this.scene.start('GameScene', {continue: false});
        // return;

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
