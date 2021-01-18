import { auth, db } from "../utils/firebase";
import { writable } from "svelte/store";

export const months = createMonths();

const budgetsRef = db.collection("budgets");

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
  return budgetsRef.doc(budgetId).collection("months").doc(`${month.month}`).set(month);
}

export function setBudgeted(budgetId, monthId, categoryId, amount) {
  budgetsRef
    .doc(budgetId)
    .collection("months")
    .doc(`${monthId}`)
    .update({
      [`categories.${categoryId}.budgeted`]: amount,
    });
}

export async function newMonth(budgetId, monthTimestamp) {
  const month = {
    owner: auth.currentUser.uid,
    month: monthTimestamp,
    note: "",
    income: 0,
    categories: {},
  };
  await setMonth(budgetId, month);
}
