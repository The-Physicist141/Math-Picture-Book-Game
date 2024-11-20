


class Resource extends Asteroid {
	constructor() {
		super();
		
		let chance= random(1);
		
		if(chance < 0.25) {
			this.type= rightAlias[floor(rightAlias.length -1)];
		} else if(chance > 0.25 && chance < 0.5) {
			this.type= straightAlias[floor(straightAlias.length -1)];
		} else if(chance > 0.5 && chance < 0.75) {
			this.type= obtuseAlias[floor(obtuseAlias.length -1)];
		} else {
			this.type= reflexAlias[floor(reflexAlias.length -1)];
		}
		
		this.speed= 5;
	}
	
	update() {
		if(engine.pointContact(this, engine.rocket)) {
			engine.rocket.hotbar.write(this.type);
			this.alive= false;
		}
		
		if(engine.isOffScreen(this)) {
			this.alive= false;
		}
		
		this.pos.x += this.speed;
	}
	
	draw() {
		stroke(0, 0, 0);
		strokeWeight(1);
		
		fill(255, 255, 0);
		ellipse(this.pos.x, this.pos.y, 20);
	}
}



