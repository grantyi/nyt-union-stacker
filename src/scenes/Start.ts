import Phaser, { GameObjects } from "phaser";

export default class Start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  create() {
    const titleText = this.add
      .text(400, 160, "Scabby’s Fair \nContract Builder", {
        fontSize: "36px",
        align: "center",
      })
      .setOrigin(1 / 2);
    const subtitleText = this.add
      .text(
        400,
        260,
        "Help Scabby and the NYT \nTech Guild get a fair contract!",
        { fontSize: "20px", align: "center" }
      )
      .setOrigin(1 / 2);

    // Start game button
    const startButton = this.add
      .image(400, 380, "start")
      .setScale(1 / 3)
      .setOrigin(1 / 2);
    startButton.setInteractive({ useHandCursor: true });
    startButton.on("pointerup", () => {
      this.scene.stop("start");
      // this.scene.launch("stack");
      this.scene.launch("boss-fight");
    });

    // Instructions button
    const instructionsButton = this.add
      .image(400, 440, "instructions")
      .setScale(1 / 3)
      .setOrigin(1 / 2);
    instructionsButton.setInteractive({ useHandCursor: true });
    instructionsButton.on("pointerup", () => {
      this.scene.stop("start");
      this.scene.launch("instructions");
    });
  }
}
