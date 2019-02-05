import Player from './core/player'
import Platform from './core/platform'
import PopUpRetry from './core/popUpRetry'

let trees;
let x, y;
let width, height;
let player;
let platform; 
let popUp;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        
        this.load.image('obstracle','../../images/daokrajai.png')

        this.load.image('platform', '../../images/bg.png')

        this.load.image('staticPlatform','../../images/platform.png')

        this.load.image('gameoverbg','../../images/gameoverbg.png')

        this.load.image('tree', '../../images/tree.png');

        this.load.image('share','../../images/fbShare1.png')

        this.load.image('gameover','../../images/gameover.png')

        this.load.spritesheet('player', '../../images/run.png',{
            frameWidth: 1102,
            frameHeight: 1602,
        });

        this.load.spritesheet('retry', '../../images/retry.png',{
            frameWidth: 185,
            frameHeight: 164,
        });
    }

    create() {
        console.log(this.scene.manager.game.config.height)
        console.log(this.scene.manager.game.config.width)
        
        popUp = new PopUpRetry({scene: this,})
        
        player = new Player({ scene: this, })
        player.create()

        platform = new Platform({scene: this,})

        
        }

    update() {
        player.update()
        }
}

export default GameScene;
