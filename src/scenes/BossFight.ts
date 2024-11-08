import Phaser, { GameObjects } from "phaser";
import { Character } from "../classes/Character";
import Particles from "../classes/Particles";
import GameStore from "../stores/GameStore";
import Score from "../classes/Score";
// import Timer from "../classes/Timer";
import IckBar from "../classes/IckBar";
import { Boss } from "../classes/Boss";
import { BossBomb } from "../classes/BossBomb";

export default class BossFight extends Phaser.Scene {
  rat: Character | undefined;
  particles: Particles;
  score: Score | undefined;
  // timer: Timer | undefined;
  ickBar: IckBar | undefined;
  boss: Boss | undefined;
  bombs: [BossBomb] | undefined;
  unsubscribe: () => void;

  constructor() {
    super("boss-fight");
  }

  create() {
    this.add.image(400, 300, "test-background").setScale(1 / 3);

    this.add
      .text(100, 100, `BOSS FIGHT!`, {
        stroke: "#000000",
        strokeThickness: 4,
        fontSize: "20px",
      })
      .setOrigin(0);

    this.rat = new Character(this, 400, 550, "dude");
    this.rat.setDepth(2);

    this.boss = new Boss(this, 200, 100, "boss1", "boss2", 2000, this.rat);

    this.particles = new Particles(this, "red");

    this.score = new Score(this, 40, 40);

    // TODO: Do an endLevel call based on something other than time
    // this.timer = new Timer(this, 350, 40, this.endLevel.bind(this));

    this.ickBar = new IckBar(this);

    // Initialize the bombs group and add physics properties
    this.bombs = this.physics.add.group();

    // Collision detection between player and bombs
    this.physics.add.collider(this.rat, this.bombs, (player, bomb) => {
      // Handle player hit by bomb
      bomb.destroy(); // Remove bomb after collision
      GameStore.getState().incrementIck();
      if (GameStore.getState().ickCount > 2) {
        this.scene.pause("boss-fight");
        this.scene.launch("lose");
      }
    });

    this.events.on("destroy", () => this.ickBar?.destroy());
  }

  update() {
    this.rat?.update();
    // this.timer?.update();
    this.boss?.update();
  }

  endLevel() {
    if (GameStore.getState().level === 10) {
      this.scene.launch("win");
      this.scene.stop("boss-fight");
      return;
    }
    GameStore.getState().incrementLevel();
    this.scene.stop("boss-fight");
    this.scene.launch("level-end");
  }
}
