import Phaser from 'phaser';

export class Character extends Phaser.GameObjects.Sprite {
  cursors: any;
  facingLeft: boolean;
  constructor(
    scene: any,
    x: number,
    y: number,
    texture: string,
    scaleX: number = 1,
    scaleY: number = 2
  ) {
    super(scene, x, y, texture);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 50,
      repeat: -1,
    });

    // Making the homie
    this.setTexture(texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    let guy = <Phaser.Physics.Arcade.Body>this.body;

    // Player Config
    this.facingLeft = true;
    this.setScale(scaleX / scaleY);
    guy.setGravityY(0);
    guy.setCollideWorldBounds(true);
    guy.setCircle(200);

    //Method calls for creation
    this.init();
    this.create();
  }

  init() {
    //Declarations
    this.cursors;
  }

  create() {
    // Create Input Event
    this.cursors = this.scene.input.keyboard;

    // key objects
    this.cursors.keyobj_left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.cursors.keyobj_right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
  }

  update() {
    let guy = <Phaser.Physics.Arcade.Body>this.body;
    // Move Left
    if (this.cursors.keyobj_left.isDown) {
      this.anims.play('walk', true);
      guy.setVelocityX(-200);
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = !this.facingLeft;
      }
      // Move Right
    } else if (this.cursors.keyobj_right.isDown) {
      this.anims.play('walk', true);
      guy.setVelocityX(200);
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = !this.facingLeft;
      }
      // Idle
    } else {
      guy.setVelocityX(0);
      guy.setVelocityY(0);
      this.anims.stop();
    }
  }
}
