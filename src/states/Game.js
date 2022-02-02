//require other components

import Player from "../prefabs/Player.js"
import Enemy from "../prefabs/Enemy.js"
import NumberBox from "../prefabs/NumberBox.js"

export default class Game extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  create() {
	  this.add.sprite(0, 0, "game_bg");
	  var bullets = this.add.group();
	  var enemyBullets = this.add.group();
	  var player = new Player(this, 100, 100, bullets);
	  this.add.existing(player);
	  var enemy = new Enemy(this, 200, 100, enemyBullets, 0);
	  this.add.existing(enemy);
	  var numberBox = new NumberBox(this, 'circle', 0);
	  this.add.existing(numberBox);


  }


  update() {
  }


}
