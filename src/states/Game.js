//require other components

import Player from "../prefabs/Player.js"

export default class Game extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  create() {
	  this.add.sprite(0, 0, "game_bg");
	  var bullets = this.add.group()
	  var player = new Player(this, 100, 100, bullets);
	  this.add.existing(player);
  }


  update() {
  }


}
