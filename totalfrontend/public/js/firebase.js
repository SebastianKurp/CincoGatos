const fireconfig = {
						apiKey: "AIzaSyC2-Xuxno2dcbOA7RGV89yOJ_QYqvNL_uo",
						authDomain: "cincogatos-34db5.firebaseapp.com",
						databaseURL: "https://cincogatos-34db5.firebaseio.com",
						projectId: "cincogatos-34db5",
						storageBucket: "cincogatos-34db5.appspot.com",
						messagingSenderId: "821202238986"
				};
				firebase.initializeApp(fireconfig);
				let totalapp = firebase.initializeApp(fireconfig, 'totaljs');
				//console.log(totalapp.name); //had to create 2nd initialization

firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
				window.user = user;
				let uId = user.uid;
				firebase.database().ref(`users/`+uId).once('value').then((snapshot) => {
				let nativeLang = snapshot.val().nativeLang;
				let learningLang = snapshot.val().learningLang;
				let authenticated = true;
				})
				}
				else{
					let authenticated = false;
					console.log("No authed user");
				}
});

function regauth(email, pw, nL, lL, useName) {
    native = nL;
    learning = lL;
    name = useName;
    console.log(name + "inside auth");
    return firebase.auth().createUserWithEmailAndPassword(email, pw)
        .then(saveUser);
}

function logout() {
    return firebase.auth().signOut();
}

function login(email, pw) {
    return firebase.auth().signInWithEmailAndPassword(email, pw);
}

function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
}

function saveUser(user) {
    let userId = user.uid;
    let username = name;
    let nativeLang = native;
    let learningLang = learning;
		let ref = firebase.database().ref();
    addUserDetails(userId, username, nativeLang, learningLang);
    return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user);
}

function addUserDetails(userId, username, nativeLang, learningLang){
  //add the user's native and learned lang to firebase
  firebase.database().ref(`users/`+userId).set({
    username: username,
    nativeLang: nativeLang,
    learningLang: learningLang
  });
  firebase.database().ref("premadesets/").once("value").then((snapshot) => {
  //get the generic flashcard set and add to user profile
  let flashsets = snapshot.val();
  firebase.database().ref(`users/`+userId+`/premadesets`).set({
    premadesets: flashsets
  });
});
  firebase.database().ref("alphabets/").once("value").then((snapshot) => {
  //get the generic alphabet set and add to user profile
  let alphabets = snapshot.val();
  firebase.database().ref(`users/`+userId+`/alphabets`).set({
    alphabets: alphabets
    });
  });
}

function getUserDetails(userid){
  return new Promise(
    function(resolve, reject)
    {
    firebase.database().ref(`users/`+userid).once("value").then((snapshot) => {
    let nativeLang = snapshot.val().nativeLang;
    let learningLang = snapshot.val().learningLang;
    let username = snapshot.val().username;
    let langArray = [nativeLang, learningLang, username];
    if(langArray != null){
      resolve(langArray);
    }
    else{
      reject(langArray);
    }
  });

  });
}

function getFlashcards(userid){
  return new Promise(
    function(resolve, reject)
    {
    firebase.database().ref(`users/`+userid+`/premadesets/premadesets`).once("value").then((snapshot) => {
    let animals = snapshot.val().animals;
    let clothing = snapshot.val().clothing;
    let colors = snapshot.val().colors;
    let langArray = [animals, clothing, colors];
    if(langArray != null){
      resolve(langArray);
    }
    else{
      reject(langArray);
    }
  });

  });
}

function getAlphabets(userid){
  return new Promise(
    function(resolve, reject)
    {
      firebase.database().ref(`users/`+userid+`/alphabets/alphabets`).once("value").then((snapshot) =>
    {
      console.log(snapshot.val());
      let arabic = snapshot.val().ar;
      let polish = snapshot.val().pl;
      let japanese = snapshot.val().jp;
      let alpha = [arabic, polish, japanese];
      if(alpha != null){
        resolve(alpha);
      }
      else{
        reject(alpha);
      }
    });
    }
  );
}
/*
document.querySelector('#signUpBtn').addEventListener('click', function(e) {
	console.log("clicked");
	e.preventDefault();
	e.stopPropagation();
	let email = document.querySelector('#email').value;
	let password = document.querySelector('#password').value;
	let username = document.querySelector("#username").value;
	let nativeLang = document.querySelector("#selectNL").value;
	let learningLang = document.querySelector("#selectLL").value;
	console.log(email + " " + password + " " + nativeLang + " " + learningLang);
	//auth (email, pw, nL,lL, useName) {
	regauth(email, password, nativeLang, learningLang, username);
	let auth = firebase.auth();
	let currentUser = auth.currentUser;
	console.log(currentUser);
});
*/