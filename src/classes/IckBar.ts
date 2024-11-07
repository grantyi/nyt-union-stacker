import GameStore from '../stores/GameStore';

export default class IckBar {
  ickCount: number = 0;
  ickBar: Phaser.GameObjects.Rectangle;
  unsubscribe: () => void;

  constructor(scene: Phaser.Scene) {
    const isMobile =
      scene.game.device.os.iPhone || scene.game.device.os.android;
    this.ickCount = GameStore.getState().ickCount;

    this.createBackBar(scene, isMobile);
    this.createShading1(scene, isMobile);
    this.createShading2(scene, isMobile);
    this.createShading3(scene, isMobile);
    this.createIckBar(scene, isMobile);
  }

  createBackBar(scene: Phaser.Scene, isMobile: boolean) {
    const x = isMobile ? 275 : 600;
    scene.add.rectangle(x, 50, 162, 20, 0x000000).setOrigin(0);
  }

  createShading1(scene: Phaser.Scene, isMobile: boolean) {
    const x = isMobile ? 278 : 603;
    scene.add.rectangle(x, 53, 50, 14, 0x616161).setOrigin(0);
  }

  createShading2(scene: Phaser.Scene, isMobile: boolean) {
    const x = isMobile ? 331 : 656;
    scene.add.rectangle(x, 53, 50, 14, 0x616161).setOrigin(0);
  }

  createShading3(scene: Phaser.Scene, isMobile: boolean) {
    const x = isMobile ? 384 : 709;
    scene.add.rectangle(x, 53, 50, 14, 0x616161).setOrigin(0);
  }
  createIckBar(scene: Phaser.Scene, isMobile: boolean) {
    const x = isMobile ? 278 : 603;
    this.ickBar = scene.add.rectangle(x, 53, 0, 14, 0xffea00).setOrigin(0);
    this.ickBar.width = (50 + 2 * this.ickCount) * this.ickCount;
    this.unsubscribe = GameStore.subscribe(state => {
      this.ickCount = state.ickCount;
      this.ickBar.width = (50 + 2 * this.ickCount) * this.ickCount;
    });
  }

  destroy() {
    this.unsubscribe();
  }
}
