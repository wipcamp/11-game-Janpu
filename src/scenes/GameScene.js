import Player from './core/player'
import Platform from './core/platform'

let trees;
let x, y;
let width, height;
let player;
let platform; 

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

        this.load.spritesheet('platform', '../../images/ground.png', {
            frameWidth: 2404,
            frameHeight: 28,
          });

        this.load.image('staticPlatform','../../images/platform.png')

        this.load.image('obstracle','../src/image/weapon.png')

        this.load.image('tree', '../../images/tree.png');

        this.load.spritesheet('player', '../src/image/run.png',{
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {
        player = new Player({ scene: this, })
        player.create()

        platform = new Platform({scene: this,})


        }

    update() {
        player.update()
        }
}

export default GameScene;
