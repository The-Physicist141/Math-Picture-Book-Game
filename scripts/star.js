

class Star {
	constructor() {
		this.x= random(width);
		this.y= random(height);
		this.colour= color(random(255), random(255), random(255));
		
		this.velocity= random(10) * 2;
	}
	
	update(warpSpeed) {
		if(warpSpeed) {
			this.x += this.velocity * 2;
		} else {
			this.x += this.velocity;
		}
		
		if(this.x > width) {
			this.x= 0;
			this.y= random(height);
		}
	}
	
	draw() {
		stroke(0);
		strokeWeight(1);
		fill(this.colour);
		ellipse(this.x, this.y, 5, 5);
	}
}