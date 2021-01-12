import { auth, db } from "../utils/firebase";
import { writable } from "svelte/store";
import { nanoid } from "nanoid";

export const transactions = createTransactions();

function createTransactions() {
  const { subscribe, set, update } = writable({});
  return {
    subscribe,
    set,
    update,
    setTransaction: (transaction) =>
      update((transactions) => {
        transactions[transaction.id] = transaction;
        return transactions;
      }),
    deleteTransaction: (transaction) =>
      update((transactions) => {
        delete transactions[transaction.id];
        return transactions;
      }),
  };
}

export function setTransaction(budgetId, transaction) {
  db.collection("budgets")
    .doc(budgetId)
    .collection("transactions")
    .doc(transaction.id)
    .set(transaction);
}

export function createTransaction(data) {
  const { amount, accountId } = data;
  const now = new Date();
  return {
    owner: auth.currentUser.uid,
    id: nanoid(),
    date: now.valueOf(),
    timezoneOffset: now.getTimezoneOffset(),
    note: data.note || "",
    amount: amount,
    accountId: accountId,
    payeeId: data.payeeId || null,
    categoryId: data.categoryId || null,
    transferAccountId: data.transferId || null,
    approved: true,
    cleared: false,
    deleted: false,
    subTransactions: data.subTransactions || [],
  };
}
