import 'phaser';
let phasers
let zone
let player
let click
class GameScene extends Phaser.Scene {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.scene.add.existing(this);
        phasers = config.scene
    }

    preload(){
        
    }


    create() {
        player = phasers.physics.add.sprite(50, 120, 'player')
        player.setScale(0.05);

        zone = phasers.add.zone(0, 0, 400, 240).setOrigin(0).setName('left').setInteractive();
        console.log(zone)

        phasers.input.on('gameobjectdown', function (pointer) {
                console.log('on')
                player.setVelocityY(-400);
                
        });
    }


    update() {
        if(player.y <= 70){
            player.setVelocityY(400);    
        }
        
        else if(player.y >=121){
                player.setVelocityY(0);
            }
    }
}

export default GameScene;