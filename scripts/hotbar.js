


class HotBar {
	constructor() {
		this.stuff= {
			right: [],
			straight: [],
			reflex: [],
			obtuse: [],
			specialItems: [],
		};
		
		for(let i= 0; i < 12; i ++) {
			this.stuff.right.push("90 degrees");
			this.stuff.straight.push("180 degrees");
			this.stuff.reflex.push("acute-angle");
			this.stuff.obtuse.push("obtuse-angle");
		}
	}
	
	write(name) {
		if(rightAlias.includes(name)) {
			this.stuff.right.push(name);
		} else if(straightAlias.includes(name)) {
			this.stuff.straight.push(name);
		} else if(obtuseAlias.includes(name)) {
			this.stuff.obtuse.push(name);
		} else if(reflexAlias.includes(name)) {
			this.stuff.reflex.push(name);
		}
		
		console.log(name);
	}
	
	draw() {
		
		let i= 0;
		
		for(let name in this.stuff) {
			stroke(0);
			strokeWeight(20);
			
			fill(100);
			
			if(this.stuff[name].length == 0) {
				fill(255, 0, 0);
			}
			
			rect(width/4 * i, height - 100, width/4, 100);
			
			i ++;
		}
		
		textSize(20);
		textAlign(CENTER);
		strokeWeight(1);
		fill(0);
		
		text(this.stuff.right[this.stuff.right.length -1], width/4 * 0 + width/8, height - 50);
		text(this.stuff.right.length, width/4 * 0 + width/8, height - 25);
		
		text(this.stuff.straight[this.stuff.straight.length -1], width/4 * 1 + width/8, height - 50);
		text(this.stuff.straight.length, width/4 * 1 + width/8, height - 25);
		
		text(this.stuff.obtuse[this.stuff.obtuse.length -1], width/4 * 2 + width/8, height - 50);
		text(this.stuff.obtuse.length, width/4 * 2 + width/8, height - 25);
		
		text(this.stuff.reflex[this.stuff.reflex.length -1], width/4 * 3 + width/8, height - 50);
		text(this.stuff.reflex.length, width/4 * 3 + width/8, height - 25);
	}
}
























// End.