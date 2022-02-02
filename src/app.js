var game;

import Boot from "./states/Boot.js";
import Preload from "./states/Preload.js";
import Game from "./states/Game.js";
import StartScreen from "./states/StartScreen.js";


window.onload = function () {
  game = new Phaser.Game(window.innerWidth - 20, window.innerHeight - 20, Phaser.AUTO, 'game');
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('game', Game);
  game.state.add('startScreen', StartScreen);
  game.state.start('boot');
};
