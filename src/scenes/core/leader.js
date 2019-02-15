import 'phaser'
import Responsive from './responsive'

let phasers
let scale
let frontbg
let first
let second
let third
let bg
let close
let logo
let st
let nd
let rd


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
        let respon =new Responsive()
        respon.check(window.screen.height, window.screen.width)
        scale = respon.getScale();

        bg = phasers.add.image(respon.getPositionX(),respon.getPositionY(),'leaderbg').setVisible(false)

        frontbg = phasers.add.image(respon.getPositionX(),respon.getPositionY()+50,'leader').setScale(0.15*scale).setVisible(false)

        first = phasers.add.image(frontbg.x+200,frontbg.y-72*scale,'first').setScale(0.15*scale).setVisible(false)

        second = phasers.add.image(frontbg.x+200,frontbg.y,'second').setScale(0.15*scale).setVisible(false)

        third = phasers.add.image(frontbg.x+200,frontbg.y+72*scale,'third').setScale(0.15*scale).setVisible(false)

        close = phasers.add.image(respon.getPositionX()*2-60*scale,40,'close').setScale(scale*0.15).setVisible(false)
        close.setInteractive();
  
        close.on('pointerup', () => { 
            bg.setVisible(false)
            frontbg.setVisible(false)
            first.setVisible(false)
            second.setVisible(false)
            third.setVisible(false)
            close.setVisible(false)
            logo.setVisible(false)
            st.setVisible(false)
            nd.setVisible(false)
            rd.setVisible(false)
        });

        logo = phasers.add.image(frontbg.x,frontbg.y-172*scale,'leaderlogo').setScale(0.15*scale).setVisible(false)

        st = phasers.add.text(frontbg.x-200,frontbg.y-82*scale, 'topScore: 0', { fontSize: 30*scale, fill: '#372f2d' });
        st.setScale(scale).setVisible(false)

        nd = phasers.add.text(frontbg.x-200,frontbg.y-10*scale, 'topScore: 0', { fontSize: 30*scale, fill: '#372f2d' });
        nd.setScale(scale).setVisible(false)

        rd = phasers.add.text(frontbg.x-200,frontbg.y+57*scale, 'topScore: 0', { fontSize: 30*scale, fill: '#372f2d' });
        rd.setScale(scale).setVisible(false)

    }

    click(){
        bg.setVisible(true)
        frontbg.setVisible(true)
        first.setVisible(true)
        second.setVisible(true)
        third.setVisible(true)
        close.setVisible(true)
        logo.setVisible(true)
        st.setVisible(true)
        nd.setVisible(true)
        rd.setVisible(true)
    }

    update() {

        

    }
}



export default GameScene;