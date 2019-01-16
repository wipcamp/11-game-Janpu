import 'phaser';
import Player from './player';
import Platform from './platform'

let phasers
let popUp
let retry
let player
let platform


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

        player = new Player({ scene: phasers, });

        platform = new Platform({ scene: phasers, });


        popUp = phasers.physics.add.staticImage(590, 280, 'gameover').setVisible(false);
        retry = phasers.add.image(750, 280, 'retry').setVisible(false).setScale(0.10);
        retry.setInteractive();
    }

    gameOver() {
        popUp.setVisible(true);
        retry.setVisible(true);
        retry.on('pointerup', () => {
            popUp.setVisible(false);
            retry.setVisible(false);
            player.restart();
            platform.restart();
        });
    }

    update() {
    }
}



export default GameScene;