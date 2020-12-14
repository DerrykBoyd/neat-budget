import { readable, writable } from "svelte/store";
import { auth, ui, uiConfig, db } from "../utils/firebase";

auth.onAuthStateChanged((newUser) => {
  if (newUser) {
    user.set(newUser);
    var updateUser = db
      .collection("users")
      .doc(newUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            dbUser.set(doc.data());
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
    user.set(null);
    if (updateUser) {
      updateUser();
      console.log("Unsub from user");
    }
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});

export const user = writable(null);
export const dbUser = writable(null);
export const loadingUser = writable(false);
