import 'phaser';
import PopUpRetry from './popUpRetry';

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
let popUp;

  
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


    create() {


        random = Math.random()*1000
        random2 = Math.random()*1000
        

        platform1 = phasers.physics.add.sprite(5100, 450,'platform').setScale(1);
        platform2 = phasers.physics.add.sprite(15300, 450,'platform').setScale(1);

        platform = phasers.physics.add.staticImage(50,420,'staticPlatform').setVisible(false);


        obstracle = phasers.physics.add.image(500,370,'obstracle');
        obstracle.setScale(0.05);

        obstracle2 = phasers.physics.add.image(900,370,'obstracle');
        obstracle2.setScale(0.05);

        platform1.setImmovable(true)
        platform2.setImmovable(true)
        
        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;

        phasers.physics.add.collider(platform,obstracle)
        phasers.physics.add.collider(platform,obstracle2)

        zone = phasers.add.zone(0, 0, 1260, 560).setOrigin(0).setName('zone').setInteractive();

        phasers.input.on('gameobjectdown', function (pointer) {
            count1 +=1;    
            num += 1;
            platform1.setVelocityX(-400)
            platform2.setVelocityX(-400)
            obstracle.setVelocityX(-400)
            obstracle2.setVelocityX(-400)
            if(num>0){
                score += 10;
                scoreText.setText('Score: ' + score);
                if(score>=1000){
                    platform1.setVelocityX(speed);
                    platform2.setVelocityX(speed);
                    obstracle.setVelocityX(speed);
                    obstracle2.setVelocityX(speed);
                    if(platform1.x<=-5100){
                        platform1.x = 5100;
                        platform2.x = 15300;
                    }
                }
            }
        });

        cursors = phasers.input.keyboard.createCursorKeys();

        scoreText = phasers.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFFFF' });

    }

    gameOver(){
        num = 0;
        num -= 10;
        rotate = 0;
        count1 = 0;
        count1 -= 10;
        phasers.physics.pause();
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
        platform1.x = 5100;        
        platform2.x =15300;
        obstracle.x = -10;
        obstracle2.x = -10;
        platform1.x = 1202;        
        platform2.x =3606;
        platform1.setVelocityX(0);
        platform2.setVelocityX(0);

        phasers.physics.resume();

    }

    getObstracle(){
        return obstracle;
    }

    getObstracle2(){
        return obstracle2;
    }

    update() {
        

        if(cursors.space.isDown){
            count1 +=1;  
            num += 1;
            platform1.setVelocityX(-400);
            platform2.setVelocityX(-400);
            obstracle.setVelocityX(-400);
            obstracle2.setVelocityX(-400);
            if(num>0){
                score += 10;
                scoreText.setText('Score: ' + score);
                if(score>=1000){
                    platform1.setVelocityX(speed);
                    platform2.setVelocityX(speed);
                    obstracle.setVelocityX(speed);
                    obstracle2.setVelocityX(speed);
                    if(platform1.x<=-5100){
                        platform1.x = 5100;
                        platform2.x = 15300;
                    }
                }
            }
                 
        }
        else if(platform1.x<=-5100){
            platform1.x = 5100;
            platform2.x = 15300;
        }

        else if(num > 0){
            score += 10;
            scoreText.setText('Score: ' + score);
            if(score>=1000){
                platform1.setVelocityX(speed);
                platform2.setVelocityX(speed);
                obstracle.setVelocityX(speed);
                obstracle2.setVelocityX(speed);
                if(platform1.x<=-5100){
                    platform1.x = 5100;
                    platform2.x = 15300;
                }
            }
        }

        if(score >= 1000+(count*1000)){
            count += 1
            speed = -400-(count*10)
        }
        
        rotate -= 10;
        obstracle.setAngle(rotate)     
        obstracle2.setAngle(rotate)   

        if(count1>=1){
            obstracle.x -= 10;
            obstracle2.x -= 10;
            if(obstracle.x<=-10){
                random = Math.random()*1000;
                obstracle.x = 1300+random;
            }
            else if(obstracle2.x<=-10){
                random2 = Math.random()*1000;
                obstracle2.x = 1300+random2;
            }
        } 

    }
}



export default GameScene;