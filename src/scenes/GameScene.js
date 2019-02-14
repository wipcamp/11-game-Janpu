import Player from './core/player'
import Platform from './core/platform'
import PopUpRetry from './core/popUpRetry'
import Responsive from './core/responsive';

let trees;
let x, y;
let width, height;
let player;
let platform; 
let popUp;
let scale
let howto
let closehowto
let bg
let countplat
let countplayer
let cursors
let rotate
let respon

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

        this.load.image('rotate','../../images/rotate.png')

        this.load.image('bghowto','../../images/bghowto.png')

        this.load.image('howto','../../images/howto.png')

        this.load.image('gamecenter','../../images/gamecenter.png')

        this.load.image('bg','../../images/bgg.png')
        
        this.load.image('obstracle','../../images/daokrajai.png')

        this.load.image('platform', '../../images/bg1.png')

        this.load.image('staticPlatform','../../images/platform.png')

        this.load.image('gameoverbg','../../images/gameoverbg.png')

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
        
        respon =new Responsive()
        respon.check(this.scene.manager.game.config.height,this.scene.manager.game.config.width)

        scale = respon.getScale()
        
        player = new Player({ scene: this, })
        player.create()

        platform = new Platform({scene: this,})

        popUp = new PopUpRetry({scene: this,})

        bg = this.add.image(respon.getPositionX(),respon.getPositionY(),'bghowto').setInteractive()
        howto = this.add.image(respon.getPositionX(),respon.getPositionY(),'howto').setScale(0.5*scale)
        bg.on ('pointerup', () => { 
            console.log('close')
            bg.setVisible(false)
            howto.setVisible(false)
        });

        cursors = this.input.keyboard.createCursorKeys();

        rotate = this.add.image(respon.getPositionX(),respon.getPositionY(),'rotate').setInteractive().setVisible(false).setScale(scale)
        
        var txt;
        var person = prompt("Please enter your name:", "Harry Potter");
        }

    update() {

        player.update()

        if (cursors.space.isDown) {
            bg.setVisible(false)
            howto.setVisible(false)    
               
        }

        if(respon.getPositionX()<respon.getPositionY()){
                rotate.setVisible(true)
                rotate.on ('pointerup', () => { 
                    location.reload(); 
                });
                  
        }
        rotate.setScale(1)
        }

        
}

export default GameScene;
