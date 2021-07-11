import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

   const firebaseConfig = {
    apiKey: "AIzaSyD3PggYt24J8tWRvNc3Jj6reIT3qPpcm4A",
    authDomain: "splash-10.firebaseapp.com",
    projectId: "splash-10",
    storageBucket: "splash-10.appspot.com",
    messagingSenderId: "507432842493",
    appId: "1:507432842493:web:d0efd843444a9d89317a94",
    measurementId: "G-TXZ2GEH4KS"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth;
  export const firestore = firebase.firestore;
