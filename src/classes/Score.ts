import GameStore from '../stores/GameStore';
export default class Score extends Phaser.GameObjects.Text {
  score: number = 0;
  unsubscribe: () => void;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    const isMobile =
      scene.game.device.os.iPhone || scene.game.device.os.android;
    const fontSize = isMobile ? '24px' : '32px';
    super(scene, x, y, `Score: 0`, {
      fontSize,
      color: '#ffffff',
      strokeThickness: 4,
      stroke: '#000000',
    });
    this.score = GameStore.getState().score;
    this.setText(`Score: ${this.score}`);
    scene.add.existing(this);
    this.unsubscribe = GameStore.subscribe(state => {
      this.setText(`Score: ${state.score}`);
    });
  }
  destroy() {
    this.unsubscribe();
  }
}
