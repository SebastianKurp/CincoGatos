import { ref, fbAuth } from '../firebase'

export function auth (email, pw) {
  return fbAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
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
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}
