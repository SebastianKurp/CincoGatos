import firebase, { ref, fbAuth } from '../firebase'

export function auth (email, pw) {
  return fbAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser);
}

export function logout () {
  return fbAuth().signOut()
}

export function login (email, pw) {
  return fbAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return fbAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  var userId = user.uid;
  var username = "a username from the signup form";
  var nativeLang = "english (from form";
  var learningLang = "japanese (from form)";
  addUserDetails(userId, username, nativeLang, learningLang);
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export function addUserDetails(userId, username, nativeLang, learningLang){
  //add the user's native and learned lang to firebase
  firebase.database().ref(`users/`+userId).set({
    username: username,
    nativeLang: nativeLang,
    learningLang: learningLang
  });
}