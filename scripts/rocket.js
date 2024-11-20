


class Rocket {
	constructor() {
		this.pos= createVector(width/2, height/2);
		this.rocket1= new Image("assets/Rocket.png", this.pos.x, this.pos.y);
		this.rocket2= new Image("assets/Rocket2.png", this.pos.x, this.pos.y);
		this.hotbar= new HotBar();
		
		this.sprite= this.rocket1;
		
		this.rocket1.setWidth(500);
		this.rocket2.setWidth(500);
		
		this.vel= createVector();
		
		this.speed= 1/4;
		this.friction= 1/9;
		
		this.leftSpeed= 0;
		
		this.stageStartTime= 0;
		this.stageEndTime= 0;
		
		this.stageTime= 0;
		
		this.projectiles= [];
		
		this.timer= 0;
		
		this.timeBonus= 0;
		
		this.health= 5;
		
		this.w= 500;
		this.h= 109;
		
		this.hits= 0;
		this.takeDown= 0;
		
		this.takeDownScore= 0;
		this.timeScore= 0;
		
		this.score= 0;
		
		this.rankImage= null;
		
		this.spriteSwitch= 0;
		this.spriteMax= 5; // Timer for rocket animation
	}
	
	fireProjectile() {
		if(this.timer <= 0) {
			if(engine.input.one && this.hotbar.stuff.right.length > 0) {
				this.projectiles.push(new Projectile(this.pos.x, this.pos.y + 80, -10, 0, this.hotbar.stuff.right[this.hotbar.stuff.right.length -1]));
				this.hotbar.stuff.right.pop();
			}
			
			if(engine.input.two && this.hotbar.stuff.straight.length > 0) {
				this.projectiles.push(new Projectile(this.pos.x, this.pos.y + 80, -10, 0, this.hotbar.stuff.straight[this.hotbar.stuff.straight.length -1]));
				this.hotbar.stuff.straight.pop();
			}
			
			if(engine.input.three && this.hotbar.stuff.obtuse.length > 0) {
				this.projectiles.push(new Projectile(this.pos.x, this.pos.y + 80, -10, 0, this.hotbar.stuff.obtuse[this.hotbar.stuff.obtuse.length -1]));
				this.hotbar.stuff.obtuse.pop();
			}
			
			if(engine.input.four && this.hotbar.stuff.reflex.length > 0) {
				this.projectiles.push(new Projectile(this.pos.x, this.pos.y + 80, -10, 0, this.hotbar.stuff.reflex[this.hotbar.stuff.reflex.length -1]));
				this.hotbar.stuff.reflex.pop();
			}
			
			this.timer= 3;
		}
	}
	
	cutsceneProjectile() {
		for(let i= 0; i < 16; i ++) {
			this.projectiles[i]= new Projectile(0, 80, -10, 0, "");
		}
	}
	
	updateCutsceneProjectiles() {
		for(let i= 0; i < 16; i ++) {
			push();
				translate(width/2, height/2);
				rotate(PI / 8 * i);
				this.projectiles[i].update();
				this.projectiles[i].draw();
			pop();
		}
	}
	
	warp() {
		if(this.pos.x < -500) {
			this.pos.x= width;
		}
		
		if(this.pos.x > width) {
			this.pos.x= 0;
		}
		
		if(this.pos.y > height - 100 - this.h) {
			this.pos.y= height - this.h - 100;
			this.vel.y= 0;
		}
		
		if(this.pos.y < 0) {
			this.pos.y= 0;
			this.vel.y= 0;
		}
	}
	
	displayHealth() {
		
		engine.healthColour(this.health);
		
		for(let i= 0; i < this.health; i ++) {
			rect(170 + i * 10, 185, 10, 20);
		}
	}
	
	updateProjectiles() {
		let newProjectiles= [];
		
		for(let i in this.projectiles) {
			
			let projectile= this.projectiles[i];
			
			// console.log(i);
			
			projectile.update();
			projectile.draw();
			
			if(projectile.alive) {
				
				for(let asteroid of engine.asteroids) {
					if(engine.pointToCircle(projectile, asteroid) && asteroid.type.includes(projectile.type)) {
						asteroid.alive= false;
						projectile.alive= false;
						this.takeDown ++;
						
						//console.log(projectile);
						//console.log(asteroid);
						
						
						return;
					}
				}
				
				newProjectiles.push(projectile);
			}
		}
		
		this.projectiles= newProjectiles;
	}
	
	onDeath() {
		if(this.health <= 0) {
			engine.currentScene= "game over";
			engine.getNewScoreSplashText();
		}
	}
	
	update() {
		if(this.timer > 0) {
			this.timer --;
		}
		
		if(engine.input.up) {
			this.vel.y -= this.speed;
		} else if(engine.input.down) {
			this.vel.y += this.speed;
		}
		
		if(engine.input.left) {
			this.vel.x -= this.speed;
		} else if(engine.input.right) {
			this.vel.x += this.friction;
		}
		
		this.onDeath();
		
		this.fireProjectile();
		this.updateProjectiles();
		
		this.pos.add(this.vel);
		
		
		this.warp();
		
		if(this.sprite == this.rocket1 && this.spriteSwitch >= this.spriteMax) {
			this.sprite= this.rocket2;
			this.rocket1.hide();
			this.spriteSwitch= 0;
			
		} else if(this.sprite == this.rocket2 && this.spriteSwitch >= this.spriteMax) {
			this.sprite= this.rocket1;
			this.rocket2.hide();
			
			
			this.spriteSwitch= 0;
		}
		
		this.spriteSwitch ++;
	}
	
	draw() {
		
		if(engine.currentScene == "game") {
			this.hotbar.draw();
			this.displayHealth();
		}
		
		this.sprite.show();
		this.sprite.update();
		
		this.sprite.x= this.pos.x;
		this.sprite.y= this.pos.y;
		
		this.rocket1.update();
		this.rocket2.update();
		
		this.rocket1.x= this.pos.x;
		this.rocket1.y= this.pos.y;
	}
}





























// End