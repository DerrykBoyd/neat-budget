import { debug } from "svelte/internal";
import { readable, writable } from "svelte/store";
import { auth, ui, uiConfig, db } from "utils/firebase";

let updateUser;
auth.onAuthStateChanged((newUser) => {
  if (newUser) {
    localStorage.setItem("loggedIn", "true");
    loadingUser.set(true);
    displayName.set(newUser.displayName);
    photoURL.set(newUser.photoURL);
    userEmail.set(newUser.email);
    updateUser = db
      .collection("users")
      .doc(newUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            let user = doc.data();
            displayName.set(user.displayName);
            photoURL.set(user.photoURL);
            userEmail.set(user.email);
            loadingUser.set(false);
            console.log("User fetched from db");
          } else {
            db.collection("users")
              .doc(newUser.uid)
              .set({
                creationTime: newUser?.metadata?.creationTime || Date.now(),
                email: newUser.email,
                displayName: newUser.displayName,
                photoURL: newUser.photoURL,
                uid: newUser.uid,
              })
              .then(console.log("User added to db"));
          }
        },
        (e) => console.log(e)
      );
  } else {
    localStorage.setItem("loggedIn", "false");
    displayName.set(null);
    photoURL.set(null);
    userEmail.set(null);
    if (updateUser) {
      updateUser();
      console.log("Unsub from user");
    }
  }
});

export const displayName = writable(null);
export const photoURL = writable(null);
export const userEmail = writable(null);
export const loadingUser = writable(false);
