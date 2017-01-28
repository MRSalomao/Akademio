import React from 'react';
import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyClXrgEiEtjNPx2E4Yw9OTfpUqY7UxIfVM",
    authDomain: "liberaakademio.firebaseapp.com",
    databaseURL: "https://liberaakademio.firebaseio.com",
    storageBucket: "liberaakademio.appspot.com",
    messagingSenderId: "416448429310"
});

export const provider = new firebase.auth.GoogleAuthProvider();

export default ({children}) => {
  return (
    <div id="container">
      {children}
    </div>
  );
};
