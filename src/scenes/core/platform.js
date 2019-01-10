import 'phaser';
let phasers
let zone
let platform1
let platform2
let cursors
let num = 0;
let score = 0;
let scoreText;
let speed = 0;
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
        platform1 = phasers.physics.add.sprite(1202, 280,'platform');
        platform2 = phasers.physics.add.sprite(3606, 280,'platform');

        platform1.setImmovable(true)
        platform2.setImmovable(true)
        
        console.log(platform1)
        platform1.body.allowGravity = false;
        platform2.body.allowGravity = false;


        zone = phasers.add.zone(0, 0, 1260, 560).setOrigin(0).setName('zone').setInteractive();
        console.log(zone)

        phasers.input.on('gameobjectdown', function (pointer) {
            console.log('on')
            num += 1;
            platform1.setVelocityX(-400)
            platform2.setVelocityX(-400)
            if(num>0){
                score += 10;
                scoreText.setText('Score: ' + score);
                if(score>=1000){
                    platform1.setVelocityX(speed);
                    platform2.setVelocityX(speed);
                    if(platform1.x<=-1202){
                        platform1.x = 1202;
                        platform2.x = 3606;
                    }
                }
            }
        });

        cursors = phasers.input.keyboard.createCursorKeys();

        scoreText = phasers.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#FFFFFF' });

    }

    update() {
        

        if(cursors.space.isDown){
            num += 1;
            platform1.setVelocityX(-400);
            platform2.setVelocityX(-400);
            if(num>0){
                score += 10;
                scoreText.setText('Score: ' + score);
                if(score>=1000){
                    platform1.setVelocityX(speed);
                    platform2.setVelocityX(speed);
                    if(platform1.x<=-1202){
                        platform1.x = 1202;
                        platform2.x = 3606;
                    }
                }
            }
                 
        }
        else if(platform1.x<=-1202){
            platform1.x = 1202;
            platform2.x = 3606;
        }

        else if(num > 0){
            console.log('run')
            score += 10;
            scoreText.setText('Score: ' + score);
            if(score>=1000){
                platform1.setVelocityX(speed);
                platform2.setVelocityX(speed);
                if(platform1.x<=-1202){
                    platform1.x = 1202;
                    platform2.x = 3606;
                }
            }
        }

        if(score >= 1000+(count*1000)){
            count += 1
            speed = -400-(count*10)
        }
        //speed += 100
        

        console.log(num)
        console.log(speed)
        console.log(count)

    }
}

export default GameScene;