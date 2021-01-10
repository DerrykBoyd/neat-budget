import { writable, derived, readable } from "svelte/store";
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
          snapshot.docChanges().forEach((change) => {
            let budget = change.doc.data();
            budgets.update((newBudgets) => {
              let ind = newBudgets.findIndex((el) => el.id === budget.id);
              if (change.type === "removed") newBudgets.splice(ind, 1);
              else if (ind === -1) newBudgets.push(budget);
              else newBudgets[ind] = budget;
              return newBudgets;
            });
          });
        },
        (error) => console.error(error)
      );
  } else {
    // user logged out remove listener
    if (updateBudgets) updateBudgets();
  }
});

export const createCategory = (groupId, name) => {
  return {
    id: nanoid(),
    groupId,
    name,
    note: "",
    budgeted: 0,
    spent: 0,
    hidden: false,
    deleted: false,
  };
};

const createCategoryGroups = () => {
  const categoryGroups = [
    { id: nanoid(), name: "General Expenses", hidden: false, deleted: false },
    { id: nanoid(), name: "Housing Expenses", hidden: false, deleted: false },
    { id: nanoid(), name: "Transportation Expenses", hidden: false, deleted: false },
    { id: nanoid(), name: "Hobbies & Fun", hidden: false, deleted: false },
    { id: nanoid(), name: "Saving & Retirement", hidden: false, deleted: false },
  ];
  const categories = [
    createCategory(categoryGroups[0].id, "Groceries"),
    createCategory(categoryGroups[0].id, "Cell Phone"),
    createCategory(categoryGroups[0].id, "Cable/Streaming"),
    createCategory(categoryGroups[0].id, "Haircuts"),
    createCategory(categoryGroups[0].id, "Clothing"),
    createCategory(categoryGroups[0].id, "Gifts/Giving"),
    createCategory(categoryGroups[1].id, "Rent/Mortgage"),
    createCategory(categoryGroups[1].id, "Property Tax"),
    createCategory(categoryGroups[1].id, "Home Insurance"),
    createCategory(categoryGroups[1].id, "Electric"),
    createCategory(categoryGroups[1].id, "Heat"),
    createCategory(categoryGroups[1].id, "Water"),
    createCategory(categoryGroups[1].id, "Internet"),
    createCategory(categoryGroups[1].id, "Home Maintenance"),
    createCategory(categoryGroups[2].id, "Car Payment"),
    createCategory(categoryGroups[2].id, "Gas"),
    createCategory(categoryGroups[2].id, "Registration/Tax"),
    createCategory(categoryGroups[2].id, "Car Maintenance"),
    createCategory(categoryGroups[2].id, "Bus Pass/Taxis"),
    createCategory(categoryGroups[3].id, "Dining Out"),
    createCategory(categoryGroups[3].id, "Sports/Fitness"),
    createCategory(categoryGroups[3].id, "Music"),
    createCategory(categoryGroups[3].id, "Fun Money"),
    createCategory(categoryGroups[3].id, "Vacation"),
    createCategory(categoryGroups[4].id, "Emergency Fund"),
    createCategory(categoryGroups[4].id, "Retirement Savings"),
    createCategory(categoryGroups[4].id, "Home Upgrades"),
  ];
  return {
    categoryGroups,
    categories,
  };
};

const createMonths = () => {
  const now = new Date();
  const firstYear = now.getFullYear();
  let month = now.getMonth();
  let months = [];
  // create 100 years of months
  for (let i = 0; i < 120; i++) {
    months.push({
      month: new Date(firstYear, month + i).valueOf(),
      note: "",
      income: 0,
      budgeted: 0,
      spent: 0,
      categories: {},
    });
  }
  return months;
};

export const createBudget = (name, currencyCode = "USD", accounts = []) => {
  let now = new Date();
  const { categoryGroups, categories } = createCategoryGroups();
  const newBudget = {
    id: nanoid(),
    createdTime: Date.now(),
    owner: auth.currentUser.uid,
    sharedWith: [],
    name: name,
    firstMonth: new Date(now.getFullYear(), now.getMonth()).toISOString(),
    lastOpened: Date.now(),
    currencyCode,
    accounts: accounts,
    categoryGroups: categoryGroups,
    categories: categories,
    months: createMonths(),
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

export const accountTypes = readable([
  { name: "Checking", type: "Budget" },
  { name: "Savings", type: "Budget" },
  { name: "Credit Card", type: "Budget" },
  { name: "Cash", type: "Budget" },
  { name: "Line of Credit", type: "Budget" },
  { name: "Mortgage", type: "Tracking" },
  { name: "Investment Account", type: "Tracking" },
  { name: "Other Asset", type: "Tracking" },
  { name: "Other Liability", type: "Tracking" },
]);

export const newAccountBalance = writable(null);
export const newAccountError = writable("");
export const newAccountName = writable("");
export const newAccountType = writable("Checking");
export const selectedAccount = writable(null);
