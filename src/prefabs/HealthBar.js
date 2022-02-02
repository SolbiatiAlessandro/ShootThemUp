export default class HealthBar extends Phaser.Group {
	constructor(game, xpos, ypos){
		super(game);
		this.x = xpos;
		this.y = ypos;

		this.bar = this.create(0, 0, 'health_bar');
		this.holder = this.create(0, 0, 'health_holder');
	}

	setValue(val) {
		if(this.tween){
			this.tween.stop();
		}
		this.tween = this.game.add.tween(this.bar.scale);
		this.tween.to({x: val}, 350);
		this.tween.start();
	}

}
