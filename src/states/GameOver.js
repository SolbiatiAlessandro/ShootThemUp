
//require other components

export default class GameOver extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  create() {
	  this.add.text(this.game.width / 2, this.game.height / 2, "GAME OVER (press space to play again)", { font: "30px Arial", align: "center", fill: "#fff" });
  }

  update() {
	  if(this.game.input.keyboard.isDown(
		  Phaser.Keyboard.SPACEBAR)) {
		  this.game.state.start('game');
	  }
  }


}
