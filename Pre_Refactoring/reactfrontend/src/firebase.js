 import firebase from 'firebase';

// Initialize Firebase/config key
const config = {
  apiKey: "AIzaSyC2-Xuxno2dcbOA7RGV89yOJ_QYqvNL_uo",
  authDomain: "cincogatos-34db5.firebaseapp.com",
  databaseURL: "https://cincogatos-34db5.firebaseio.com",
  projectId: "cincogatos-34db5",
  storageBucket: "cincogatos-34db5.appspot.com",
  messagingSenderId: "821202238986"
};



export const app = firebase.initializeApp(config);
export const ref = firebase.database().ref();
export const fbAuth = firebase.auth;
//Google OAuth popup for logging in
export const googleProvider = new firebase.auth.GoogleAuthProvider();


export default firebase;
