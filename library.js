c = document.getElementById("pane");

function startMouseListener() {
	c.addEventListener("mousemove", function() {
		var x = new Number();
		var y = new Number();

		if (event.x != undefined && event.y != undefined)
		{
		x = event.x;
		y = event.y;
		}
		else // Firefox method to get the position
		{
		x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
		y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
		}

		x -= c.offsetLeft;
		y -= c.offsetTop;

		mouseX = x;
		mouseY = y;

	}, false);
}

function startKeyListener() {
	c.addEventListener("keydown", function() {console.log("asdf");}, false);
}



