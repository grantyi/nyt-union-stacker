import Phaser, { GameObjects } from "phaser";
import { Character } from "../classes/Character";
import { Proposals, ProposalType } from "../classes/Proposals";
import { Proposal } from "../classes/Proposal";
import Particles from "../classes/Particles";
import GameStore from "../stores/GameStore";
import Score from "../classes/Score";
import Timer from "../classes/Timer";
import IckBar from "../classes/IckBar";
import { Boss } from "../classes/Boss";
export default class Stack extends Phaser.Scene {
  rat: Character | undefined;
  collectedPapers: any[] = [];
  proposals: Proposals;
  particles: Particles;
  score: Score | undefined;
  timer: Timer | undefined;
  ickBar: IckBar | undefined;
  boss: Boss | undefined;
  unsubscribe: () => void;
  constructor() {
    super("stack");
  }

  create() {
    this.add.image(400, 300, "test-background").setScale(1 / 3);

    this.rat = new Character(this, 400, 550, "dude");
    this.rat.setDepth(2);

    this.boss = new Boss(this, 200, 100, "boss1", "boss2", 2000);

    this.particles = new Particles(this, "red");
    this.collectedPapers = [];
    this.createProposals();
    this.score = new Score(this, 40, 40);
    this.timer = new Timer(this, 350, 40, this.endLevel.bind(this));
    this.ickBar = new IckBar(this);
    this.events.on("destroy", () => this.ickBar?.destroy());
  }

  createProposals() {
    if (!this.rat) return;
    this.proposals = this.add.existing(
      new Proposals(this.physics.world, this, { name: "proposals" })
    );
    this.proposals.setDepth(-1);

    this.proposals.createMultiple({
      key: "test-paper",
      setScale: {
        x: 0.1,
        y: 0.1,
      },

      quantity: 20 + 5 * GameStore.getState().level,
    });
    this.proposals.start();

    this.physics.add.overlap(
      this.rat,
      this.proposals,
      (rat, paper) => {
        const proposal = paper as Proposal;
        this.collectedPapers.push(proposal);
        proposal.stack();
        if (proposal.proposalType == ProposalType.Bad) {
          this.particles.spawnAt(rat.body.center.x, rat.body.center.y);
          this.rat?.damage();

          GameStore.getState().incrementIck();
          if (GameStore.getState().ickCount > 2) {
            this.scene.pause("stack");
            this.scene.launch("lose");
          }
        } else {
          GameStore.getState().incrementScore();
        }
      },
      undefined,
      this
    );
  }

  update() {
    this.rat?.update();
    this.timer?.update();
    this.boss?.update();
    this.collectedPapers.forEach((element, index) => {
      element.setPosition(
        this.rat?.getBounds().centerX + (this.rat?.facingLeft ? -30 : 30),
        420 - 5 * index
      );
    });
  }

  endLevel() {
    if (GameStore.getState().level === 10) {
      this.scene.launch("win");
      this.scene.stop("stack");
      return;
    }
    GameStore.getState().incrementLevel();
    this.scene.pause("stack");
    this.scene.launch("level-end");
  }
}
