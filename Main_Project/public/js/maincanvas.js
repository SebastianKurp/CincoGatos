var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var buttons, bars, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false, clickBuffer = "None";
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
		document.getElementById("loadingcat").remove();
}

function initialize()
{
	//constructor(x, y, rInactive, rActive, cFill, cActive, cStroke, wStroke, image = "None", link = "None", text = "", cText)
	buttons = 	[
			new CircleButton(0.3, 0.3, 0.08, 0.1, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/alphabet", "alphabet", "rgb(0,0,0)"),
			new CircleButton(0.5, 0.3, 0.08, 0.1, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/transliteration", "transliteration", "rgb(0,0,0)"),
			new CircleButton(0.7, 0.3, 0.08, 0.1, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/reading", "reading", "rgb(0,0,0)"),
			new CircleButton(0.2, 0.5, 0.08, 0.1, "rgb(255,50,50)", "rgb(255,100,100)", "rgb(0,0,0)", 6, "None", "/animals", "animals", "rgb(0,0,0)"),
			new CircleButton(0.4, 0.5, 0.08, 0.1, "rgb(0,150,255)", "rgb(50,200,255)", "rgb(0,0,0)", 6, "None", "/foods", "foods", "rgb(0,0,0)"),
			new CircleButton(0.6, 0.5, 0.08, 0.1, "rgb(150,35,255)", "rgb(200,85,255)", "rgb(0,0,0)", 6, "None", "/household", "household", "rgb(0,0,0)"),
			new CircleButton(0.8, 0.5, 0.08, 0.1, "rgb(255,150,0)", "rgb(255,200,50)", "rgb(0,0,0)", 6, "None", "/school", "school", "rgb(0,0,0)"),
			new CircleButton(0.3, 0.7, 0.08, 0.1, "rgb(0,206,209)", "rgb(50,255,255)", "rgb(0,0,0)", 6, "None", "/colors", "colors", "rgb(0,0,0)"),
			new CircleButton(0.5, 0.7, 0.08, 0.1, "rgb(255,100,125)", "rgb(255,150,175)", "rgb(0,0,0)", 6, "None", "/clothing", "clothing", "rgb(0,0,0)"),
			new CircleButton(0.7, 0.7, 0.08, 0.1, "rgb(255,200,0)", "rgb(255,255,50)", "rgb(0,0,0)", 6, "None", "/numbers", "numbers", "rgb(0,0,0)"),
				];
}

function drawButtons()
{
  for (var j = 0; j < buttons.length; j++)
  {
    buttons[j].size(mouseX, mouseY - 75, c.width, c.height);
    if (buttons[j].isClicked(mouseDown, mouseX, mouseY - 75, c.width, c.height))
    {
      clickBuffer = buttons[j].link;
    }
    if (!mouseDown && clickBuffer !== "None")
    {
      console.log(clickBuffer);

      var hardcodingisbad = "http://localhost:3000";    
      window.location.href= hardcodingisbad+'/vocab';
			localStorage.setItem("datadata", clickBuffer);
			
      //if clickbuffer is passed we can dynamically change flashcard sets
      //& background colors based on user clicks -- one canvas
      clickBuffer = "None";
    }
    buttons[j].draw(ctx, c.width, c.height);
  }
}

function move()
{
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight - 100;
	ctx.clearRect(0, 0, c.width, c.height);

	ctx.beginPath();
	ctx.arc(c.width/2, c.height/2, Math.min(c.width, c.height)/2, 0, 2*Math.PI);
	ctx.fillStyle = "rgb(225,225,225)"
	ctx.fill();
		
  drawButtons();
  
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.textAlign = "left";
	ctx.font = "" + Math.ceil(Math.min(c.width/30, c.height/30)) + "px Arial";
    ctx.fillText("Choose a card set to begin learning.", 0.05*c.width, 0.09*c.height);
}

setup()
