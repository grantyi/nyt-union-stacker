// Bomb.ts
import Phaser from "phaser";

export class BossBomb extends Phaser.GameObjects.Sprite {
  private toggleTimer: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, "bomb-pip-1");

    this.setScale(0.13);

    // Add the bomb to the scene
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Set physics properties for the bomb
    const bombBody = this.body as Phaser.Physics.Arcade.Body;
    bombBody.setCollideWorldBounds(false); // Let it fall off screen if needed
    bombBody.setVelocity(0, 200); // Set downward velocity

    // Set up the timer to alternate textures every 0.5 seconds
    this.toggleTimer = this.scene.time.addEvent({
      delay: 500,
      callback: this.toggleTexture,
      callbackScope: this,
      loop: true,
    });
  }

  toggleTexture() {
    // Switch between "bombTexture1" and "bombTexture2"
    const currentTexture = this.texture.key;
    const newTexture =
      currentTexture === "bomb-pip-1" ? "bomb-pip-2" : "bomb-pip-1";
    this.setTexture(newTexture);
  }

  // Optional method to initialize the bomb with more settings
  init(x: number, y: number) {
    this.setPosition(x, y);
    this.setActive(true);
    this.setVisible(true);
    const bombBody = this.body as Phaser.Physics.Arcade.Body;
    bombBody.setVelocity(0, 200); // Reset to downward velocity if needed
  }

  // Optional method to reset or destroy bomb
  onOutOfBounds() {
    this.setActive(false);
    this.setVisible(false);
    this.destroy();
  }

  destroy() {
    super.destroy();
    this.toggleTimer.remove();
  }
}
