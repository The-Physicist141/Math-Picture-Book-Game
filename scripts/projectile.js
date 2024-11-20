


class Projectile {
	constructor(x, y, vx, vy, type) {
		this.pos= createVector(x, y);
		this.vel= createVector(vx, vy);
		
		this.alive= true;
		
		this.type= type;
	}
	
	update() {
		this.pos.add(this.vel);
		
		if(engine.isOffScreen(this)) {
			this.alive= false;
		}
	}
	
	draw() {
		fill(255);
		strokeWeight(1);
		ellipse(this.pos.x, this.pos.y, 20, 20);
	}
}