export default class Enemy extends Phaser.Sprite {
	constructor(game, x, y, bulletLayer, frame) {
		super(game, x, y, 'enemy', frame);
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.velocity = -175;
		this.bounceTick = Math.random() * 2;

		this.bulletLayer = bulletLayer;
		this.willFire = Math.random() < 0.50;
		if (this.willFire){
			this.fireTimer = this.game.time.create(false);
			this.fireTimer.add(3500, this.fireShot, this);
			this.fireTimer.start();
		}
	}

	fireShot(){
		var bullet = this.bulletLayer.create(
			this.x,
			this.y,
			"enemyBullet"
		);
		this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
		bullet.outOfBoundsKill = true;
		bullet.checkWorldBounds = true;
		bullet.body.velocity.x = -250;
	}

	update(){
		this.bounceTick += 0.02;
		this.y += Math.sin(this.bounceTick) * 1;

	}
}
