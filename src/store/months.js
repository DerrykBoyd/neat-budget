import { auth, db } from "../utils/firebase";
import { writable } from "svelte/store";

export const months = createMonths();

let monthsListener;
export function loadMonths(budgetId) {
  if (monthsListener) {
    console.log("Removing Months Listener");
    monthsListener();
  }
  console.log("Adding Months Listener");
  monthsListener = db
    .collection("budgets")
    .doc(budgetId)
    .collection("months")
    .where("owner", "==", auth.currentUser.uid)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let changedMonth = change.doc.data();
        if (change.type === "removed") months.deleteMonth(changedMonth);
        else months.setMonth(changedMonth);
      });
    });
}

function createMonths() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    update,
    setMonth: (month) =>
      update((months) => {
        months[month.month] = month;
        return months;
      }),
    deleteMonth: (month) =>
      update((months) => {
        delete months[month.month];
        return months;
      }),
    addCategory: (categoryId, monthTimestamp) =>
      update(
        (months) =>
          (months[monthTimestamp].categories[categoryId] = { budgeted: 0, spent: 0, note: "" })
      ),
  };
}

export function setMonth(budgetId, month) {
  db.collection("budgets").doc(budgetId).collection("months").doc(`${month.month}`).set(month);
}

export function newMonth(monthTimestamp) {
  return {
    owner: auth.currentUser.uid,
    month: monthTimestamp,
    note: "",
    income: 0,
    categories: {},
  };
}
