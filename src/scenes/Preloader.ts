import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    console.log("hello!");
    super("preloader");
  }

  preload() {
    this.load.image("test-background", "/images/bg.png");
    this.load.image("test-paper", "/images/paper.png");
    this.load.image("test-stack", "/images/test-stack.webp");
    this.load.image("red", "/images/red.png");
    this.load.image("start", "/images/start.png");
    this.load.image("instructions", "/images/instructions.png");
    this.load.image("back", "/images/back.png");
    this.load.image("score", "/images/score.png");
    this.load.image("gameover", "/images/gameover.png");
    this.load.image("next", "/images/next.png");
    this.load.image("playagain", "/images/playagain.png");
    this.load.image("boss1", "/images/cto.png");
    this.load.image("boss2", "/images/cto2.png");
    this.load.image("bomb-pip-1", "/images/bomb_pip-1.png");
    this.load.image("bomb-pip-2", "/images/bomb_pip-2.png");
    this.load.spritesheet(
      "dude",
      "http://localhost:8000/images/new-sprite.png",
      {
        frameWidth: 512,
        frameHeight: 512,
      }
    );
    this.load.on("complete", () => {
      this.scene.start("start");
    });
  }
}
