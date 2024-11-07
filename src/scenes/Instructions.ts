import Phaser, { GameObjects } from 'phaser';

export default class Start extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  create() {
    const isMobile = this.game.device.os.iPhone || this.game.device.os.android;
    this.createDescriptionText(isMobile);
    this.createTitle(isMobile);
    this.createHowToText(isMobile);
    this.createButton(isMobile);
  }

  createDescriptionText(isMobile: boolean) {
    const x = isMobile ? 205 : 400;
    const y = isMobile ? 50 : 120;
    const fontSize = isMobile ? '12px' : '16px';
    this.add
      .text(
        x,
        y,
        "You’re Scabby the rat - and you're not a scab! \nYou want to help the NYT Tech Guild get to a \nfair contract - including Just Cause (no exceptions!), \nfair wages, and a respectful Return to Office proposal. ",
        {
          fontSize,
        }
      )
      .setOrigin(1 / 2);
  }

  createTitle(isMobile: boolean) {
    const x = isMobile ? 50 : 400;
    const y = isMobile ? 100 : 210;
    const fontSize = isMobile ? '14px' : '20px';
    this.add
      .text(x, y, 'How to Play', { fontSize, align: 'center' })
      .setOrigin(1 / 2);
  }

  createHowToText(isMobile: boolean) {
    const x = isMobile ? 0 : 130;
    const y = isMobile ? 120 : 230;
    const fontSize = isMobile ? '12px' : '16px';

    this.add
      .text(
        x,
        y,
        '-Use the left and right arrow keys to help Scabby catch \nthe good proposals (green) \n\n- Avoid the bad proposals from mangement (red). They’re \ndisrespectful, incomplete, or include loopholes. \n\n- Get as many good contract proposals you can in 10 \nseconds to reach a tentative agreement and move \nto the next level. \n\n- If you catch 3 bad proposals, your contract is too \nweak and the game is over.',
        {
          fontSize,
        }
      )
      .setOrigin(0);
  }

  createButton(isMobile: boolean) {
    const x = isMobile ? 55 : 400;
    const y = isMobile ? 325 : 500;
    const backButton = this.add
      .image(x, y, 'back')
      .setScale(1 / 3)
      .setOrigin(1 / 2);
    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerup', () => {
      this.scene.stop('instructions');
      this.scene.launch('start');
    });
  }
}
