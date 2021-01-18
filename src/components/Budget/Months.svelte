<script>
  import ArrowButton from "../Base/ArrowButton.svelte";
  import CategoryTotals from "./CategoryTotals.svelte";
  import { months, loadMonths } from "../../store/months";
  import currency from "currency.js";
  import MonthSummary from "./MonthSummary.svelte";

  export let currentBudget;

  $: if (currentBudget) loadMonths(currentBudget.id);
  const availableMonths = currentBudget.availableMonths;
  const now = new Date();
  let currentMonth = new Date(now.getFullYear(), now.getMonth());
  let currentMonthIndex = currentBudget?.availableMonths?.findIndex(
    (month) => month === currentMonth.valueOf()
  );

  $: console.log({ currentBudget }); // log the state
  $: console.log({ $months }); // log the state

  $: currentMonth = new Date(availableMonths[currentMonthIndex]);
  $: shortCurrentMonth = currentMonth?.toLocaleString("default", { month: "short" });
  $: prevMonth = new Date(currentMonth?.getFullYear(), currentMonth?.getMonth() - 1);
  $: shortPrevMonth = prevMonth?.toLocaleString("default", { month: "short" });
  $: nextMonth = new Date(currentMonth?.getFullYear(), currentMonth?.getMonth() + 1);
  $: shortNextMonth = nextMonth?.toLocaleString("default", { month: "short" });

  $: prevMonthData = $months[prevMonth.valueOf()] || null;
  $: currentMonthData = $months[currentMonth.valueOf()] || null;
  $: currentMonthCarryover = prevMonthData?.income - prevMonthData?.spent || 0;
  $: currentMonthAvailable =
    currentMonthData?.income + currentMonthCarryover - currentMonthData?.budgeted || 0;
  $: nextMonthData = $months[nextMonth.valueOf()] || null;
  $: nextMonthCarryover = currentMonthData?.income - currentMonthData?.spent || 0;
  $: nextMonthAvailable = nextMonthData?.income + nextMonthCarryover - nextMonthData?.budgeted || 0;

  function switchMonth(ind) {
    if (ind < 0 || ind > availableMonths.length) return;
    currentMonthIndex = ind;
  }
</script>

<div class="months">
  <div class="header flex divide-x">
    <div
      class="current-month bg-green-800 flex justify-center items-center h-14 font-medium text-gray-100"
    >
      <ArrowButton
        handleClick={() => switchMonth(currentMonthIndex - 1)}
        direction="left"
        disabled={currentMonthIndex === 0}
      />
      <div class="month-text">{shortCurrentMonth} {currentMonth?.getFullYear()}</div>
      <ArrowButton
        handleClick={() => switchMonth(currentMonthIndex + 1)}
        direction="right"
        disabled={currentMonthIndex === availableMonths.length}
      />
    </div>
    <div
      class="next-month scroll-margin bg-green-800 flex justify-center items-center h-14 font-medium text-gray-100"
    >
      {shortNextMonth}
      {nextMonth?.getFullYear()}
    </div>
  </div>
  <div class="summary flex divide-x">
    <MonthSummary
      budgetName={currentBudget.name}
      monthData={currentMonthData}
      carryOver={currentMonthCarryover}
      available={currentMonthAvailable}
      shortMonth={shortCurrentMonth}
      {shortPrevMonth}
    />
    <MonthSummary
      nextMonth
      monthData={nextMonthData}
      carryOver={nextMonthCarryover}
      available={nextMonthAvailable}
      shortMonth={shortNextMonth}
      shortPrevMonth={shortCurrentMonth}
    />
  </div>
  <div class="categories flex flex-col sm:flex-row overflow-y-scroll divide-x">
    <div class="text-green-700 sm:hidden flex flex-col items-center">
      <span class="text-xl text-green-700 sm:hidden text-center">{currentBudget.name}</span>
      <span class="font-medium text-4xl">{currency(currentMonthAvailable).format()}</span>
      <span>Available to Budget</span>
    </div>
    <div class="current-month flex">
      <CategoryTotals {currentBudget} month="current" monthData={currentMonthData} />
    </div>
    <div class="next-month flex flex-col">
      <CategoryTotals {currentBudget} month="next" monthData={nextMonthData} />
    </div>
  </div>
</div>

<style>
  .months {
    display: grid;
    grid-template-rows: auto auto 1fr;
  }
  .month-text {
    min-width: 200px;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
  }

  .current-month {
    flex: 1 1 600px;
  }
  .next-month {
    display: none;
  }
  .scroll-margin {
    margin-right: 15px;
  }
  @media (min-width: 1280px) {
    .next-month {
      display: flex;
      width: 360px;
    }
  }
</style>
