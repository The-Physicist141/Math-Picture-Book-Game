


class Asteroid {
	constructor() {
		this.pos= createVector(random(width/4), random(40, height - 100));
		this.alive= true;
		this.type= 90;
		
		this.speed= random(10);
		
		this.w= 30;
		this.h= 30;
		
		this.error= 30;
		
		let chance= random(1);
		
		if(chance < 0.25) {
			this.type= rightAlias;
			this.angle= 90;
		} else if(chance > 0.25 && chance < 0.5) {
			this.type= straightAlias;
			this.angle= 180;
		} else if(chance > 0.5 && chance < 0.75) {
			this.type= obtuseAlias;
			this.angle= 60; // things are backwards
			
		} else {
			this.type= reflexAlias;
			this.angle= 135;
		}
		
		
	}
	
	update() {
		this.pos.x += this.speed;
		
		if(engine.isOffScreen(this)) {
			this.alive= false;
		}
		
		if(engine.pointContact(this, engine.rocket)) {
			this.alive= false;
			engine.rocket.health --;
			engine.rocket.hits ++;
		}
	}
	
	draw() {
		stroke(255);
		strokeWeight(5);
		
		line(this.pos.x, this.pos.y, this.pos.x + this.w, this.pos.y);
		
		push();
			translate(this.pos.x + this.w, this.pos.y);
			rotate(radians(this.angle));
			line(0, 0, 30, 0);
			
			
			noFill();
			strokeWeight(1);
			stroke(255);
		pop();
		
		

		// ellipse(this.pos.x, this.pos.y, this.error * 2);
	}
}



















// End