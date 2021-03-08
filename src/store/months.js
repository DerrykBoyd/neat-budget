import { auth, db } from "../utils/firebase";
import { writable, get } from "svelte/store";
import currency from "currency.js";

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

export function getCarryOver(monthId) {
  let monthArr = Object.values(get(months));
  let carryOver = 0;
  monthArr.forEach((month) => {
    if (month.month < monthId) {
      const totalSpent = Object.values(month.categories).reduce(
        (spent, category) => (spent += currency(category.spent).value || 0),
        0
      );
      carryOver += month.income - totalSpent;
    }
  });
  return carryOver;
}

export function getBudgeted(monthId) {
  const monthArr = Object.values(get(months)) || [];
  const month = monthArr.find((month) => month.month === monthId);
  let totalBudgeted = 0;
  if (month?.categories) {
    totalBudgeted = Object.values(month?.categories).reduce(
      (budgeted, category) => (budgeted += currency(category.budgeted).value),
      0
    );
  }
  return totalBudgeted;
}

export function getAvailable(monthId) {
  const monthArr = Object.values(get(months)) || [];
  const month = monthArr.find((month) => month.month === monthId);
  let funds = month?.income || 0;
  let available = funds + getCarryOver(monthId) - getBudgeted(monthId);
  return available;
}
