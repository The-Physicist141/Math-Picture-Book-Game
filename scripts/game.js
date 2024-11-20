




let engine;

const rightAlias= ["90 degrees", "right-angle"];
const straightAlias= ["180 degrees", "straight-angle"];
const obtuseAlias= ["135 degrees", "obtuse-angle"];
const reflexAlias= ["60 degrees", "acute-angle"];

let infinityHealth= false;

function setup() {
	createCanvas(window.windowWidth, window.windowHeight);
	
	engine= new Engine();
	
	console.log("Oh, look who's sneaky. Tell you what, as a reward for your exploration, type \"infinityHealth= true\" for infinite health!");
}

function draw() {
	engine.run();
}

function keyPressed() {
	engine.readInput(true);
}

function keyReleased() {
	engine.readInput(false);
}

