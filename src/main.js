import 'phaser';
import GameScene from './scenes/GameScene';
import CheckScene from './scenes/CheckScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: window.screen.width,
    height: window.screen.height,
    setBackgroundColor :'black',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1400 },
            debug: false
        }
    },
    scene: [
        GameScene
    ]
};

const config2 = {
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
            gravity: { y: 1400 },
            debug: false
        }
    },
    scene: [
        CheckScene
    ]
};

if(window.screen.width<=420){
    const game = new Phaser.Game(config2);
}

let interval = setInterval(() => {
    if(window.screen.width>420){
        clearInterval(interval)
        config.width = window.screen.width
        config.height = window.screen.height
        const game = new Phaser.Game(config);
    }
}, 1000);

