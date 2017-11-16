import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Card from './Card'
import CircleButton from './CircleButton'
import Bar from './Bar'
import firebase, { fbAuth } from '../firebase'
import { getFlashcards, getUserDetails, getAlphabets } from './UserFunctions'

class Animals extends Component {

  async getCards(){
	var user = firebase.auth().currentUser;
	let flashArray = await getFlashcards(user.uid);
	return flashArray;
}

async getUserFacts(){
	var user = firebase.auth().currentUser;

	let langArray = await getUserDetails(user.uid);
	return langArray;
}

async getAlpha(){
  var user = firebase.auth().currentUser;
  let alpharay = await getAlphabets(user.uid);
  return alpharay;
}

 async componentDidMount(){
	 var innerThis = this;
	var flash = [];
  var userArray = [];
  var alpha = [];

		//await result of async function getting user's details
	await	innerThis.getUserFacts().then(function(result){
			userArray = result;
		});	
  await innerThis.getCards().then(function(result){
		flash = result;
  });
  await innerThis.getAlpha().then(function(result){
    alpha = result;
  })
	console.log(userArray);
  console.log(flash);
  console.log(alpha);
  //userarray in format of [nativelang, learnedlang, username]
  //flash is the premade sets

    let c = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = c.getContext("2d");
    var frame = 0, card, otherColor = [255,255,255], startFlipFrame;
    var buttons, bars, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false, clickBuffer = "None", 
      clickedNext = false, answer = 0, complete = false, currentQuestion, currentAnswer, options, color, cardSet = 0;
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
      setCards();
      color = [255,255,255];
      card = new Card(0.5, 0.3, 0.3, 0.2, 50, color, currentQuestion);
      //constructor(x, y, rx, ry, cFill, cActive, cStroke, wStroke, link = "None", text = "", cText)
      bars =  [
            new Bar(0.5, 0.65, 0.3, 0.0375, "rgb(255,0,0)", "rgb(150,0,0)", "rgb(0,0,0)", 6, "./option1", "Option 1", "rgb(255,255,255)"),
            new Bar(0.5, 0.75, 0.3, 0.0375, "rgb(255,0,0)", "rgb(150,0,0)", "rgb(0,0,0)", 6, "./option2", "Option 2", "rgb(255,255,255)"),
            new Bar(0.5, 0.85, 0.3, 0.0375, "rgb(255,0,0)", "rgb(150,0,0)", "rgb(0,0,0)", 6, "./option3", "Option 3", "rgb(255,255,255)"),
            new Bar(0.5, 0.95, 0.3, 0.0375, "rgb(255,0,0)", "rgb(150,0,0)", "rgb(0,0,0)", 6, "./option4", "Option 4", "rgb(255,255,255)")
      ];
      //constructor(x, y, rInactive, rActive, cFill, cActive, cStroke, wStroke, image = "None", link = "None", text = "", cText)
      buttons = [
        new CircleButton(0.9, 0.9, 0.07, 0.09, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "./next", "Next", "rgb(0,0,0)")
      ];
    }

    function setCards()
    {
      var l = flash[cardSet]["ar"].length;
      var r = Math.floor((Math.random() * l) + 1) - 1;
      currentQuestion = flash[cardSet]["ar"][r];
      currentAnswer = flash[cardSet]["en"][r];
      var otherOptions = [r];
      while (otherOptions.length < 4)
      {
        r = Math.floor((Math.random() * l) + 1) - 1;
        if (!otherOptions.includes(r)) otherOptions.push(r);
      }
      console.log(otherOptions);
      for (var i = 0; i < otherOptions.length; i++) otherOptions[i] = flash[cardSet]["en"][otherOptions[i]]
      options = shuffleArray(otherOptions);
      console.log(options);
    }

    function shuffleArray(a) {
        var array = a;
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function drawButtons()
    {
      for (var i = 0; i < buttons.length; i++)
      {
        buttons[i].size(mouseX, mouseY - 75, c.width, c.height);
        if (buttons[i].isClicked(mouseDown, mouseX, mouseY - 75, c.width, c.height)) clickBuffer = buttons[i].link;
        if (!mouseDown && clickBuffer === "./next" && complete === true)
        {
          clickedNext = true;
          clickBuffer = "None";
        }
        buttons[i].draw(ctx, c.width, c.height);
      }
    }

    function drawBars(options)
    {
      for (var i = 0; i < bars.length; i++)
      {
        bars[i].text = options[i];
        bars[i].isTouchingMouse(mouseX, mouseY - 75, c.width, c.height)
        bars[i].draw(ctx, c.width, c.height);
        if (bars[i].isClicked(mouseDown, mouseX, mouseY - 75, c.width, c.height)) clickBuffer = bars[i].link;
        if (!mouseDown && !complete)
        {
          if (clickBuffer === "./option1") answer = 1;
          else if (clickBuffer === "./option2") answer = 2;
          else if (clickBuffer === "./option3") answer = 3;
          else if (clickBuffer === "./option4") answer = 4;
          clickBuffer = "None";
        }
      }
    }

    function move()
    {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight - 100;
      ctx.clearRect(0, 0, c.width, c.height);

      ctx.beginPath();
      ctx.arc(c.width/2, c.height/2, Math.min(c.width, c.height)/2, 0, 2*Math.PI);
      ctx.fillStyle = "rgb(255,225,225)"
      ctx.fill();

      drawButtons();
      drawBars(options);

      if (answer !== 0)
      {
        complete = true;
        if (!card.isFlipping)
        {
          startFlipFrame = frame;
          if (currentAnswer === options[answer-1]) color = [150,255,150];
          else color = [255,150,150];
          card.text = currentAnswer;
          card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
        }
        answer = 0;
      }

      if (clickedNext && complete)
      {
        complete = false;
        clickedNext = false;
        setCards();
        card.text = currentQuestion;
        startFlipFrame = frame;
        color = [255,255,255]
        card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
      }

      if (card.isFlipping) card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
      else card.draw(ctx, c.width, c.height);

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