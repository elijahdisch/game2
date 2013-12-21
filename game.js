c = document.getElementById("pane");
ctx = c.getContext("2d");

vy = .25;
vx = 0;
fps = 60;
targetAmount = 50;
targetSize = 50;
targetSpeed = 0.5; // Base speed in case the random number is really slow.
playerAmount = 5;
playerSize = 100;

var points;
var mouseX;
var mouseY;
var refreshIntervalId;

mouseDetect();

// MAIN FUNCTIONS //

start = function () {
	clearInterval(refreshIntervalId);
	initialize();
	refreshIntervalId = setInterval(animate, 1000/fps);
}

animate = function() {
	doLogic();
	doDrawing();
	console.log(points);
}

// LOGIC //

function initialize() {

	points = 0;

	targetArray = new Array();
	for (var i = 0; i < targetAmount; i++) {

		targetArray[i] = new Object();
		targetArray[i].x = Math.floor(Math.random() * (c.width));
		targetArray[i].y = (0 - i * 10) - targetSize; // Making the targets start at different heights.
		targetArray[i].vy = Math.random() + targetSpeed; // Floor of random number.
		targetArray[i].isAlive = true;

		if (targetArray[i].x > targetSize) {
			targetArray[i].x -= targetSize;
		}

	}

	playerArray = new Array();
	for (var i = 0; i < playerAmount; i++) {

		playerArray[i] = new Object();
		playerArray[i].x = Math.floor(Math.random() * (c.width - playerSize));
		playerArray[i].y = c.height - playerSize;

	}

}

function doLogic() {
	applyPhysics();
}

function applyPhysics() {

	for (var i = 0; i < playerArray.length; i++) {
		
		if (playerArray[i].x + playerSize < c.width
		 && playerArray[i].y + playerSize < c.height
		 && playerArray[i].x > 0
		 && playerArray[i].y > 0) {
			playerArray[i].x += vx;
			playerArray[i].y += vy;

		}

	}

	for (var i = 0; i < targetArray.length; i++) {

		if(targetArray[i].x < c.width
		&& targetArray[i].y < c.height + 5) {
			targetArray[i].y += targetArray[i].vy;
		}

		for (var i2 = 0; i2 < playerArray.length; i2++) {
				
			if (intersects(targetArray[i].x,
						  targetArray[i].y,
						  targetSize,
						  targetSize,
						  playerArray[i2].x,
						  playerArray[i2].y,
						  playerSize,
						  playerSize) && targetArray[i].isAlive) {
				targetArray[i].isAlive = false;
				points++;
			} 


		}

	}

}

function intersects(x, y, w, h, x2, y2, w2, h2) {
  	return  (x <= x2 + w2 &&
     	     x2 <= x + w &&
       	     y <= y2 + h2 &&
       	     y2 <= y + h)
}

// RENDERING //

function doDrawing() {
	ctx.clearRect(0, 0, c.width, c.height);
	drawTarget();
	drawPlayer();
}

function drawTarget() {
	for (var i = 0; i < targetArray.length; i++) {
		ctx.strokeRect(targetArray[i].x, targetArray[i].y, targetSize, targetSize);
	}
}

function drawPlayer() {
	for (var i = 0; i < playerArray.length; i++) {
		ctx.strokeRect(playerArray[i].x, playerArray[i].y, playerSize, playerSize);
	}
}

// HELPER FUNCTIONS //

function setPoints(points) {
    localStorage.setItem('points', points);
}

function getPoints() {
    return localStorage.getItem('points');
}

function onPlayer() {
    if ((mouseX >= x && mouseX <= x + w) 
    	&& (mouseY >= y && mouseY <= y + w)) {
		return true;
	} else { 
		return false; 
	}
}

// If on click is ever needed in game then this is the way to do it.
// JQUERY CALLS //
//$('canvas').click(function() {
//	if (onPlayer()) {
//		vy += 0.5;
//	}
//});