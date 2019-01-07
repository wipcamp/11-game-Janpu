import Player from './core/player'
let player

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('player', '../src/image/ninja.jpg');
    }

    create() {
        player = new Player({ scene: this, })
        player.create()
    }

    update() {
        player.update()
    }
}

export default GameScene;
