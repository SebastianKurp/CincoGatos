var firebase = require('firebase');

//Initialize Firebase
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

// Most of the functions on here are honestly pretty standard from the Firebase docs
function auth (email, pw, nL,lL, useName) {
    native = nL;
    learning = lL;
    name = useName;
    return fbAuth().createUserWithEmailAndPassword(email, pw).then(saveUser);
  }

function login (email, pw) {
    return fbAuth().signInWithEmailAndPassword(email, pw)
}

function logout () {
    return fbAuth().signOut()
  }

function resetPassword (email) {
    return fbAuth().sendPasswordResetEmail(email)
  }

  /* The only noteworthy thing about this function is that it calls addUserDetails when
   saving the user to Firebase */
function saveUser (user) {
    var userId = user.uid;
    var username = name;
    var nativeLang = native;
    var learningLang = learning;
  
    addUserDetails(userId, username, nativeLang, learningLang);
    return ref.child(`users/${user.uid}/info`)
      .set({
        email: user.email,
        uid: user.uid
      })
      .then(() => user)
  }
  
/*
This function was not in the docs it's pretty important for the app to work properly
When the user is saved to Firebase we add all the default flashcard sets to their profile
Their 'learningLang' determines which one they see, but if that were to be changed
they would already have the other languges preloaded and if they switched back to the old
language their scores would still be there.
*/
function addUserDetails(userId, username, nativeLang, learningLang){
    //add the user's native and learned lang to firebase
    firebase.database().ref(`users/`+userId).set({
      username: username,
      nativeLang: nativeLang,
      learningLang: learningLang
    });
    firebase.database().ref('premadesets/').once('value').then((snapshot) => {
    //get the generic flashcard set and add to user profile
    var flashsets = snapshot.val();
    firebase.database().ref(`users/`+userId+`/premadesets`).set({
      premadesets: flashsets
    })
  })
    firebase.database().ref('alphabets/').once('value').then((snapshot) => {
    //get the generic alphabet set and add to user profile
    var alphabets = snapshot.val();
    firebase.database().ref(`users/`+userId+`/alphabets`).set({
      alphabets: alphabets
      })
    })
  }

/* I hate redundant code. This is here so that the server side can also use these functions
A more full refactoring would wipe them. The details on getUserDetails, getFlashcards,
getAlphabets, and getCards are in clientFirebase.js
*/
function getUserDetails(userid){
    return new Promise(
      async function(resolve, reject)
      {
      var user = await firebase.auth().currentUser;
      firebase.database().ref(`users/`+userid).once('value').then((snapshot) => {
      console.log("Getting user details");
      var nativeLang = snapshot.val().nativeLang;
      var learningLang = snapshot.val().learningLang;
      var username = snapshot.val().username;
      var langArray = [nativeLang, learningLang, username];
      console.log("Retrieved user details");
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
      var user = await firebase.auth().currentUser;
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
      console.log("Retrieved flashcards");
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
        console.log("Retrieved alphabets");
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

async function getCards(userid){
    let flashArray = await getFlashcards(userid);
    let langArray = await getUserDetails(userid);
    let alpharay = await getAlphabets(userid);
      return [flashArray, langArray, alpharay];
  };

module.exports.auth = auth;
module.exports.login = login;
module.exports.logout = logout;
module.exports.ref = ref;
module.exports.fbAuth = fbAuth;
module.exports.resetPassword = resetPassword;
module.exports.getUserDetails = getUserDetails;
module.exports.getCards = getCards;
