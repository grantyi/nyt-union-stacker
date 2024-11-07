import GameStore from '../stores/GameStore';
export default class Timer {
  timedEvent: Phaser.Time.TimerEvent;
  text: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x: number, y: number, onEnd: () => void) {
    const isMobile =
      scene.game.device.os.iPhone || scene.game.device.os.android;
    const fontSize = isMobile ? '24px' : '32px';
    const level = GameStore.getState().level;
    this.timedEvent = scene.time.delayedCall(
      5000 + 5000 * level,
      () => {
        onEnd();
      },
      [],
      this
    );
    this.text = scene.add.text(x, y, '00:30', {
      fontSize,
      color: '#ffffff',
      strokeThickness: 4,
      stroke: '#000000',
    });
  }

  update() {
    const seconds = this.timedEvent.getOverallRemainingSeconds().toPrecision(2);
    this.text.setText(`00:${seconds}`);
  }
}
