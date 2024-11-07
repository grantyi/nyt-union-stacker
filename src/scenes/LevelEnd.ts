import Phaser from "phaser";
import Score from "../classes/Score";

export default class LevelEnd extends Phaser.Scene {
  score: Score;
  constructor() {
    super("level-end");
  }

  create() {
    this.add.image(400, 300, "score");
    this.score = new Score(this, 100, 200);
    const winText = this.add.text(
      100,
      100,
      `Congrats! You reached your first \ntentative agreement!`,
      {
        stroke: '#000000',
        strokeThickness: 4,
        fontSize: "20px"}
    ).setOrigin(0);
    const nextLevelButton = this.add.image(100, 250, "next").setScale(1 / 3).setOrigin(0);
    nextLevelButton.setInteractive({ useHandCursor: true });
    nextLevelButton.on("pointerup", () => {
      this.scene.pause("level-end");
      this.scene.start("stack");
    });
  }
}
