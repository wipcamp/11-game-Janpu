import 'phaser';
let phasers
let platform
let zone
let player
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
        platform = phasers.physics.add.staticImage(50,280,'staticPlatform').setVisible(false);

        player = phasers.physics.add.sprite(50, 200, 'player')
        player.body.allowGravity = true;
        player.setScale(1);

        zone = phasers.add.zone(0, 0, 1260, 560).setOrigin(0).setName('left').setInteractive();
        console.log(zone)

        phasers.input.on('gameobjectdown', function (pointer) {
            console.log('on')
            player.anims.play('run');
            if(player.body.onFloor()){
                player.setVelocityY(-400);
            }
            
        });

        phasers.anims.create({
            key: 'run',
            frames: phasers.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 50,
            repeat: -1,
          });

        phasers.physics.add.collider(player,platform);

        cursors = phasers.input.keyboard.createCursorKeys();
    }

    update() {
        if(player.body.onFloor()){
            if(cursors.space.isDown){
            player.anims.play('run');
            console.log('run');
            player.setVelocityY(-400);
        }
        else if (player.y <= 70) {
            player.setVelocityY(400);
        }

        else if (player.y >= 281) {
            player.setVelocityY(0);
        }
        }
        
    }
}

export default GameScene;