import GameStore from '../stores/GameStore';
export default class Timer {
  timedEvent: Phaser.Time.TimerEvent;
  text: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, x: number, y: number, onEnd: () => void) {
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
      fontSize: '32px',
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
