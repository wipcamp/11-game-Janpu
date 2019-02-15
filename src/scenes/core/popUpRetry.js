import 'phaser'
import Player from './player';
import Platform from './platform'
import Responsive from './responsive'
import Leader from './leader'

let phasers
let popUp
let retry
let player
let platform
let popUpBg
let share
let scale
let score = 0;
let lastscore
let gamecenter
let leader


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
        respon.check(window.screen.height, window.screen.width)
        scale = respon.getScale();


        popUpBg = phasers.physics.add.staticImage(respon.getPositionX(),respon.getPositionY(),'gameoverbg').setVisible(false)
        popUp = phasers.physics.add.staticImage(respon.getPositionX(),respon.getPositionY()-20,'gameover').setVisible(false).setScale(0.25*scale);
        retry = phasers.add.sprite(popUp.x-50*scale,popUp.y+80*scale,'retry').setVisible(false).setScale(0.15*scale);
        retry.setInteractive(); 

        retry.on ('pointerup', () => { 
            lastscore.setVisible(false)
            share.setVisible(false)
            popUpBg.setVisible(false)
            gamecenter.setVisible(false)
            player.restart();
            platform.restart();
            platform.update();
        });


        player = new Player({scene:phasers,});

        platform = new Platform({ scene: phasers, });

        phasers.anims.create({
            key: 'retry',
            frames: phasers.anims.generateFrameNumbers('retry', { start: 1, end: 2 }),
            frameRate: 50,
            repeat: -1,
          });

          lastscore = phasers.add.text(respon.getPositionX()-85*scale,respon.getPositionY()-3+(3*scale), 'your score:'+score, { fontSize: 20*scale, fill: '#372f2d' }).setVisible(false); 

          share = phasers.add.image(popUp.x+50,popUp.y+80*scale,'share').setScale(scale*0.15).setVisible(false)
          share.setInteractive();
  
          gamecenter = phasers.add.image(respon.getPositionX(),respon.getPositionY()+respon.getPositionY()-40,'gamecenter').setScale(scale*0.5).setVisible(false)
          gamecenter.setInteractive();
  
          gamecenter.on('pointerup', () => {  });

          leader = new Leader({ scene: phasers, });
          
          share.on('pointerup', () => {  leader.click(); });
          leader.create()
    }

    gameOver(){
        lastscore.setText('your score:'+score)
        lastscore .setVisible(true);
        gamecenter.setVisible(true)
        popUpBg.setVisible(true)
        popUp.setVisible(true);
        share.setVisible(true)
        retry.setVisible(true);
        
    }


    getPopUp(){
        return popUp;
    }

    getRetry(){
        return retry;
    }

    update() {

        score = platform.getLastScore()

    }
}



export default GameScene;