<script>
  import CategoryList from "./CategoryList.svelte";

  export let currentBudget;
  export let currentMonth;
  let prevMonth;
  let nextMonth;

  $: shortMonth = currentMonth?.toLocaleString("default", { month: "short" });
  $: prevMonth = new Date(currentMonth?.getFullYear(), currentMonth?.getMonth() - 1);
  $: shortPrevMonth = prevMonth?.toLocaleString("default", { month: "short" });
  $: nextMonth = new Date(currentMonth?.getFullYear(), currentMonth?.getMonth() + 1);
  $: shortNextMonth = nextMonth?.toLocaleString("default", { month: "short" });
</script>

<style>
  .months {
    display: grid;
    grid-template-rows: auto auto 1fr;
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
      width: 450px;
    }
  }
</style>

<div class="months">
  <div class="header flex divide-x">
    <div
      class="current-month bg-green-800 flex justify-center items-center h-14 font-medium text-gray-100">
      {shortMonth}
      {currentMonth?.getFullYear()}
    </div>
    <div
      class="next-month scroll-margin bg-green-800 flex justify-center items-center h-14 font-medium text-gray-100">
      {shortNextMonth}
      {nextMonth.getFullYear()}
    </div>
  </div>
  <div class="summary flex divide-x">
    <div class="current-month h-28 bg-gray-100 month-summary flex justify-around items-center px-2">
      <div class="flex flex-col text-sm text-gray-600">
        <span>$0.00 Funds for {shortMonth}</span>
        <span>$0.00 Overspent for {shortPrevMonth}</span>
        <span>$0.00 Budgeted for {shortMonth}</span>
        <span>$0.00 Budgeted for Future</span>
      </div>
      <div class="text-green-700 flex flex-col items-center">
        <span class="font-medium text-4xl">$1,000</span>
        <span>Available to Budget</span>
      </div>
    </div>
    <div
      class="next-month h-28 scroll-margin bg-gray-100 month-summary flex justify-around items-center px-2">
      <div class="flex flex-col text-sm">
        <span>$0.00 Funds for {shortNextMonth}</span>
        <span>$0.00 Overspent for {shortMonth}</span>
        <span>$0.00 Budgeted for {shortNextMonth}</span>
        <span>$0.00 Budgeted for Future</span>
      </div>
      <div class="text-gray-600 flex flex-col items-center">
        <span class="font-medium text-4xl">$1,000</span>
        <span>Available to Budget</span>
      </div>
    </div>
  </div>
  <div class="categories flex overflow-y-scroll divide-x">
    <div class="current-month flex flex-col">
      <CategoryList {currentBudget} />
    </div>
    <div class="next-month flex flex-col">
      <CategoryList {currentBudget} />
    </div>
  </div>
</div>
