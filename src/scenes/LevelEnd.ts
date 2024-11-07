import Phaser from 'phaser';
import Score from '../classes/Score';

export default class LevelEnd extends Phaser.Scene {
  score: Score;
  constructor() {
    super('level-end');
  }

  create() {
    const isMobile = this.game.device.os.iPhone || this.game.device.os.android;
    this.createBg(isMobile);
    this.createScore(isMobile);
    this.createWinText(isMobile);
    this.createNextLevelButton(isMobile);
  }

  createBg(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 175 : 300;
    const scaleX = isMobile ? 1 : 1;
    const scaleY = isMobile ? 2.5 : 1;
    this.add.image(x, y, 'score').setScale(scaleX / scaleY);
  }

  createScore(isMobile: boolean) {
    const x = isMobile ? 50 : 100;
    const y = isMobile ? 100 : 200;
    this.score = new Score(this, x, y);
  }

  createWinText(isMobile: boolean) {
    const x = isMobile ? 50 : 100;
    const y = isMobile ? 40 : 100;
    this.add
      .text(x, y, `Congrats! You reached your first \ntentative agreement!`, {
        stroke: '#000000',
        strokeThickness: 4,
        fontSize: '20px',
      })
      .setOrigin(0);
  }

  createNextLevelButton(isMobile: boolean) {
    const x = isMobile ? 50 : 100;
    const y = isMobile ? 225 : 250;
    const nextLevelButton = this.add
      .image(x, y, 'next')
      .setScale(1 / 3)
      .setOrigin(0);
    nextLevelButton.setInteractive({ useHandCursor: true });
    nextLevelButton.on('pointerup', () => {
      this.scene.pause('level-end');
      this.scene.start('stack');
    });
  }
}
