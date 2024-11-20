




//Scores:

/*
 115
 185
 90
 120
 195
 
 335
 325
 285
 370
 
 400
 460
 415
 
 535
 
 


*/

class Engine {
	constructor() {
		this.stars= [];
		this.currentScene= "title";
		
		this.rocket= new Rocket();
		
		this.titleRocket= new Rocket();
		this.titleRocket.speed= 2;
		
		this.showRocket= true;
		
		this.asteroids= [];
		this.resources= [];
		
		this.changeStarfieldBackgroundValue= true;
		
		this.scoreCard= {
			x: width/2,
			y: height/2,
		}
		
		this.input= {
			up: false,
			down: false,
			left: false,
			right: false,
			enter: false,
			space: false,
		};
		
		this.scoreSplashText= "";
		
		this.rankA= [
			"What?! How?! Congrats man!",
			"Seriously?! How is that even possible?!",
			"I have nothing to say. You did a good job.",
			"",
		];
		
		this.rankB= [
			"Wow, someone's been practicing.",
			"Woah, slow down there!",
			"How long have you been playing this game? Rank B?! That's amazing!",
			"",
		];
		
		this.rankC= [
			"Alright, but can you make it to rank B?",
			"Okay, okay, not too bad. But you can do better.",
			"",
		];
		
		this.rankD= [
			"Better than rank E, but I bet you can't get to C!",
			"Oooh, someone's been practicing.",
			"",
		];
		
		this.rankE= [
			"Yikes. Only a rank E? Maybe you should try reading the help desk.",
			"Ooooooh, that defeat must've hurt.",
			"",
		];
		
		
		
		this.asteroidQuantity= 5;
		
		for(let i= 0; i < 200; i ++) {
			this.stars.push(new Star());
		}
		
		for(let i= 0; i < this.asteroidQuantity; i ++) {
			this.asteroids.push(new Asteroid());
		}
		
		this.rocketLaunching= new Image("assets/RocketLaunchingText.png", width/4 - 100, height /4);
		this.rocketLaunching.setWidth(200);
		this.rocketLaunching.update();
		
		this.helpImage= new Image("assets/help.png", width/4 * 3 - 100, height /4);
		this.helpImage.setWidth(200);
		this.helpImage.update();
		
		this.creditsImage= new Image("assets/credits.png", width/4 * 3 - 100, height / 4 * 3);
		this.creditsImage.setWidth(200);
		this.creditsImage.update();
	}
	
	healthColour(health) {
		switch(health) {
			case 5:
				fill(0, 255, 0);
				break;
			  
			case 4:
				fill(141, 255, 0);
				break;
			
			case 3:
				fill(255, 255, 0);
				break;
			  
			case 2:
				fill(255, 141, 0);
				break;
			
			case 1:
				fill(255, 0, 0);
				break;
		}
	}
	
	pointContact(point, obj) {
		let x= point.pos.x >= obj.pos.x && point.pos.x <= obj.pos.x + obj.w;
		let y= point.pos.y >= obj.pos.y && point.pos.y <= obj.pos.y + obj.h;
		
		return x && y;
	}
	
