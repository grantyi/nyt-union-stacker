import Phaser from 'phaser';
import Score from '../classes/Score';
import GameStore from '../stores/GameStore';

export default class Lose extends Phaser.Scene {
  score: Score;
  constructor() {
    super('lose');
  }

  create() {
    const isMobile = this.game.device.os.iPhone || this.game.device.os.android;
    this.createBg(isMobile);
    this.createScore(isMobile);
    this.createText(isMobile);
    this.createButton(isMobile);
  }

  createBg(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 175 : 300;
    const scaleX = isMobile ? 1 : 1;
    const scaleY = isMobile ? 2.5 : 1;
    this.add.image(x, y, 'gameover').setScale(scaleX / scaleY);
  }

  createScore(isMobile: boolean) {
    const x = isMobile ? 125 : 250;
    const y = isMobile ? 50 : 100;
    this.score = new Score(this, x, y);
  }

  createText(isMobile: boolean) {
    const x = isMobile ? 125 : 250;
    const y = isMobile ? 100 : 200;
    const fontSize = isMobile ? '12px' : '16px';
    this.add.text(
      x,
      y,
      `Oh no!! It looks like your contract proposal included\ntoo many loopholes and bad proposals.\n\nWe know what we’re worth - help Scabby\ntry again to reach a Tentative Agreement. `,
      {
        fontSize,
        stroke: '#000000',
        strokeThickness: 4,
      }
    );
  }
  createButton(isMobile: boolean) {
    const x = isMobile ? 225 : 350;
    const y = isMobile ? 250 : 350;
    const button = this.add.image(x, y, 'playagain').setTint(0xffea00);
    button.scale = 0.3;

    button.setInteractive({ useHandCursor: true });
    button.on('pointerup', () => {
      this.scene.pause('gameover');
      this.scene.start('stack');
      GameStore.getState().reset();
    });
  }
}
