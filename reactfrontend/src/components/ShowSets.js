import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
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
		//Button constructor(x, y, rInactive, rActive, cFill, cStroke, wStroke, image = "None")
    	buttons = 	[
				new Button(0.3, 0.3, 0.07, 0.085, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/placeholder"),
				new Button(0.5, 0.3, 0.07, 0.085, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/placeholder"),
				new Button(0.7, 0.3, 0.07, 0.085, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "/placeholder"),
				new Button(0.2, 0.5, 0.07, 0.085, "rgb(255,50,50)", "rgb(255,100,100)", "rgb(0,0,0)", 6, "animals.png", "/animals"),
				new Button(0.4, 0.5, 0.07, 0.085, "rgb(0,150,255)", "rgb(50,200,255)", "rgb(0,0,0)", 6, "None", "/household"),
				new Button(0.6, 0.5, 0.07, 0.085, "rgb(150,35,255)", "rgb(200,85,255)", "rgb(0,0,0)", 6, "None", "/family"),
				new Button(0.8, 0.5, 0.07, 0.085, "rgb(255,150,0)", "rgb(255,200,50)", "rgb(0,0,0)", 6, "None", "/school"),
				new Button(0.3, 0.7, 0.07, 0.085, "rgb(0,206,209)", "rgb(50,255,255)", "rgb(0,0,0)", 6, "None", "/placeholder"),
				new Button(0.5, 0.7, 0.07, 0.085, "rgb(255,100,125)", "rgb(255,150,175)", "rgb(0,0,0)", 6, "None", "/placeholder"),
				new Button(0.7, 0.7, 0.07, 0.085, "rgb(255,200,0)", "rgb(255,255,50)", "rgb(0,0,0)", 6, "None", "/placeholder"),
    				];
			//Bar constructor(x1, y1, x2, y2, cActive, cInactive, cStroke, wStroke)
    	bars =	[
    				new Bar(0.05, 0.05, 0.65, 0.1, "rgb(100,100,100)", "rgb(50,50,50)", "rgb(0,0,0)", 6),
    				new Bar(0.70, 0.05, 0.95, 0.1, "rgb(255,255,255)", "rgb(200,200,200)", "rgb(0,0,0)", 6),
    				new Bar(0.50, 0.85, 0.70, 0.95, "rgb(255,255,255)", "rgb(200,200,200)", "rgb(0,0,0)", 6),
    				new Bar(0.75, 0.85, 0.95, 0.95, "rgb(255,255,255)", "rgb(200,200,200)", "rgb(0,0,0)", 6)
    			]
    }

    function move()
    {
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight - 100;
			ctx.clearRect(0, 0, c.width, c.height);
	
			ctx.beginPath();
			ctx.arc(c.width/2, c.height/2, Math.min(c.width, c.height)/2, 0, 2*Math.PI);
			ctx.fillStyle = "rgb(200,255,255)"
			ctx.fill();
			
			for (var j = 0; j < buttons.length; j++)
			{
				buttons[j].size(mouseX, mouseY - 50, c.width, c.height);
				if (buttons[j].isClicked(mouseDown, mouseX, mouseY - 50, c.width, c.height))
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
			for (var i = 0; i < bars.length; i++)
			{
				bars[i].color(mouseX, mouseY-50, c.width, c.height)
				bars[i].draw(ctx, c.width, c.height);
			}
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
