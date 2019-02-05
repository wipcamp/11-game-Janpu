import 'phaser';
import GameScene from './scenes/GameScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.screen.width,
    height: window.screen.height,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    },
    scene: [
        GameScene
    ]
};

const game = new Phaser.Game(config);