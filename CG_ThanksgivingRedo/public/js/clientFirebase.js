var config = {
  apiKey: "AIzaSyC2-Xuxno2dcbOA7RGV89yOJ_QYqvNL_uo",
  authDomain: "cincogatos-34db5.firebaseapp.com",
  databaseURL: "https://cincogatos-34db5.firebaseio.com",
  projectId: "cincogatos-34db5",
  storageBucket: "cincogatos-34db5.appspot.com",
  messagingSenderId: "821202238986"
};
firebase.initializeApp(config);
//firebase.enableLogging(true);
const ref = firebase.database().ref();
const fbAuth = firebase.auth;

function getUserDetails(userid){
  return new Promise(
    async function(resolve, reject)
    {
  //  var user = await firebase.auth().currentUser;
    firebase.database().ref(`users/`+userid).once('value').then((snapshot) => {
    console.log("Getting user details");
    var nativeLang = snapshot.val().nativeLang;
    var learningLang = snapshot.val().learningLang;
    var username = snapshot.val().username;
    var langArray = [nativeLang, learningLang, username];
    if(langArray != null){
      resolve(langArray)
    }
    else{
      reject(langArray);
    }
  })
  })
}

function getFlashcards(userid){
  return new Promise(
    async function(resolve, reject)
    {
  //  var user = await firebase.auth().currentUser;
  //  console.log("Flashcards: Uid is "+ user.uid);
    firebase.database().ref(`users/`+userid+`/premadesets/premadesets`).once('value').then((snapshot) => {
    console.log("Getting flashcards");
    var animals = snapshot.val().animals;
    var clothing = snapshot.val().clothing;
    var colors = snapshot.val().colors;
    var foods = snapshot.val().foods;
    var household = snapshot.val().household;
    var school = snapshot.val().school;
    var numbers = snapshot.val().numbers;
    var langArray = [animals, clothing, colors, foods, household, school, numbers];
    if(langArray != null){
      resolve(langArray);
    }
    else{
      reject(langArray);
    }
  })

  })
}

function getAlphabets(userid){
  return new Promise(
    async function(resolve, reject)
    {
      var user = await firebase.auth().currentUser;
      firebase.database().ref(`users/`+userid+`/alphabets/alphabets`).once('value').then((snapshot) =>
    {
      console.log("Getting alphabets");
      var arabic = snapshot.val().ar;
      var polish = snapshot.val().pl;
      var japanese = snapshot.val().jp;
      var alpha = [arabic, polish, japanese];
      console.log(alpha);
      if(alpha != null){
        resolve(alpha);
      }
      else{
        reject(alpha);
      }
    })
    }
  )
}


//used to be fed userid as param
async function getCards(){
  return new Promise(
    async function(resolve, reject){
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        var user = firebase.auth().currentUser;
        console.log("Heard user");
        console.log(user.uid);
        userid = user.uid;
        let flashArray = await getFlashcards(userid);
        let langArray = await getUserDetails(userid);
        let alpharay = await getAlphabets(userid);
        //return [flashArray, langArray, alpharay];
        let flash = [flashArray, langArray, alpharay, userid];
        if(flash != null){
          resolve(flash);
        }
        else{
          reject(flash);
        }
    }
    else{
      console.log('Listening client side...');
    }
  })
    })
  };

  function clientLog(){
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    console.log(email);
    console.log(pass);
     fbAuth().signInWithEmailAndPassword(email, pass);
     firebase.auth().onAuthStateChanged(async function(user) {
       if (user) {
           var user = firebase.auth().currentUser;
       }
       else{
         console.log('Listening client side...');
       }
     })
  }

