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
let person
let bgsound

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

        this.load.audio('bgSound','../../images/bgsound.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0
            }
        );
        
        this.load.audio('foot1','../../images/foot1.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

        this.load.audio('foot2','../../images/foot2.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

        this.load.audio('died','../../images/die.mp3', 
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            }
        );

        this.load.image('leaderlogo','../../images/leaderlogo.png')

        this.load.image('close','../../images/close.png')

        this.load.image('leader','../../images/leader.png')

        this.load.image('leaderbg','../../images/leaderbg.png')

        this.load.image('first','../../images/1.png')

        this.load.image('second','../../images/2.png')

        this.load.image('third','../../images/3.png')

        this.load.image('rotate','../../images/rotate.png')

        this.load.image('bghowto', '../../images/bghowto.png')

        this.load.image('howto', '../../images/howto.png')

        this.load.image('gamecenter', '../../images/gamecenter.png')

        this.load.image('bg', '../../images/bgg.png')

        this.load.image('obstracle', '../../images/daokrajai.png')

        this.load.image('platform', '../../images/bg1.png')

        this.load.image('staticPlatform', '../../images/platform.png')

        this.load.image('gameoverbg', '../../images/gameoverbg.png')

        this.load.image('share', '../../images/fbShare1.png')

        this.load.image('gameover', '../../images/gameover.png')

        this.load.spritesheet('player', '../../images/run.png', {
            frameWidth: 1102,
            frameHeight: 1602,
        });

        this.load.spritesheet('retry', '../../images/retry.png', {
            frameWidth: 185,
            frameHeight: 164,
        });
    }

    create() {

        respon = new Responsive()
        respon.check(window.screen.height-20/100*window.screen.height, window.screen.width)

        scale = respon.getScale()

        player = new Player({ scene: this, })
        player.create()

        platform = new Platform({ scene: this, })

        popUp = new PopUpRetry({ scene: this, })

        bg = this.add.image(respon.getPositionX(), respon.getPositionY(), 'bghowto').setInteractive()
        howto = this.add.image(respon.getPositionX(), respon.getPositionY(), 'howto').setScale(0.5 * scale)
        bg.on('pointerup', () => {
            bg.setVisible(false)
            howto.setVisible(false)
        });

        cursors = this.input.keyboard.createCursorKeys();
        
         person = prompt("Please enter your name:", "Wippo");

        bgsound = this.sound.add('bgSound',{
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        bgsound.play();
        }

    update() {

        player.update()
        if (cursors.space.isDown) {
            bg.setVisible(false)
            howto.setVisible(false)

        }
    }


}

export default GameScene;
