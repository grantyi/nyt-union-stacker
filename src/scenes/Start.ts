import Phaser, { GameObjects } from 'phaser';

export default class Start extends Phaser.Scene {
  constructor() {
    super('start');
  }

  create() {
    const isMobile = this.game.device.os.iPhone || this.game.device.os.android;
    this.createTitleText(isMobile);
    this.createSubtitleText(isMobile);
    this.createStartButton(isMobile);
    this.createInstructionsButton(isMobile);
  }
  createTitleText(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 50 : 160;
    const fontSize = isMobile ? '28px' : '36px';
    this.add
      .text(x, y, 'Scabby’s Fair \nContract Builder', {
        fontSize: fontSize,
        align: 'center',
      })
      .setOrigin(1 / 2);
  }

  createSubtitleText(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 110 : 260;
    const fontSize = isMobile ? '16px' : '20px';

    this.add
      .text(x, y, 'Help Scabby and the NYT \nTech Guild get a fair contract!', {
        fontSize,
        align: 'center',
      })
      .setOrigin(1 / 2);
  }

  createStartButton(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 200 : 380;

    const startButton = this.add
      .image(x, y, 'start')
      .setScale(1 / 3)
      .setOrigin(1 / 2);
    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerup', () => {
      this.scene.stop('start');
      this.scene.launch('stack');
    });
  }

  createInstructionsButton(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 250 : 440;

    const instructionsButton = this.add
      .image(x, y, 'instructions')
      .setScale(1 / 3)
      .setOrigin(1 / 2);
    instructionsButton.setInteractive({ useHandCursor: true });
    instructionsButton.on('pointerup', () => {
      this.scene.stop('start');
      this.scene.launch('instructions');
    });
  }
}
