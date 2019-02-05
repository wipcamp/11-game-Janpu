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
        let respon =new Responsive()
        respon.check(phasers.scene.manager.game.config.height,phasers.scene.manager.game.config.width)

        scale = respon.getScale();
        console.log(scale)

        platform = new Platform({scene: phasers,})
        platform.create();
        
        hiddenPlatform = phasers.physics.add.staticImage(50,platform.getPlatformY(),'staticPlatform').setVisible(false).setScale(scale);

        player = phasers.physics.add.sprite(50, hiddenPlatform.y -70, 'player')
        player.body.allowGravity = true;
        player.setScale(0.05*scale);

        zone = phasers.add.zone(0, 0, respon.getPositionX()*2, respon.getPositionY()*2).setOrigin(0).setName('left').setInteractive();
        console.log(zone)

        phasers.input.on('gameobjectdown', function (pointer) {
            player.anims.play('run');
            if (player.body.onFloor()) {
                player.setVelocityY(-500);

            }

        });

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 50,
            repeat: -1,
        });

        phasers.anims.create({
            key: 'die',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 50,
            repeat: -1,
        });

        phasers.physics.add.collider(player, hiddenPlatform);

        cursors = phasers.input.keyboard.createCursorKeys();

        phasers.physics.add.overlap(player,platform.getObstracle(),hit);
        phasers.physics.add.overlap(player,platform.getObstracle2(),hit);

        popUp = new PopUpRetry({scene: phasers,})
        popUp.create();

    }

    restart(){
        popUp.getPopUp().setVisible(false);
        popUp.getRetry().setVisible(false);
        gameOver = false;
    }

    getPlayer() {
        return player;
    }

    update() {

        platform.update();

        if(gameOver == true){
            player.setVelocityY(0);
            platform.gameOver(); 
            popUp.gameOver();        
        }

        if(player.body.onFloor()){
            if(cursors.space.isDown){
                
            player.anims.play('run');
            player.setVelocityY(-500 );
        }
        }
            
               
    }
}

function hit() {
    player.anims.play('die');
    gameOver = true;
}

export default GameScene;