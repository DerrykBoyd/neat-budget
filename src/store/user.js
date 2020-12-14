import { debug } from "svelte/internal";
import { readable, writable } from "svelte/store";
import { auth, ui, uiConfig, db } from "utils/firebase";

let updateUser;
auth.onAuthStateChanged((newUser) => {
  if (newUser) {
    loadingUser.set(true);
    user.set(newUser);
    updateUser = db
      .collection("users")
      .doc(newUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            dbUser.set(doc.data());
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
    user.set(null);
    dbUser.set(null);
    if (updateUser) {
      updateUser();
      console.log("Unsub from user");
    }
  }
});

export const user = writable(null);
export const dbUser = writable(null);
export const loadingUser = writable(false);
