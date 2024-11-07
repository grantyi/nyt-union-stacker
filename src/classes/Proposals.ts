import Phaser from 'phaser';
import { Proposal } from './Proposal';
import GameStore from '../stores/GameStore';

export enum ProposalType {
  Good = 'Good',
  Bad = 'Bad',
}

export class Proposals extends Phaser.Physics.Arcade.Group {
  itemConfig: any[];
  timedEvent: Phaser.Time.TimerEvent;

  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    config: any
  ) {
    super(world, scene, {
      ...config,
      classType: Proposal,
      createCallback: Proposals.prototype.onCreate,
    });
  }

  start() {
    const level = GameStore.getState().level;
    this.timedEvent = this.scene.time.addEvent({
      delay: Phaser.Math.RND.between(
        Math.max(0, 750 - 50 * level),
        Math.max(100, 2000 - 50 * level)
      ),
      loop: true,
      callback: () => {
        const isMobile =
          this.scene.game.device.os.iPhone || this.scene.game.device.os.android;
        const xMax = isMobile ? 400 : 750;
        const x = Phaser.Math.RND.between(0, xMax);
        const y = Phaser.Math.RND.between(0, 0);
        const velocity = Phaser.Math.RND.between(0, 100 + 10 * level);
        this.fire(x, y, 0, velocity);
      },
    });
  }

  fire(x: number, y: number, vx: number, vy: number) {
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, vx, vy);
    }
  }

  onCreate(item: Proposal) {
    const num = Phaser.Math.RND.between(0, 100);
    const type = num >= 50 ? ProposalType.Good : ProposalType.Bad;
    item.onCreate(type);
  }

  poolInfo() {
    return `${this.name} total=${this.getLength()} active=${this.countActive(
      true
    )} inactive=${this.countActive(false)}`;
  }
}
