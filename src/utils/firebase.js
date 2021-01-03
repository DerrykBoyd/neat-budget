import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import * as firebaseui from "firebaseui";

const production = process.env.NODE_ENV === "production";
const netlify = process.env.NETLIFY === "true";

console.log(process.env.FIREBASE_API_KEY_DEV);

const config = netlify
  ? {
      apiKey: JSON.stringify(process.env.FIREBASE_API_KEY_DEV),
      authDomain: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN_DEV),
      projectId: JSON.stringify(process.env.FIREBASE_PROJECT_ID_DEV),
      storageBucket: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET_DEV),
      messagingSenderId: JSON.stringify(process.env.FIREBASE_MESSAGING_ID_DEV),
      appId: JSON.stringify(process.env.FIREBASE_APP_ID_DEV),
      measurementId: JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID_DEV),
    }
  : {
      apiKey: production ? _process.env.FIREBASE_API_KEY : _process.env.FIREBASE_API_KEY_DEV,
      authDomain: production
        ? _process.env.FIREBASE_AUTH_DOMAIN
        : _process.env.FIREBASE_AUTH_DOMAIN_DEV,
      projectId: production
        ? _process.env.FIREBASE_PROJECT_ID
        : _process.env.FIREBASE_PROJECT_ID_DEV,
      storageBucket: production
        ? _process.env.FIREBASE_STORAGE_BUCKET
        : _process.env.FIREBASE_STORAGE_BUCKET_DEV,
      messagingSenderId: production
        ? _process.env.FIREBASE_MESSAGING_ID
        : _process.env.FIREBASE_MESSAGING_ID_DEV,
      appId: production ? _process.env.FIREBASE_APP_ID : _process.env.FIREBASE_APP_ID_DEV,
      measurementId: production
        ? _process.env.FIREBASE_MEASUREMENT_ID
        : _process.env.FIREBASE_MEASUREMENT_ID_DEV,
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
