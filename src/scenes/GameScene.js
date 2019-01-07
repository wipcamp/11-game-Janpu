let platforms, player, trees;
let groundLayer, map, playimage1;
let x, y;
let width, height;
let cursors;

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

        platforms = this.physics.add.staticGroup();
        platforms.create(x+4400, y+50, 'platform');
        platforms.toggleVisible(false);

        playimage1 = this.add.image(x+4700, y+50, 'platform');
        let tween = this.tweens.add({
            targets: playimage1,
            x: -500,
            ease: 'Power1',
            duration: 3000
        });
        
        
        trees = this.physics.add.staticGroup();
        trees.create(x, y, 'tree');


        this.physics.add.collider(player, platforms);
        // this.physics.add.collider(trees, platforms);
    

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (cursors.space.isDown)
        {
            player.setVelocityY(-300);
            
        }

        this.physics.world.wrap(platforms, 16);
    }
}

export default GameScene;
