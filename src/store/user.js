import { readable, writable } from "svelte/store";
import { auth, ui, uiConfig } from "../utils/firebase";

auth.onAuthStateChanged((newUser) => {
  if (newUser) {
    user.set(newUser);
  } else {
    user.set(null);
    ui.start("#firebaseui-auth-container", uiConfig);
  }
});

export const user = writable(null);

export const loadingUser = writable(false);
