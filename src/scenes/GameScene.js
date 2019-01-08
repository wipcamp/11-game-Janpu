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

        this.load.image('tree', '../../images/tree.png');

        this.load.spritesheet('player', '../src/image/run.png',{
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;
        x = width * 0.5;
        y = height * 0.5;



        trees = this.physics.add.staticGroup();
        trees.create(x, y, 'tree');


        player = new Player({ scene: this, })
        player.create()

        platform = new Platform({scene: this,})
        platform.create(); 

        }

    update() {
        player.update()
        platform.update();
    }
}

export default GameScene;
