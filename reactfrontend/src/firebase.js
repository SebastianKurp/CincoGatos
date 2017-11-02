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
firebase.initializeApp(config);
//Google OAuth popup for logging in
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
