import 'phaser';
import { runInNewContext } from 'vm';
let phasers
let platform
let zone
let obstracle
let cursors
let count=0;
let count1 = 0;

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

        obstracle = phasers.add.image(1300,250,'obstracle');
        obstracle.setScale(0.05);
        
        phasers.input.on('gameobjectdown', function (pointer) {
            count1 +=1;    
            
        });

        cursors = phasers.input.keyboard.createCursorKeys();

    }

    update() {
        
        count -= 10;
        obstracle.setAngle(count)

        if(cursors.space.isDown){
            count1 +=1;  
        }         

        if(count1>=1){
            obstracle.x -= 10;
            if(obstracle.x<=-10){
                obstracle.x = 1300;
            }
        } 
    }
}

export default GameScene;