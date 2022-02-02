//require other components

import Player from "../prefabs/Player.js"
import Enemy from "../prefabs/Enemy.js"
import NumberBox from "../prefabs/NumberBox.js"
import HealthBar from "../prefabs/HealthBar.js"

export default class Game extends Phaser.State {

  constructor() {
    //object level properties
    super();
  }

  _setupUI(){
	  this.UILayer = this.add.group();
	  this.scoreField = new NumberBox(this, 'circle', 0);
	  this.UILayer.add(this.scoreField);

	  this.healthBar = new HealthBar(this, 120, 40);
	  this.UILayer.add(this.healthBar);
  }

  create() {
	  this.spawnChance = 0.005;
	  this.score = 0;

	  this.game.physics.startSystem(Phaser.Physics.ARCADE);

	  this.bg = this.add.tileSprite(0, 0, 1024, 768, 'bg')


	  this.bullets = this.add.group();
	  this.enemyBullets = this.add.group();
	  this.enemies = this.add.group();

	  for(var i = 0; i < 5; i++){
		  var enemy = new Enemy(
			  this.game, 
			  (this.game.width / 2) + (Math.random() * (this.game.width / 2)), 
			  Math.random() * this.game.height,
			  this.enemyBullets
		  );
		  this.enemies.add(enemy)
	  }

	  this.explosions = this.game.add.emitter(0, 0, 200);
	  this.explosions.makeParticles("hexagon");
	  this.explosions.setAlpha(1, .2, 2000);

	  this._setupUI();

	  this.waveTimer = this.game.time.create(false);
	  this.waveTimer.loop(20000, this.incrementWave, this);
	  this.waveTimer.start();

	  var player = new Player(this, 100, 100, this.bullets);
	  this.add.existing(player);
	  this.add.existing(this.enemies);
  }


  update() {
	  this.bg.tilePosition.x -= .5;

	  if(Math.random() < this.spawnChance){
		  var enemy = new Enemy(
			  this.game, 
			  this.game.width,
			  Math.random() * this.game.height,
			  this.enemyBullets
		  );
		  this.enemies.add(enemy)
	  }

	  this.physics.arcade.overlap(
		  this.enemies,
		  this.bullets,
		  this.damageEnemy,
		  null,
		  this);

	  this.physics.arcade.overlap(
		  this.player,
		  this.enemies,
		  this.damagePlayer,
		  null,
		  this);

	  this.physics.arcade.overlap(
		  this.player,
		  this.enemyBullets,
		  this.damagePlayer,
		  null,
		  this);

  }

  incrementWave() {
	  this.spawnChance *= 1.2;
  }

  damageEnemy(enemy, bullet){
	  this.explosions.x = enemy.x
	  this.explosions.y = enemy.y
	  this.explosions.explode(2000, 20);

	  enemy.kill();
	  bullet.kill();

	  this.score++;
	  this.scoreField.setValue(this.score);
  }

  damagePlayer(player, enemy){
	  console.log("damagePlayer");
	  this.player.damage(1);
	  this.healthBar.setValue(
		  this.player.health.current / this.player.health.max
	  );
	  enemy.kill();
	  if(this.player.health.current <= 0){
		  this.game.state.start("gameOver");
	  }

  }


}
