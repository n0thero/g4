import Phaser from 'phaser';

// todo сейчас игровая сцена всего одна, но потом надо будет исп. в каждой

/*
import * as Phaser from 'phaser';

export interface TextMixinInterface {
    debugTextLogger: Phaser.GameObjects.Text | null;
    createDebugText(x: number, y: number, text: string): void;
    updateDebugText(newText: string): void;
    checkDebugTextExists(): boolean;
}

export const TextMixin = <T extends Phaser.Scene>(Base: new (...args: any[]) => T) =>
    class extends Base {
        debugTextLogger: Phaser.GameObjects.Text | null = null;

        createDebugText(x: number, y: number, text: string) {
            if (!this.debugTextLogger) {
                this.debugTextLogger = this.add.text(x, y, text, { fontSize: '32px', fill: '#fff' });
            }
        }

        updateDebugText(newText: string) {
            if (this.debugTextLogger) {
                this.debugTextLogger.setText(newText);
            }
        }

        checkDebugTextExists(): boolean {
            return this.debugTextLogger !== null;
        }
    };

*******

import * as Phaser from 'phaser';
import { TextMixin, TextMixinInterface } from './TextMixin';

class MyScene extends TextMixin(Phaser.Scene) implements TextMixinInterface {
    constructor() {
        super({ key: 'MyScene' });
    }

    preload() {
        // Загрузка ресурсов (если необходимо)
    }

    create() {
        // Изначально текст не создаем
    }
}

export default MyScene;

* */

export default class _PhaserSceneMixin extends Phaser.Scene {

    private debugTextLogger: Phaser.GameObjects.Text | null = null;

    createDebugText() {
        if (!this.debugTextLogger) {
            this.debugTextLogger = this.add.text(
                5,
                5,
                '',
                {
                    fontSize: '14px',
                    fontFamily: 'monospaced',
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, .1)'
                });
        }
    }

    updateDebugText(newText: string) {
        if (this.debugTextLogger) {
            this.debugTextLogger.setText(newText);
        }
    }

    isDebugTextExists(): boolean {
        return this.debugTextLogger !== null;
    }
}
