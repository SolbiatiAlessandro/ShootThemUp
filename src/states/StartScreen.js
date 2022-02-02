//require other components

export default class StartScreen extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  create() {
  }


  update() {
	  if(this.game.input.keyboard.isDown(
		  Phaser.Keyboard.SPACEBAR)) {
		  this.game.state.start('game');
	  }
  }


}
