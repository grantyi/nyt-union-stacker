import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    console.log();
    super('preloader');
  }

  preload() {
    this.load.setBaseURL('https://grantyi.github.io/nyt-union-stacker');
    this.load.image('test-background', '/images/bg.png');
    this.load.image('test-paper', '/images/paper.png');
    this.load.image('test-stack', '/images/test-stack.webp');
    this.load.image('red', '/images/red.png');
    this.load.image('start', '/images/start.png');
    this.load.image('instructions', '/images/instructions.png');
    this.load.image('back', '/images/back.png');
    this.load.image('score', '/images/score.png');
    this.load.image('gameover', '/images/gameover.png');
    this.load.image('next', '/images/next.png');
    this.load.image('playagain', '/images/playagain.png');
    this.load.spritesheet('dude', '/images/new-sprite.png', {
      frameWidth: 512,
      frameHeight: 512,
    });
    this.load.on('complete', () => {
      this.scene.start('start');
    });
  }
}
