import { writable } from "svelte/store";
import { auth, db } from "utils/firebase";

let updateUser;
auth.onAuthStateChanged((newUser) => {
  if (newUser) {
    localStorage.setItem("loggedIn", "true");
    updateUser = db
      .collection("users")
      .doc(newUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            let user = doc.data();
            defaultBudget.set(user.defaultBudget);
            displayName.set(user.displayName);
            photoURL.set(user.photoURL || newUser.photoURL || "");
            userEmail.set(user.email);
            providerData.set(user.providerData || newUser.providerData);
            userLoaded.set(true);
            console.log("User fetched from db");
          } else {
            db.collection("users")
              .doc(newUser.uid)
              .set({
                creationTime: newUser?.metadata?.creationTime || Date.now(),
                defaultBudget: "",
                displayName: newUser.displayName,
                email: newUser.email,
                photoURL: newUser.photoURL,
                uid: newUser.uid,
                providerData: newUser.providerData,
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
    userLoaded.set(false);
    if (updateUser) {
      updateUser();
      console.log("Unsub from user");
    }
    if (window.location.pathname !== "/") window.location.pathname = "/";
  }
});

window.addEventListener("offline", function (e) {
  isOnline.set(false);
});

window.addEventListener("online", function (e) {
  isOnline.set(true);
});

export const userLoaded = writable(false);
export const defaultBudget = writable(null);
export const displayName = writable(null);
export const photoURL = writable(null);
export const userEmail = writable(null);
export const providerData = writable([]);
export const isOnline = writable(navigator.onLine);
