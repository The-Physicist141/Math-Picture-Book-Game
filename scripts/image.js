

class Image {
	constructor(imageUrl, x, y) {
		this.tag= document.createElement("img");
		this.tag.className= "imageClass";
		this.tag.src= imageUrl;
		this.tag.style.overflow= "hidden";
		
		this.x= x;
		this.y= y;
		
		
		this.hide();
		
		document.body.appendChild(this.tag);
	}
	
	setWidth(w) {
		this.tag.style.width= w + "px";
	}
	
	setHeight(h) {
		this.tag.style.height= h + "px";
	}
	
	show() {
		this.tag.style.visibility= "visible";
	}
	
	hide() {
		this.tag.style.visibility= "hidden";
	}
	
	update() {
		this.tag.style.left= this.x + "px";
		this.tag.style.top= this.y + "px";
	}
}