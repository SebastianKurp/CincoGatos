var userfunctions = require('./userfunctions');

var userId = document.getElementById("bundle").getAttribute("data-userId");
if (typeof userId === "undefined" ) {
   var userId = ["No dice"];
}
console.log("Inside bundle ID is: " + userId);
var userArray = [];
flashcards = [];

async function userInfo() {
  let flash = await userfunctions.getCards(userId);
  console.log(flash);
  return flash;
}

let link = localStorage["datadata"];
localStorage.removeItem("datadata"); //clear out so can be used again
console.log("Came here from " + link);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var frame = 0, card, otherColor = [255,255,255], startFlipFrame;
var buttons, bars, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false, clickBuffer = "None", 
  clickedNext = false, answer = 0, complete = false, currentQuestion, currentAnswer, options, color, cardSet, currCard;
c.style.backgroundColor = "#FFFFFF";

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

async function setup()
{
  console.log("Setup is called");
  keyPresses = []
  for (var i = 0; i < 128; i++)
  {
    keyPresses.push(false)
  }
  await initialize();
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

async function initialize()
{
  console.log("Initialize is called");
  getCardSet();
  let currCard = await setCards();

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

function getCardSet()
{
  console.log("Getting cardset");
  if (link === "/animals") return 0;
  else if (link === "/clothing") return 1;
  else if (link === "/colors") return 2;
  else if (link === "/foods") return 3;
  else if (link === "/household") return 4;
  else if (link === "/school") return 5;
  else if (link === "/alphabet") return 6;
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

async function move()
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
      if (currentAnswer === options[answer-1]) 
      {
        color = [150,255,150];
        if (flashcards[cardSet][langSet][currCard][1] < 5) flashcards[cardSet][langSet][currCard][1] += 1
      }
      else
      {
        color = [255,150,150];
        if (flashcards[cardSet][langSet][currCard][1] > 0) flashcards[cardSet][langSet][currCard][1] -= 1
      }
      card.text = currentAnswer;
      card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
    }
    answer = 0;
  }

  if ((clickedNext || keyPresses[32]) && complete)
  {
    complete = false;
    clickedNext = false;
    let currCard = await setCards();
    card.text = currentQuestion;
    startFlipFrame = frame;
    color = [255,255,255]
    card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
  }

  if (card.isFlipping) card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
  else card.draw(ctx, c.width, c.height);

  frame++;
}

async function setCards()
{
  console.log("setCards is called -- next is awaiting userinfo");
  var flash = await userInfo();
  let userArray = flash[1];
  let alpha = flash[2];
  let flashcards = flash[0];
  let username = userArray[2];
  let nativeL = userArray[0];
  let learningL = userArray[1];
  console.log(userId); 
  //userArray = req.session.userArray;
  let langSet = "";
  switch(userArray[1]){
    case 'spanish':
      console.log("Spanish");
      langSet = 'sp';
      break;
    case 'japanese':
      console.log("Japanese");
      langSet = 'jp';
      break;
    case 'arabic':
      console.log("Arabic");
      langSet = 'ar';
      break;
    case 'polish':
      console.log("Polish");
      langSet = 'pl';
      break;
    default:
      console.log("Something broke");
  }
  cardSet =  await getCardSet();
  if(cardSet >= 6){
    if(langSet === 'ar'){
      console.log(alpha[0]);
    }
    else if(langSet === 'pl'){
      console.log(alpha[1]);
    }
    else if(langSet === 'jp'){
      while(which !== 'h' & which !== 'k'){
        var which = prompt("Hiragana or Katakana? Type H or K");
        which = which.toLowerCase();
      }
      if(which === 'h'){
        //this is the array list like [あ, 0], [い, 0]
        console.log(alpha[2]["hiragana"]["jp"]);
      }
      else if(which === 'k'){
        console.log("カタカナ");
      }
      console.log(alpha[2]);
    }
    else{
      alert("No alphabet for you!");
      window.location.href = "http://localhost:3000/vocab";
    }
  }
  else{

  var l = flashcards[cardSet][langSet].length;
  var r = Math.floor((Math.random() * l) + 1) - 1;

  var cardIndex = r;
  currentQuestion = flashcards[cardSet][langSet][r][0];
  currentAnswer = flashcards[cardSet]["en"][r][0];

  var otherOptions = [r];
  while (otherOptions.length < 4)
  {
    r = Math.floor((Math.random() * l) + 1) - 1;
    if (!otherOptions.includes(r)) otherOptions.push(r);
  }
  console.log(otherOptions);
  for (var i = 0; i < otherOptions.length; i++) otherOptions[i] = flashcards[cardSet]["en"][otherOptions[i]][0]
  options = shuffleArray(otherOptions);
  console.log(options);
  return cardIndex;

}

setup()