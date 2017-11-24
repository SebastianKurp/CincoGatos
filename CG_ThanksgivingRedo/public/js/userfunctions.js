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
  const ref = firebase.database().ref();
  const fbAuth = firebase.auth;

//Firebase functions
function auth (email, pw, nL,lL, useName) {
    native = nL;
    learning = lL;
    name = useName;
    return fbAuth().createUserWithEmailAndPassword(email, pw)
      .then(saveUser);
  }

function login (email, pw) {
    return fbAuth().signInWithEmailAndPassword(email, pw)
  }

function logout () {
    return fbAuth().signOut()
  }

module.exports.auth = auth;
module.exports.login = login;
module.exports.logout = logout;
module.exports.ref = ref;
module.exports.fbAuth = fbAuth;