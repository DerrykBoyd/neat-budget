import { writable, derived } from "svelte/store";
import { nanoid } from "nanoid";
import { auth, db } from "../utils/firebase";

// load the budgets from firestore if there are any
let updateBudgets;
auth.onAuthStateChanged((currentUser) => {
  if (currentUser) {
    // user logged in
    // load new updates from firestore and add listener
    updateBudgets = db
      .collection("budgets")
      .where("owner", "==", currentUser.uid)
      .onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            let budget = doc.data();
            budgets.update((budgets) => {
              let ind = budgets.findIndex((el) => el.id === budget.id);
              if (ind === -1) budgets.push(budget);
              else budgets[ind] = budget;
              return budgets;
            });
          });
        },
        (error) => console.error(error)
      );
  } else {
    // user logged out remove listener
    updateBudgets();
  }
});

export const createBudget = (name) => {
  let now = new Date();
  const newBudget = {
    id: nanoid(),
    createdTime: Date.now(),
    owner: auth.currentUser.uid,
    name: name,
    firstMonth: new Date(now.getFullYear(), now.getMonth()).toISOString(),
    accounts: [],
    categories: [],
    months: [],
  };
  return newBudget;
};

export const budgets = writable([], () => {
  console.log("got a subscriber to budgets");
  return () => console.log("no more subscribers to budgets");
});

export const sortedBudgets = derived(budgets, ($budgets) =>
  $budgets.sort((a, b) => a.createdTime - b.createdTime)
);
