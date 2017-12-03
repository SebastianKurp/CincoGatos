//this is now storing a token
var userId = document.getElementById("bundle").getAttribute("data-userId");
if (typeof userId === "undefined" ) {
   var userId = ["No dice"];
}

let link = localStorage["datadata"];
localStorage.removeItem("datadata"); //clear out so can be used again

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var frame = 0, card, otherColor = [255,255,255], startFlipFrame;
var buttons, bars, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false, clickBuffer = "None", 
  clickedNext = false, answer = 0, complete = false, currentQuestion, 
  currentAnswer, options, color, cardSet, currCard, langset, baseColor, userArray;
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
  await getLang(); //
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
  document.getElementById("loadingcat").remove();
}

async function initialize()
{
  console.log("Initialize is called");
  cardSet =  await getCardSet(); //
  langset = await getLang(); //
  currCard = await setCards(); //

  color = [255,255,255];
  card = new Card(0.5, 0.3, 0.3, 0.2, 50, color, currentQuestion);
  //constructor(x, y, rx, ry, cFill, cActive, cStroke, wStroke, link = "None", text = "", cText)
  var color1 = "rgb(" + baseColor[0] + ',' + baseColor[1] + ',' + baseColor[2] + ')';
  var color2 = "rgb(" + Math.floor((baseColor[0] + 0) / 2)  + ',' + Math.floor((baseColor[1] + 0) / 2) + ',' + Math.floor((baseColor[2] + 0) / 2) + ')';
  bars =  [
        new Bar(0.5, 0.65, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option1", "Option 1", "rgb(255,255,255)"),
        new Bar(0.5, 0.75, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option2", "Option 2", "rgb(255,255,255)"),
        new Bar(0.5, 0.85, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option3", "Option 3", "rgb(255,255,255)"),
        new Bar(0.5, 0.95, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option4", "Option 4", "rgb(255,255,255)")
  ];
  //constructor(x, y, rInactive, rActive, cFill, cActive, cStroke, wStroke, image = "None", link = "None", text = "", cText)
  buttons = [
    new CircleButton(0.9, 0.9, 0.07, 0.09, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "./next", "Next", "rgb(0,0,0)")
  ];
}

function getCardSet()
{
  console.log("Getting cardset");
  if (link === "/animals") {
    baseColor = [255,0,0];
    return 0;
  }
  else if (link === "/clothing") {
    baseColor = [255,100,125];
    return 1;
  }
  else if (link === "/colors") {
    baseColor = [0,206,209];
    return 2;
  }
  else if (link === "/foods") {
    baseColor = [0,150,255];
    return 3;
  }
  else if (link === "/household") {
    baseColor = [150,35,255];
    return 4;
  }
  else if (link === "/school") {
    baseColor = [255,150,0];
    return 5;
  }
  else if (link === "/numbers") {
    baseColor = [255,200,0];
    return 6;
  }
  else if (link === "/alphabet") {
    baseColor = [100,100,100];
    return 7;
  }
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
  var color3 = "rgb(" + Math.floor((baseColor[0] + 255*4) / 5)  + ',' + Math.floor((baseColor[1] + 255*4) / 5) + ',' + Math.floor((baseColor[2] + 255*4) / 5) + ')';
  ctx.fillStyle = color3;
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
        console.log(langset[3]);
        if (langset[3][cardSet][langset[0]][currCard][1] < 5) langset[3][cardSet][langset[0]][currCard][1] += 1
      }
      else
      {
        color = [255,150,150];
        if (langset[3][cardSet][langset[0]][currCard][1] > 0) langset[3][cardSet][langset[0]][currCard][1] -= 1
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
    currCard = await setCards();
    card.text = currentQuestion;
    startFlipFrame = frame;
    color = [255,255,255]
    card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
  }

  if (card.isFlipping) card.drawFlip(ctx, frame - startFlipFrame, color, c.width, c.height);
  else card.draw(ctx, c.width, c.height);

  frame++;
}

async function userInfo() {
  let flash = await getCards(userId);
  console.log("User info triggered, awaited get cards");
  console.log(flash);
  return flash;
}

async function getLang(){
  console.log("getLang is called -- next is awaiting userinfo");
 // var flash = await userInfo();
  // let userArray = flash[1];
  // let alpha = flash[2];
  // let flashcards = flash[0];
  // let username = userArray[2];
  // let nativeL = userArray[0];
  // let learningL = userArray[1];
  console.log(userId); 
  let langSet = "";
  switch(userArray[1]){
    case 'Spanish':
      langSet = 'sp';
      break;
    case 'Japanese':
      langSet = 'jp';
      break;
    case 'Arabic':
      langSet = 'ar';
      break;
    case 'Polish':
      langSet = 'pl';
      break;
    default:
      console.log("Something broke");
  }
  return [langSet, userArray, alpha, flashcards, username, nativeL, learningL];
}

async function setCards()
{
  var userArray = langset[1];
  var alpha = langset[2];
  var flashcards = langset[3];
  var username = langset[4];
  var nativeL = langset[5];
  var learningL = langset[6];
  var langSet = langset[0];

  var currSet = 'None';
  if(cardSet === 7){
    if(langSet === 'ar'){
      currSet = alpha[0];
    }
    else if(langSet === 'pl'){
      currSet = alpha[1];
    }
    else if(langSet === 'jp'){
      randomAlpha = Math.floor((Math.random() * 2) + 1)
      if(randomAlpha === 1){
        currSet = alpha[2]["hiragana"];
      }
      else if(randomAlpha === 2){
        currSet = alpha[2]["katakana"];
      }
    }
    else{
      //Spanish
      return false;
    }
  }

  if (currSet === 'None') currSet = flashcards[cardSet]
  console.log(currSet)
  var l = currSet[langSet].length;
  var r = Math.floor((Math.random() * l) + 1) - 1;

  var cardIndex = r;
  currentQuestion = currSet[langSet][r][0];
  currentAnswer = currSet["en"][r];

  var otherOptions = [r];
  console.log("other options "+otherOptions)
  while (otherOptions.length < 4)
  {
    r = Math.floor((Math.random() * l) + 1) - 1;
    if (!otherOptions.includes(r)) otherOptions.push(r);
  }
  for (var i = 0; i < otherOptions.length; i++) otherOptions[i] = currSet["en"][otherOptions[i]]
  
  options = shuffleArray(otherOptions);
  console.log("options " + options);
  return cardIndex;
}

async function SetUpCheck(){
  let flash = await userInfo();
  console.log("inside setup check, should have waited for userinfo to complete");
   userArray = flash[1];
   console.log(userArray + " user array");
   alpha = flash[2];
   flashcards = flash[0];
   username = userArray[2];
   nativeL = userArray[0];
   learningL = userArray[1];
  if(link === '/alphabet'){
    let userArray = flash[1];
    let learningL = userArray[1];
    if(learningL === 'Spanish'){
      alert("No alphabet for you!");
      var sadcat = new Image();
      sadcat.src = './img/cryingcat.jpeg';
      sadcat.addEventListener('load', function(){
        ctx.drawImage(sadcat, 300, 20);
      }, false)
      return;
    }else {
      setup();
    } 
  }else{
    setup();
  }
}

SetUpCheck();
