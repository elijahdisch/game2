c = document.getElementById("pane");
ctx = c.getContext("2d");

fps = 60;
maxIndex = 10;
targetAmount = 50;
targetSize = 50;
targetSpeed = 0.5; // Base speed in case the random number is really slow.
targetIndex = 1;
playerAmount = 2;
playerSize = 100;
playerIndex = 0;
points = 0;
mouseX = 0;
mouseY = 0;
localPoints = 0;

var refreshIntervalId;

startKeyListener();
startMouseListener();

// MAIN FUNCTIONS //

start = function () {
	clearInterval(refreshIntervalId);
	initialize();
	refreshIntervalId = setInterval(animate, 1000/fps);
}

animate = function() {
	doLogic();
	doDrawing();
}

// LOGIC //

function initialize() {

	spritemap = new Array();
	spritemap[targetIndex] = loadImage("sprites/sprite_0.png");
	spritemap[playerIndex] = loadImage("sprites/sprite_1.png");

	targetArray = new Array();
	for (var i = 0; i < targetAmount; i++) {

		targetArray[i] = new Object();
		targetArray[i].x = Math.floor(Math.random() * (c.width));
		targetArray[i].y = (0 - i * 50) - targetSize; // Making the targets start at different heights.
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
		playerArray[i].points = 0;

	}

}

function loadImage(name) {

	var image = new Image();
	image.src = name;
	return image;

}

function doLogic() {
	applyPhysics();

	document.getElementById("points").innerHTML = localPoints;

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
				playerArray[i2].points++;
				localPoints++;

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
		if (targetArray[i].isAlive) ctx.drawImage(spritemap[targetIndex], targetArray[i].x, targetArray[i].y);
	}
}

function drawPlayer() {
	for (var i = 0; i < playerArray.length; i++) {
		ctx.drawImage(spritemap[playerIndex], playerArray[i].x, playerArray[i].y);
		ctx.font = "30px Arial";
		ctx.strokeText(playerArray[i].points, playerArray[i].x + (playerSize / 2) - 10, playerArray[i].y + (playerSize / 2) - 10)
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