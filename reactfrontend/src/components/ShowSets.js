import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CircleButton from './CircleButton'
import Bar from './Bar'
import { Link, Redirect, withRouter } from 'react-router-dom'

class ShowSets extends Component {

  componentDidMount(){
    let c = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = c.getContext('2d');
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
			//create buttons and bars
    	setInterval(move, 1000.0/60.0);
      //interval var was causing issue because it was never called
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
		//constructor(x, y, rInactive, rActive, cFill, cActive, cStroke, wStroke, image = "None", link = "None", text = "")
    	buttons = 	[
				new CircleButton(0.3, 0.3, 0.08, 0.1, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/alphabet", "alphabet"),
				new CircleButton(0.5, 0.3, 0.08, 0.1, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/transliteration", "transliteration"),
				new CircleButton(0.7, 0.3, 0.08, 0.1, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/reading", "reading"),
				new CircleButton(0.2, 0.5, 0.08, 0.1, "rgb(255,50,50)", "rgb(255,100,100)", "rgb(0,0,0)", 6, "animals.png", "/animals", "animals"),
				new CircleButton(0.4, 0.5, 0.08, 0.1, "rgb(0,150,255)", "rgb(50,200,255)", "rgb(0,0,0)", 6, "None", "/foods", "foods"),
				new CircleButton(0.6, 0.5, 0.08, 0.1, "rgb(150,35,255)", "rgb(200,85,255)", "rgb(0,0,0)", 6, "None", "/household", "household"),
				new CircleButton(0.8, 0.5, 0.08, 0.1, "rgb(255,150,0)", "rgb(255,200,50)", "rgb(0,0,0)", 6, "None", "/school", "school"),
				new CircleButton(0.3, 0.7, 0.08, 0.1, "rgb(0,206,209)", "rgb(50,255,255)", "rgb(0,0,0)", 6, "None", "/colors", "colors"),
				new CircleButton(0.5, 0.7, 0.08, 0.1, "rgb(255,100,125)", "rgb(255,150,175)", "rgb(0,0,0)", 6, "None", "/clothing", "clothing"),
				new CircleButton(0.7, 0.7, 0.08, 0.1, "rgb(255,200,0)", "rgb(255,255,50)", "rgb(0,0,0)", 6, "None", "/placeholder", "placeholder"),
    				];
			//constructor(x, y, rx, ry, cFill, cActive, cStroke, wStroke, link = "None", text = "")
    	bars =	[
    				new Bar(0.60, 0.9, 0.1, 0.05, "rgb(255,255,255)", "rgb(200,200,200)", "rgb(0,0,0)", 6, "/settings", "settings"),
    				new Bar(0.80, 0.9, 0.1, 0.05, "rgb(255,255,255)", "rgb(200,200,200)", "rgb(0,0,0)", 6, "/achievements", "achievements")
    			]
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
          window.location.href= hardcodingisbad+clickBuffer;

          clickBuffer = "None";
        }
        buttons[j].draw(ctx, c.width, c.height);
      }
    }

    function drawBars()
    {
      for (var i = 0; i < bars.length; i++)
      {
        bars[i].isTouchingMouse(mouseX, mouseY - 75, c.width, c.height)
        bars[i].draw(ctx, c.width, c.height);
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
			drawBars();

      var username = "abdulzakkar"
      
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.textAlign = "left";
      ctx.font = "" + Math.ceil(Math.min(c.width/20, c.height/20)) + "px Arial";
      ctx.fillText("Welcome, " + username + "!", 0.05*c.width, 0.05*c.height);
      ctx.font = "" + Math.ceil(Math.min(c.width/30, c.height/30)) + "px Arial";
      ctx.fillText("Choose a card set to begin learning.", 0.05*c.width, 0.09*c.height);
    }

    setup();
  }

  render(){
    return (
      <canvas ref="myCanvas" />
    );
  }
}

export default ShowSets
