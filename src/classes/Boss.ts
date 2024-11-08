import Phaser from "phaser";
import { BossBomb } from "./BossBomb";
import { Character } from "./Character";

export class Boss extends Phaser.GameObjects.Sprite {
  movingRight: boolean;
  dropTimer: Phaser.Time.TimerEvent;
  pauseTimer: Phaser.Time.TimerEvent;
  isPaused: boolean;
  player: Character;
  speed: number;

  constructor(
    scene: any,
    x: number,
    y: number,
    texture1: string,
    texture2: string,
    dropInterval: number = 2000,
    player: Character
  ) {
    super(scene, x, y, texture1);

    // Set up textures
    this.setTexture(texture1);
    this.setData("texture1", texture1);
    this.setData("texture2", texture2);
    this.setScale(0.5);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    let bossBody = <Phaser.Physics.Arcade.Body>this.body;

    // Boss config
    this.movingRight = true;
    this.isPaused = false;
    this.speed = 100; // Set boss movement speed

    bossBody.setCollideWorldBounds(true);
    bossBody.setImmovable(true);

    bossBody.setAllowGravity(false); // Completely disables gravity for this body
    bossBody.setGravityY(0);

    // Begin moving
    bossBody.setVelocityX(100);

    this.player = player;

    // Set up a timer to switch textures every 0.5 seconds
    this.scene.time.addEvent({
      delay: 500,
      callback: this.toggleTexture,
      callbackScope: this,
      loop: true,
    });

    // Set up a timer to drop bombs at intervals
    this.dropTimer = this.scene.time.addEvent({
      delay: dropInterval,
      callback: this.dropBomb,
      callbackScope: this,
      loop: true,
    });

    // Method calls for creation
    this.init();
    this.create();
  }

  toggleTexture() {
    const currentTexture = this.texture.key;
    const newTexture =
      currentTexture === this.getData("texture1")
        ? this.getData("texture2")
        : this.getData("texture1");
    this.setTexture(newTexture);
  }

  dropBomb() {
    // Create a new bomb at the boss's current position
    // const targetX = this.player.x; // vs boss location being this.x
    const bomb = new BossBomb(this.scene, this.x, this.y, "bombTexture");

    // Optionally add the bomb to a group for collision handling
    if (!this.scene.bombs) {
      this.scene.bombs = this.scene.add.group();
    }
    this.scene.bombs.add(bomb);
  }

  pause() {}

  init() {
    // Set any additional properties here if needed
  }

  create() {
    // Additional setup, such as animations or texture setup
  }

  update() {
    const bossBody = <Phaser.Physics.Arcade.Body>this.body;

    if (this.isPaused) {
      bossBody.setVelocityX(0); // Stop movement when paused
      return;
    }

    // Randomize movement direction at intervals
    const changeDirectionChance = Phaser.Math.RND.between(0, 1000);
    const nearEdge =
      this.x <= this.width || this.x >= this.scene.scale.width - this.width;

    // Only allow random direction change when not near an edge
    if (changeDirectionChance < 5 && !nearEdge) {
      this.movingRight = !this.movingRight;
    }

    // Move left or right
    if (this.movingRight) {
      bossBody.setVelocityX(100); // Speed adjustment as needed

      // If boss is at the right edge, force it to move left
      if (this.x >= this.scene.scale.width - this.width / 2) {
        this.movingRight = false;
      }
    } else {
      bossBody.setVelocityX(-100);

      // If boss is at the left edge, force it to move right
      if (this.x <= this.width / 2) {
        this.movingRight = true;
      }
    }
  }
}
