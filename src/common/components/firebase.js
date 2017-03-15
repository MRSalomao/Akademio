import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyClXrgEiEtjNPx2E4Yw9OTfpUqY7UxIfVM",
  authDomain: "liberaakademio.firebaseapp.com",
  databaseURL: "https://liberaakademio.firebaseio.com",
  storageBucket: "liberaakademio.appspot.com",
  messagingSenderId: "416448429310"
});

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const fbNow = firebase.database.ServerValue.TIMESTAMP;

export var user = null;

auth.onAuthStateChanged(newUser => {
  user = newUser;

  if (user) {
    db.ref(`/users/${user.uid}`).transaction(currUser => {
      // if this user is not created yet, sign them up
      if (!currUser) return {
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
        about: '',
        created: fbNow,
        updated: fbNow,
      };
    });
  }
});