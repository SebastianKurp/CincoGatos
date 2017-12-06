//we store the link the user clicks on main canvas in localstorage
//and then retrieve it here
let link = localStorage["datadata"];
localStorage.removeItem("datadata"); //clear out so can be used again


//before anything else we need to get hooks in our canvas
//and declare global vars that we will be continually reassigning as the canvas
//moves and user data updates in different functions
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var frame = 0, card, otherColor = [255,255,255], startFlipFrame;
var buttons, bars, mouseX = 0, mouseY = 0, keyPresses, mouseDown = false, clickBuffer = "None", 
  clickedNext = false, answer = 0, complete = false, currentQuestion, 
  currentAnswer, options, color, cardSet, currCard, langset, baseColor, 
  userArray, currSet, language, cardBatch = 0, userId;
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

//setup the canvas. Prior to this it is just loading cat
//this function initializes the canvas listens for the user's movements on the canvas
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
  document.getElementById("loadingcat").remove();
}

/*
fun stuff. we determine what cardset the user wants, we get the user's info
off firebase and we setcards (choose the vocab word)
to display on the flashcard & create 'bars' for the choice of answers to
be displayed on
*/
async function initialize()
{
  console.log("Initialize is called");
  color = [255,255,255];
  card = new Card(0,0,0,0,0,0,0,0);

  cardSet =  await getCardSet(); 
  langset = await getLang(); 
  currCard = await setCards(); 
  card = new Card(0.5, 0.3, 0.3, 0.2, 50, color, currentQuestion, 0, 5);
  var color1 = "rgb(" + baseColor[0] + ',' + baseColor[1] + ',' + baseColor[2] + ')';
  var color2 = "rgb(" + Math.floor((baseColor[0] + 0) / 2)  + ',' + Math.floor((baseColor[1] + 0) / 2) + ',' + Math.floor((baseColor[2] + 0) / 2) + ')';
  bars =  [
        new Bar(0.5, 0.65, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option1", "Option 1", "rgb(255,255,255)"),
        new Bar(0.5, 0.75, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option2", "Option 2", "rgb(255,255,255)"),
        new Bar(0.5, 0.85, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option3", "Option 3", "rgb(255,255,255)"),
        new Bar(0.5, 0.95, 0.3, 0.0375, color1, color2, "rgb(0,0,0)", 6, "./option4", "Option 4", "rgb(255,255,255)")
  ];
  buttons = [
    new CircleButton(0.9, 0.9, 0.07, 0.09, "rgb(100,100,100)", "rgb(150,150,150)", "rgb(0,0,0)", 6, "None", "./next", "Next", "rgb(0,0,0)")
  ];
}

/*we want to display the appropriate card set depending on
which link they clicked. This function also changes the background color
of the page based on that choice
*/
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

//the Next button you see is made from this
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

//the answers below the flashcard are created by this
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
    cardBatch++;
    console.log("# of cards practiced " + cardBatch);
    complete = true;
    if (!card.isFlipping)
    {
      startFlipFrame = frame;
      if (currentAnswer === options[answer-1]) 
      {
        color = [150,255,150];
        if(cardSet === 7){
          //if alphabet cards & correct answer
          console.log(currSet[language][currCard]);
          if(currSet[language][currCard][1] < 5){
            currSet[language][currCard][1] += 1;
            card.val = currSet[language][currCard][1];
          }
        }
        else{
          //reg set & right answer
          if (langset[3][cardSet][langset[0]][currCard][1] < 5){
            langset[3][cardSet][langset[0]][currCard][1] += 1;
            card.val = langset[3][cardSet][langset[0]][currCard][1];
          }
        }
      }
         else { //else for 'wrong answer'
          if(cardSet === 7){
            //alphabet & wrong answer
              color = [255,150,150];
              if(currSet[language][currCard][1] > 0){
                currSet[language][currCard][1] -= 1;
                card.val = currSet[language][currCard][1];
              }
            }
            else
            {
              //reg set & wrong answer
              color = [255,150,150];
              if (langset[3][cardSet][langset[0]][currCard][1] > 0)
              {
                langset[3][cardSet][langset[0]][currCard][1] -= 1;
                card.val = langset[3][cardSet][langset[0]][currCard][1];
              }
          }
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
  switch(userArray[1]){
    case 'Spanish':
      language = 'sp';
      break;
    case 'Japanese':
      language = 'jp';
      break;
    case 'Arabic':
      language = 'ar';
      break;
    case 'Polish':
      language = 'pl';
      break;
    default:
      console.log("Something broke");
  }
  return [language, userArray, alpha, flashcards, username, nativeL, learningL];
}

async function setCards()
{
  var userArray = langset[1];
  var alpha = langset[2];
  var flashcards = langset[3];
  var username = langset[4];
  var nativeL = langset[5];
  var learningL = langset[6];
  var language = langset[0];

  currSet = 'None';
  if(cardSet === 7){
    if(language === 'ar'){
      currSet = alpha[0];
    }
    else if(language === 'pl'){
      currSet = alpha[1];
    }
    else if(language === 'jp'){
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
  var l = currSet[language].length;
  var r = Math.floor((Math.random() * l) + 1) - 1;

  var cardIndex = r;
  currentQuestion = currSet[language][r][0];
  card.val = currSet[language][r][1];
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
   userArray = flash[1];
   console.log(userArray + " user array");
   alpha = flash[2];
   flashcards = flash[0];
   userId = flash[3];
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
      document.getElementById("loadingcat").remove();      
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