	pointToCircle(p1, p2) {
		return dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) <= p2.error;
	}
	
	isOffScreen(obj) {
		return obj.pos.x < 0 || obj.pos.x > width || obj.pos.y < 0 || obj.pos.y > height;
	}
	
	getNewScoreSplashText() {
		this.rankEText= this.rankE[floor(random(this.rankE.length -1))];
		this.rankDText= this.rankD[floor(random(this.rankD.length -1))];
		this.rankCText= this.rankC[floor(random(this.rankC.length -1))];
		this.rankBText= this.rankB[floor(random(this.rankB.length -1))];
		this.rankAText= this.rankA[floor(random(this.rankA.length -1))];
	}
	
	readInput(press) {
		
		if(this.currentScene == "title" && this.showRocket) {
			return;
		}
		
		if(engine.pauseGame) {
			return;
		}
		switch(keyCode) {
			case 38:
				this.input.up= press;
				break;
				
			case 40:
				this.input.down= press;
				break;
				
			case 37:
				this.input.left= press;
				break;
				
			case 39:
				this.input.right= press;
				break;
				
			case 13:
				this.input.enter= press;
				break;
				
			case 32:
				this.input.space= press;
				break;
				
			case 49:
				this.input.one= press;
				break;
				
			case 50:
				this.input.two= press;
				break;
				
			case 51:
				this.input.three= press;
				break;
				
			case 52:
				this.input.four= press;
				break;
		}
	}
	
	starfieldBackground(warpSpeed) {
		background(0);
		
		for(let i= 0; i < this.stars.length; i ++) {
			this.stars[i].update(warpSpeed);
			this.stars[i].draw();
		}
	}
	
	
	updateAsteroids() {
		let newAsteroids= [];
		
		for(let i in this.asteroids) {
			let asteroid= this.asteroids[i];
			
			asteroid.update();
			asteroid.draw();
			
			if(asteroid.alive) {
				newAsteroids.push(asteroid);
			}
		}
		
		this.asteroids= newAsteroids;
		
		if(this.asteroids.length < this.asteroidQuantity) {
			
			if(random(1) < 0.25) {
				this.resources.push(new Resource());
			}
			
			this.asteroids.push(new Asteroid());
		}
	}
	
	updateResources() {
		let newResources= [];
		
		for(let i in this.resources) {
			let resource= this.resources[i];
			
			resource.update();
			resource.draw();
			
			if(resource.alive) {
				resource.update();
				resource.draw();
				
				newResources.push(resource);
			}
		}
		
		this.resources= newResources;
	}
	
	restartGame() {
		this.rocket= new Rocket();
		this.rocket.timer= 3;
		this.currentScene= "game";
		
		this.gameEnd= false;
	}

	
	game() {
		this.starfieldBackground();
		
		this.updateAsteroids();
		this.updateResources();
		
		this.rocket.update();
		this.rocket.draw();
		
		if(infinityHealth) {
			this.rocket.health= 5;
		}
	}
	
	gameOver() {
		background(0);
		
		if(!this.gameEnd) {
			this.rocket.cutsceneProjectile();
			this.rocket.stageTime= millis() - this.rocket.stageStartTime;
			this.rocket.sprite.hide();
			
			this.gameEnd= true;
			this.rocket.timeBonus= floor((this.rocket.stageTime / 1000) / 30) * 15;
			
			console.log(this.rocket.timeBonus);
			console.log(this.rocket.takeDown);
			
			this.waitScore= millis();
		}
		
		this.rocket.updateCutsceneProjectiles();
		
		fill(255, 255, 0);
		stroke(0);
		text(this.scoreSplashText, this.scoreCard.x, this.scoreCard.y - 50);
		
		fill(255, 255, 255);
		text("Asteroids Destroyed: " + this.rocket.takeDown + " x 10", this.scoreCard.x, this.scoreCard.y);
		text("Time Bonus: " + this.rocket.timeBonus, this.scoreCard.x, this.scoreCard.y + 30);
		
		text("Total Score: " + engine.rocket.score, this.scoreCard.x, this.scoreCard.y + 60);
		
		text("Return to title screen by hitting enter.", width * 3/4, height * 3/4);
		
		if(!this.rocket.rankImage) {
			this.rocket.rankImage= new Image("assets/Rank_C.png", this.scoreCard.x - 100, this.scoreCard.y + 100);
			this.rocket.rankImage.update();
			
			this.rocket.rankImage.setWidth(200);
			
			
			document.body.appendChild(this.rocket.rankImage.tag);
		}
		
		if(engine.rocket.takeDown <= 0 && engine.rocket.timeBonus <= 0) {
			let rank= "E";
			
			this.scoreSplashText= this.rankEText;
			// console.log("E");
			
			if(this.rocket.score >= 200) {
				rank= "D";
				this.scoreSplashText= this.rankDText;
				console.log("D");
			}
			
			if(this.rocket.score >= 300) {
				rank= "C";
				this.scoreSplashText= this.rankCText;
				console.log("C");
			}
			
			if(this.rocket.score >= 500) {
				rank= "B";
				
				this.scoreSplashText= this.rankBText;
				this.rocket.rankImage.tag.src= "assets/Rank_B.png";
				
				console.log("B");
			}
			
			if(this.rocket.score >= 600) {
				rank= "A";
				
				this.scoreSplashText= this.rankAText;
				this.rocket.rankImage.tag.src= "assets/Rank_A.png";
				
				console.log("A");
			}
			
			
			text("Rank: " + rank, this.scoreCard.x, this.scoreCard.y + 90);
			
			if(this.rocket.score >= 300) {
				this.rocket.rankImage.show();
			}
			
			// console.log(rank);

		}
		
		if(this.input.enter) {
			this.currentScene= "title";
			this.gameEnd= false;
			this.rocket.rankImage.hide();
		}
		
		if(millis() - this.waitScore < 2000) {
			return;
		}
		
		
		if(engine.rocket.takeDown > 0) {
			engine.rocket.takeDown --;
			engine.rocket.score += 10;
		}
		
		if(engine.rocket.timeBonus > 0) {
			engine.rocket.timeBonus -= 15;
			engine.rocket.score += 15;
		}
	}
	
	title() {
		this.starfieldBackground(this.doWarpSpeed);
		
		if(this.input.one) {
			this.restartGame();
		}
		
		if(this.input.two) {
			location.href= "HELPME.html";
		}
		
		if(this.input.three) {
			location.href= "credits.html";
		}
		
		if(this.input.four) {
			this.currentScene= "shop";
		}		
		
		if(keyIsPressed && keyCode == 39) {
			this.titleRocket.vel.x= -701;
			this.doWarpSpeed= true;
			this.input.left= false;
		}
		
		if(this.showRocket) {
			
			this.input.left= true;
			
			this.titleRocket.update();
			this.titleRocket.draw();
			
			if(this.titleRocket.vel.x < -50) {
				this.doWarpSpeed= true;
			}
			
			if(this.titleRocket.vel.x < -700) {
				this.showRocket= false;
				this.titleRocket.sprite.hide();
				this.titleRocket.cutsceneProjectile();
				this.input.left= false;
				
				
			}
		} else {
			this.titleRocket.updateCutsceneProjectiles();
			
			fill(255);
			textAlign(CENTER);
			text("(Use 1 2, and 3 to select an option)", width/2, height/2);
		}
	}
	
	shop() {
		background(255, 255, 0);
	}
	
	run() {
		switch(this.currentScene) {
			case "title":
				this.title();
				break;
			
			case "game":
				this.game();
				break;
			
			case "game over":
				this.gameOver();
				break;
				
			case "shop":
				this.shop();
				break;
			
			default:
				throw new Error("The scene '" + this.currentScene + "' doesn't exist!");
				break;
		}
		
		if(this.currentScene == "title" && !this.showRocket) {
			this.rocketLaunching.show();
			this.helpImage.show();
			this.creditsImage.show();
		} else {
			this.rocketLaunching.hide();
			this.helpImage.hide();
			this.creditsImage.hide();
		}

		
		fill(255);
		textSize(20);
		strokeWeight(1);
		
		/* if(this.rocket.projectiles[0]) {
			text(this.rocket.projectiles.length, 100, 100);
		} */
		
	}
}






















// End