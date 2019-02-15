import 'phaser';
import Platform from './platform'
import PopUpRetry from './popUpRetry';
import Responsive from './responsive'

let phasers
let hiddenPlatform
let zone
let player
let cursors
let platform
let gameOver = false;
let popUp;
let scale
let secondJump = false;
let countJump = 0;
let foot1
let foot2
let die


class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload() {

    }


    create() {
        let respon = new Responsive()
        respon.check(phasers.scene.manager.game.config.height, phasers.scene.manager.game.config.width)

        scale = respon.getScale();

        platform = new Platform({ scene: phasers, })
        platform.create();

        hiddenPlatform = phasers.physics.add.staticImage(50, platform.getPlatformY(), 'staticPlatform').setVisible(false).setScale(scale);

        player = phasers.physics.add.sprite(50, hiddenPlatform.y - 70, 'player')
        player.body.allowGravity = true;
        player.setScale(0.05 * scale);

        zone = phasers.add.zone(0, 0, respon.getPositionX() * 2, respon.getPositionY() * 2).setOrigin(0).setName('left').setInteractive()

        phasers.input.on('gameobjectdown', function (pointer) {
            if(!gameOver){
                if (player.body.onFloor()) {
                    player.anims.play('run');
    
                    countJump += 1;
                    player.setVelocityY(-500);
                    foot1.play()
    
                }
                else if (countJump < 2) {
                    player.setVelocityY(-500);
                    countJump += 1
                    foot2.play()
                }
            }

        });

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        phasers.anims.create({
            key: 'die',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1,
        });

        phasers.physics.add.collider(player, hiddenPlatform);

        cursors = phasers.input.keyboard.createCursorKeys();

        phasers.physics.add.overlap(player, platform.getObstracle(), hit);
        phasers.physics.add.overlap(player, platform.getObstracle2(), hit);

        popUp = new PopUpRetry({ scene: phasers, })
        popUp.create();

        foot1 = phasers.sound.add('foot1',{
            mute: false,
            volume: 4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        foot2 = phasers.sound.add('foot2',{
            mute: false,
            volume: 4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        die = phasers.sound.add('died',{
            mute: false,
            volume: 4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

    }

    restart() {
        popUp.getPopUp().setVisible(false);
        popUp.getRetry().setVisible(false);
        gameOver = false;
    }

    getPlayer() {
        return player;
    }


    update() {

        popUp.update()

        if (player.body.onFloor()) {
            secondJump = false;
            countJump = 0;
        }

        platform.update();

        if (gameOver) {
            player.setVelocityY(0);
            platform.gameOver();
            popUp.gameOver();
        }
        if (!gameOver) {
            if (cursors.space.isDown) {
                player.anims.play('run');
                if (player.body.onFloor() && secondJump === false) {
                    player.setVelocityY(-500);
                    secondJump = true;
                    countJump += 1
                    foot1.play()
                }
                else if (countJump < 2 && secondJump === false) {
                    player.setVelocityY(-500);
                    secondJump = true;
                    countJump += 1
                    foot2.play()
                }
            }

            if (cursors.space.isUp) {
                secondJump = false;
            }
        }

    }
}

function hit(player, Platform) {
    die.play()
    player.anims.play('die');
    gameOver = true;
}

export default GameScene;