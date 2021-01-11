import { db } from "../utils/firebase";
import { writable } from "svelte/store";

export const months = createMonths();

function createMonths() {
  const { subscribe, set, update } = writable({
    1609484400000: newMonth(1609484400000),
    1612162800000: newMonth(1612162800000),
  });
  return {
    subscribe,
    set,
    update,
    addMonth: (month) =>
      update((months) => {
        months[month.month] = month;
        return months;
      }),
    addCategory: (categoryId, monthTimestamp) =>
      update(
        (months) =>
          (months[monthTimestamp].categories[categoryId] = { budgeted: 0, spent: 0, note: "" })
      ),
  };
}

export function newMonth(monthTimestamp) {
  return {
    month: monthTimestamp,
    note: "",
    income: 100,
    budgeted: 50,
    spent: 110,
    categories: {},
  };
}
