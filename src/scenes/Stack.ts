import Phaser, { GameObjects } from 'phaser';
import { Character } from '../classes/Character';
import { Proposals, ProposalType } from '../classes/Proposals';
import { Proposal } from '../classes/Proposal';
import Particles from '../classes/Particles';
import GameStore from '../stores/GameStore';
import Score from '../classes/Score';
import Timer from '../classes/Timer';
import IckBar from '../classes/IckBar';
export default class Stack extends Phaser.Scene {
  rat: Character | undefined;
  collectedPapers: any[] = [];
  proposals: Proposals;
  particles: Particles;
  score: Score | undefined;
  timer: Timer | undefined;
  ickBar: IckBar | undefined;
  unsubscribe: () => void;
  constructor() {
    super('stack');
  }

  create() {
    const isMobile = this.game.device.os.iPhone || this.game.device.os.android;
    this.particles = new Particles(this, 'red');
    this.collectedPapers = [];

    this.createBackground(isMobile);
    this.createRat(isMobile);
    this.createProposals(isMobile);
    this.createScore(isMobile);
    this.createTimer(isMobile);
    this.ickBar = new IckBar(this);
    this.events.on('destroy', () => this.ickBar?.destroy());
  }

  createBackground(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 175 : 300;
    const scale = isMobile ? 1 / 4 : 1 / 3;
    this.add.image(x, y, 'test-background').setScale(scale);
  }

  createRat(isMobile: boolean) {
    const x = isMobile ? 225 : 400;
    const y = isMobile ? 300 : 550;
    const scaleX = 1;
    const scaleY = isMobile ? 3 : 2;
    this.rat = new Character(this, x, y, 'dude', scaleX, scaleY);
    this.rat.setDepth(2);
  }

  createProposals(isMobile: boolean) {
    if (!this.rat) return;
    const scale = isMobile ? 0.08 : 0.1;
    this.proposals = this.add.existing(
      new Proposals(this.physics.world, this, { name: 'proposals' })
    );
    this.proposals.setDepth(-1);

    this.proposals.createMultiple({
      key: 'test-paper',
      setScale: {
        x: scale,
        y: scale,
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
            this.scene.pause('stack');
            this.scene.launch('lose');
          }
        } else {
          GameStore.getState().incrementScore();
        }
      },
      undefined,
      this
    );
  }

  createScore(isMobile: boolean) {
    const x = isMobile ? 20 : 40;
    const y = isMobile ? 20 : 40;
    this.score = new Score(this, x, y);
  }

  createTimer(isMobile: boolean) {
    const x = isMobile ? 350 : 350;
    const y = isMobile ? 20 : 40;
    this.timer = new Timer(this, x, y, this.endLevel.bind(this));
  }

  update() {
    this.rat?.update();
    this.timer?.update();
    this.collectedPapers.forEach((element, index) => {
      const isMobile =
        this.game.device.os.iPhone || this.game.device.os.android;
      const y = isMobile ? 225 : 420;
      element.setPosition(
        this.rat?.getBounds().centerX + (this.rat?.facingLeft ? -30 : 30),
        y - 5 * index
      );
    });
  }

  endLevel() {
    if (GameStore.getState().level === 10) {
      this.scene.launch('win');
      this.scene.stop('stack');
      return;
    }
    GameStore.getState().incrementLevel();
    this.scene.pause('stack');
    this.scene.launch('level-end');
  }
}
