export default class Player extends Phaser.Sprite {
	constructor(game, x, y, bullets) {
		super(game, x, y, 'player', 0);
		this.speed = 100;
		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.drag.x = 35;
		this.body.drag.y = 35;
		this.body.collideWorldBounds = true;
		this.health = { current: 10, max: 10 };

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.animations.add("fly", [0,0,1,1,2,2,3,4,5,6,7,8,9,10,10]);
		this._firingConstructor(bullets);
		this._playFly();
	}

	damage(amount){
		this.health.current -= amount;
	}

	_firingConstructor(bullets){
		this.bulletGate = 1;
		this.shotInterval = 500;
		this.bullets = bullets; 
		this.fireButton = this.game.input.keyboard.addKey(
			Phaser.Keyboard.SPACEBAR
		);
		this.firePosition = { x: 160, y: 100 };
		this.fireAnimation = this.animations.add("fire", [11,12,13]);
		this.fireAnimation.onComplete.add(this._playFly, this);
	}

	_playFly(){
	this.animations.play("fly", 14, true);
	}

	update(){

		if(this.cursors.left.isDown){
			this.body.velocity.x = -this.speed;
		}

		if(this.cursors.right.isDown){
			this.body.velocity.x = this.speed;
		}

		if(this.cursors.up.isDown){
			this.body.velocity.y = -this.speed;
		}

		if(this.cursors.up.isUp){
			this.body.velocity.y = this.speed;
		}

		if(this.fireButton.isDown){
			this.fire();
		}
	}

	fire(){
		if(this.game.time.now > this.bulletGate){
			var bullet = this.bullets.getFirstDead();
			if(bullet){
				bullet.x = this.x + this.firePosition.x;
				bullet.y = this.y + this.firePosition.y;
				bullet.revive();
			} else {
				bullet = this.bullets.create(
					this.x + this.firePosition.x,
					this.y + this.firePosition.y,
					"bullet"
				);
				this.game.physics.enable(bullet,
					Phaser.Physics.ARCADE);
				bullet.outOfBoundsKill = true;
				bullet.checkWorldBounds = true;
				bullet.body.velocity.x = 250;
			}
			this.bulletGate = this.game.time.now + this.shotInterval;
			this.animations.play("fire");
		}
	}
}
