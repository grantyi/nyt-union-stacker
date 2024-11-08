import Phaser from "phaser";

import Start from "./scenes/Start";
import Preloader from "./scenes/Preloader";
import Lose from "./scenes/Lose";
import Stack from "./scenes/Stack";
import LevelEnd from "./scenes/LevelEnd";
import Instructions from "./scenes/Instructions";
import Win from "./scenes/Win";
import BossFight from "./scenes/BossFight";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
    },
  },
  scene: [
    Preloader,
    Start,
    Instructions,
    Stack,
    LevelEnd,
    Lose,
    Win,
    BossFight,
  ],
};

export default new Phaser.Game(config);
