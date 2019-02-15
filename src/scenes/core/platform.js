import 'phaser';
import Responsive from './responsive';
import axios from 'axios';

let scale
let responsive
let phasers
let zone
let platform
let platform1
let platform2
let cursors
let num = 0;
let score = 0;
let scoreText;
let obstracle
let obstracle2
let random
let random2
let count1 = 0;
let rotate = 0;
let speed = 0;
let gameOver = false;
let bg
let gamecenter
let lastScore = 0
let topScore
let heightScore 
  
let count = 0;

class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload() {
        
    }


    create () {
        let respon =new Responsive()
        respon.check(window.screen.height, window.screen.width)
        bg = phasers.physics.add.staticImage(respon.getPositionX(),respon.getPositionY()+80,'bg')

        scale = respon.getScale()

        random = Math.random()*1000
        random2 = Math.random()*1000   

        platform1 = phasers.physics.add.sprite(5100*scale, respon.getPositionY(),'platform').setScale(1*scale);
        platform2 = phasers.physics.add.sprite(15300*scale, respon.getPositionY(),'platform').setScale(1*scale);

        platform = phasers.physics.add.staticImage(50,platform1.y+110,'staticPlatform').setVisible(false).setScale(scale);


        obstracle = phasers.physics.add.image(500,platform.y -30,'obstracle');
        obstracle.setScale(0.1*scale);

        obstracle2 = phasers.physics.add.image(900,platform.y - 30,'obstracle');
        obstracle2.setScale(0.1*scale);

        platform1.setImmovable(true)
        platform2.setImmovable(true)
        
        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;

        phasers.physics.add.collider(platform,obstracle)
        phasers.physics.add.collider(platform,obstracle2)

        zone = phasers.add.zone(0, 0, respon.getPositionX()*2, respon.getPositionY()*2).setOrigin(0).setName('zone').setInteractive()

        phasers.input.on('gameobjectdown', function (pointer) {
            if(!gameOver){
            count1 +=1;    
            num += 1;
            platform1.setVelocityX(-400)
            platform2.setVelocityX(-400)
            obstracle.setVelocityX(-400)
            obstracle2.setVelocityX(-400)
            if(score>=1000){
                platform1.setVelocityX(speed);
                platform2.setVelocityX(speed);
                obstracle.setVelocityX(speed);
                obstracle2.setVelocityX(speed);
            }}
            
        });

        cursors = phasers.input.keyboard.createCursorKeys();

        scoreText = phasers.add.text(16, respon.getPositionY()-160*scale, 'score: 0', { fontSize: 30*scale, fill: '#372f2d' });
        scoreText.setScale(scale)

        topScore = phasers.add.text(respon.getPositionX()*1.6, respon.getPositionY()-160*scale, 'topScore: 0', { fontSize: 30*scale, fill: '#372f2d' });
        topScore.setScale(scale)

        

    }
   

    gameOver(){

        num = 0;
        num -= 10;
        rotate = 0;
        count1 = 0;
        count1 -= 10;
        platform1.setVelocityX(0)
        platform2.setVelocityX(0)
        obstracle.setVelocityX(0)
        obstracle2.setVelocityX(0)
        lastScore = score;
        

        }

    restart(){
        num = 0;
        speed = 0;
        count1 = 0;
        count = 0;
        score = 0;
        scoreText.setText('Score: ' + score);

        obstracle.x = 500;
        obstracle2.x = 900;
        platform1.x = 5100*scale;        
        platform2.x =15300*scale;
    
        platform1.setVelocityX(0)
        platform2.setVelocityX(0)
        obstracle.setVelocityX(0)
        obstracle2.setVelocityX(0)
    }

    getLastScore(){
        return lastScore;
    }

    getObstracle(){
        return obstracle;
    }

    getObstracle2(){
        return obstracle2;
    }

    getPlatformY(){
        return platform.y;
    }

    getCount(){
        return count
    }

    update() {

        lastScore = score;

            if(cursors.space.isDown){
            count1 +=1;  
            num += 1;
            platform1.setVelocityX(-400);
            platform2.setVelocityX(-400);
            obstracle.setVelocityX(-400);
            obstracle2.setVelocityX(-400);
            if(score>=100){
                platform1.setVelocityX(speed);
                platform2.setVelocityX(speed);
                obstracle.setVelocityX(speed);
                obstracle2.setVelocityX(speed);
            }
        

                 
        }

        if(platform1.x <= -5090*scale){
            platform1.x = 15300*scale;
        }

        if(platform2.x <= -5090*scale){
            platform2.x = 15300*scale;
        }

        if(num > 0){
            score += 1;
            scoreText.setText('Score: ' + score);
            score = score;
            if(score>=100){
                platform1.setVelocityX(speed);
                platform2.setVelocityX(speed);
                obstracle.setVelocityX(speed);
                obstracle2.setVelocityX(speed);
            }
        }

        if(score >= 100+(count*100)){
            count += 1
            speed = (-400-(count*10))
        }
        
        rotate -= 10;
        obstracle.setAngle(rotate)     
        obstracle2.setAngle(rotate)   

        if(count1>=1){
            obstracle.x -= 10;
            obstracle2.x -= 10;
            if(obstracle.x<=-10){
                random = Math.random()*1000;
                obstracle.x = 1700+random;
            }
            else if(obstracle2.x<=-10){
                random2 = Math.random()*1000;
                obstracle2.x = 1700+random2;
            }
        } 

    }
}



export default GameScene;