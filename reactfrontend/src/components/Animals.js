import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'
import Button from './Button'
import Bar from './Bar'
import { Link, Redirect, withRouter } from 'react-router-dom'

class Animals extends Component {

  componentDidMount(){
    let c = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = c.getContext("2d");
    var frame = 0, card, otherColor = [255,255,255], startFlipFrame;
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
      setInterval(move, 1000.0/60.0);
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
      var color = [255,255,255];
      card = new Card(0.5, 0.3, 0.3, 0.2, 50, color, "QUESTION");
      bars =  [
            new Bar(0.2, 0.6, 0.8, 0.675, "rgb(255,150,150)", "rgb(255,100,100)", "rgb(0,0,0)", 6),
            new Bar(0.2, 0.7, 0.8, 0.775, "rgb(255,150,150)", "rgb(255,100,100)", "rgb(0,0,0)", 6),
            new Bar(0.2, 0.8, 0.8, 0.875, "rgb(255,150,150)", "rgb(255,100,100)", "rgb(0,0,0)", 6),
            new Bar(0.2, 0.9, 0.8, 0.975, "rgb(255,150,150)", "rgb(255,100,100)", "rgb(0,0,0)", 6)
      ]
      buttons = [
        new Button(0.9, 0.9, 0.07, 0.09, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6)
      ]
    }

    function move()
    {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight - 100;
      ctx.clearRect(0, 0, c.width, c.height);
      if (keyPresses[32])
      {
        if (!card.isFlipping)
        {
          startFlipFrame = frame;
          if (otherColor[0] == 200 && otherColor[1] == 0 && otherColor[2] == 0) 
          {
            otherColor = [255,255,255];
            card.text = "QUESTION";
          }
          else 
          {
            otherColor = [200,0,0];
            card.text = "ANSWER";
          }
          card.drawFlip(ctx, frame - startFlipFrame, otherColor, c.width, c.height);
        }
      }
      if (card.isFlipping) card.drawFlip(ctx, frame - startFlipFrame, otherColor, c.width, c.height);
      else card.draw(ctx, c.width, c.height);

      for (var i = 0; i < bars.length; i++)
      {
        bars[i].color(mouseX, mouseY - 75, c.width, c.height)
        bars[i].draw(ctx, c.width, c.height);
      }
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

      frame++;
    }

    setup()

  }

  render(){
    return (
      <canvas ref="myCanvas" />
    );
  }
}

export default Animals;