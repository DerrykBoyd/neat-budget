import { readable, writable } from "svelte/store";

export const budgets = writable([], () => {
  console.log("got a subscriber to budgets");
  return () => console.log("no more subscribers to budgets");
});

export const createBudget = () => {
  return "This is my new budget";
};
