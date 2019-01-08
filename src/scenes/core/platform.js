import 'phaser';
let phasers
let zone
let platform1
let platform2
let cursors
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
            platform1.setVelocityX(-400)
            platform2.setVelocityX(-400)

        });

        cursors = phasers.input.keyboard.createCursorKeys();
    }

    getPlatforms(){
        return {
            platform1:platform1,platform2:platform2
        }
    }


    update() {
        

        if(cursors.space.isDown){
            platform1.setVelocityX(-400);
            platform2.setVelocityX(-400);
        }
        else if(platform1.x<=-1202){
            platform1.x = 1202;
            platform2.x = 3606;
        }

    }
}

export default GameScene;