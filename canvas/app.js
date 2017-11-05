var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var buttons, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false;
c.style.backgroundColor = "#FFFFFF";

function setup()
{
	keyPresses = []
	for (var i = 0; i < 128; i++)
	{
		keyPresses.push(false)
	}
	initialize();
	interval = setInterval(move, 1000.0/60.0);
	document.body.addEventListener("mousemove", function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});
	document.body.addEventListener("mousedown", function(e) {
		mouseDown = true;
	});
	document.body.addEventListener("mouseup", function(e) {
		mouseDown = false;
	});
	document.body.addEventListener("keydown", function(e) {
        keyPresses[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keyPresses[e.keyCode] = false;
    });
}

function initialize()
{
	buttons = 	[
					new Button(0.3, 0.3, 0.06, 0.075, "rgb(100,100,100)", "rgb(0,0,0)", 12),
					new Button(0.5, 0.3, 0.06, 0.075, "rgb(100,100,100)", "rgb(0,0,0)", 12),
					new Button(0.7, 0.3, 0.06, 0.075, "rgb(100,100,100)", "rgb(0,0,0)", 12),
					new Button(0.2, 0.5, 0.06, 0.075, "rgb(255,50,50)", "rgb(0,0,0)", 12, "animals.png"),
					new Button(0.4, 0.5, 0.06, 0.075, "rgb(0,150,255)", "rgb(0,0,0)", 12),
					new Button(0.6, 0.5, 0.06, 0.075, "rgb(150,35,255)", "rgb(0,0,0)", 12),
					new Button(0.8, 0.5, 0.06, 0.075, "rgb(255,150,0)", "rgb(0,0,0)", 12),
					new Button(0.1, 0.7, 0.06, 0.075, "rgb(150,255,0)", "rgb(0,0,0)", 12),
					new Button(0.3, 0.7, 0.06, 0.075, "rgb(0,206,209)", "rgb(0,0,0)", 12),
					new Button(0.5, 0.7, 0.06, 0.075, "rgb(255,100,125)", "rgb(0,0,0)", 12),
					new Button(0.7, 0.7, 0.06, 0.075, "rgb(255,200,0)", "rgb(0,0,0)", 12),
					new Button(0.9, 0.7, 0.06, 0.075, "rgb(200,100,255)", "rgb(0,0,0)", 12)
				];
}

function move()
{
  	ctx.canvas.width  = window.innerWidth - 25;
  	ctx.canvas.height = window.innerHeight - 25;
	ctx.clearRect(0, 0, c.width, c.height);
	for (var i = 0; i < buttons.length; i++)
	{
		buttons[i].size(mouseX - 10, mouseY - 10, c.width, c.height);
		buttons[i].draw(ctx, c.width, c.height);
	}
}

setup()