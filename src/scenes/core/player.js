import 'phaser';
import Platform from './platform'
import PopUpRetry from './popUpRetry';

import { runInNewContext } from 'vm';
let phasers
let hiddenPlatform
let zone
let player
let cursors
let platform
let gameOver = false;
let popUp;

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
        hiddenPlatform = phasers.physics.add.staticImage(50, 280, 'staticPlatform').setVisible(false);

        platform = new Platform({scene: phasers,})
        platform.create();
        
        hiddenPlatform = phasers.physics.add.staticImage(50,450,'staticPlatform').setVisible(false);

        player = phasers.physics.add.sprite(50, 400, 'player')
        player.body.allowGravity = true;
        player.setScale(5);

        zone = phasers.add.zone(0, 0, 1260, 560).setOrigin(0).setName('left').setInteractive();
        console.log(zone)

        phasers.input.on('gameobjectdown', function (pointer) {
            player.anims.play('run');
            if (player.body.onFloor()) {
                player.setVelocityY(-500);

            }

        });

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
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

        platform = new Platform({ scene: phasers, })
        platform.create();
        phasers.physics.add.overlap(player, platform.getObstracle(), hit);
        phasers.physics.add.overlap(player, platform.getObstracle2(), hit);

        popUp = new PopUpRetry({scene: phasers,})
        popUp.create();

    }

    restart(){
        popUp.getPopUp().setVisible(false);
        popUp.getRetry().setVisible(false);
    }

    getPlayer() {
        return player;
    }

    update() {

        platform.update();

        if (gameOver == true) {
            phasers.physics.pause();
            platform.gameOver(); 
            popUp.gameOver();
                      
        }

        if(player.body.onFloor()){
            if(cursors.space.isDown){
                
            player.anims.play('run');
            player.setVelocityY(-300);
        }

        else if (player.y <= 250) {
            player.setVelocityY(2000);
        }

        else if (player.y >= 281) {
            player.setVelocityY(0);
        }


        }
            
               
    }
}

function hit() {
    player.anims.play('die');
    gameOver = true;
}

export default GameScene;