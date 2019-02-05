import 'phaser';
import Player from './player';
import Platform from './platform'
import Responsive from './responsive'

let phasers
let popUp
let retry
let player
let platform
let count =0;
let popUpBg
let share
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
        console.log(scale*scale)

        popUpBg = phasers.physics.add.staticImage(respon.getPositionX(),respon.getPositionY(),'gameoverbg').setVisible(false)
        popUp = phasers.physics.add.staticImage(respon.getPositionX(),respon.getPositionY()-20,'gameover').setVisible(false).setScale(0.25*scale);
        retry = phasers.add.sprite(popUp.x-50,popUp.y+60,'retry').setVisible(false).setScale(0.15*scale);
        retry.setInteractive(); 

        share = phasers.add.image(popUp.x+50,popUp.y+60,'share').setVisible(false).setScale(0.15*scale);
        share.setInteractive();

        player = new Player({scene:phasers,});

        platform = new Platform({scene:phasers,});

        phasers.anims.create({
            key: 'retry',
            frames: phasers.anims.generateFrameNumbers('retry', { start: 0, end: 2 }),
            frameRate: 50,
            repeat: -1,
          });

    }

    gameOver(){
        popUpBg.setVisible(true)
        popUp.setVisible(true);
        retry.setVisible(true);
        retry.on ('pointerup', () => { 
            popUpBg.setVisible(false)
            share.setVisible(false)
            player.restart();
            platform.restart();
            platform.update();
            count += 1;
        });
        share.setVisible(true);
        share.on ('pointerup', () => { 
            
        });
    }


    getPopUp(){
        return popUp;
    }

    getRetry(){
        return retry;
    }

    update() {
        if(count>0){
            popUp.setVisible(true);
            retry.setVisible(true);
        }
    }
}



export default GameScene;