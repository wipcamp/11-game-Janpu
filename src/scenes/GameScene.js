let platforms, player, trees;
let groundLayer, map, playimage1;
let x, y;
let width, height;
let cursors;

import Player from './core/player'
let player

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('player', '../../images/player.png');
        this.load.image('platform', '../../images/platform.png');
        this.load.image('tree', '../../images/tree.png');
        
        this.load.image('player', '../src/image/ninja.jpg');
    }

    create() {
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;
        x = width * 0.5;
        y = height * 0.5;

        player = this.physics.add.image(x-500, y, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setMaxVelocity(300, 400).setFriction(800, 0);

        
        playimage1 = this.add.image(x+4400, y+50, 'platform');
        let tween = this.tweens.add({
            targets: playimage1,
            x: 20000,
            ease: 'Power1',
            duration: 3000
        });
    
        
        
        trees = this.physics.add.staticGroup();
        trees.create(x, y, 'tree');


        // this.physics.add.collider(player, platforms);
        // this.physics.add.collider(trees, platforms);
    

        cursors = this.input.keyboard.createCursorKeys();
        player = new Player({ scene: this, })
        player.create()
    }

    update() {
        if (cursors.space.isDown)
        {
            player.setVelocityY(-300);
            
        }

        
        player.update()
    }
}

export default GameScene;
