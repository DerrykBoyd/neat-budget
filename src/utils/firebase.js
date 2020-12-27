import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import * as firebaseui from "firebaseui";

const config = {
  apiKey: "AIzaSyAdeW-O6OMacKaEhDwe08TFMpaJaD6G7po",
  authDomain: "budget-app-89e6d.firebaseapp.com",
  projectId: "budget-app-89e6d",
  storageBucket: "budget-app-89e6d.appspot.com",
  messagingSenderId: "1037165621114",
  appId: "1:1037165621114:web:b8fa8dddf4242320b0b0c3",
  measurementId: "G-C2C1GM3TEY",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
db.enablePersistence();
export const functions = firebase.functions();
export const storage = firebase.storage();

export const ui = new firebaseui.auth.AuthUI(auth);
export const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "redirect",
  signInSuccessUrl: "?login=true",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "https://example.com",
  // Privacy policy url.
  privacyPolicyUrl: "https://example.com",
};
