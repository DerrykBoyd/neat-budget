<script>
  import currency from "currency.js";
  import { getBudgeted, getCarryOver, months } from "../../store/months";

  export let nextMonth = false;
  export let budgetName = "";
  export let monthData;
  export let monthId;
  export let shortMonth;
  export let shortPrevMonth;

  $: funds = monthData?.income || 0;
  $: carryOver = getCarryOver(monthData?.month || monthId);
  $: budgeted = getBudgeted(monthData?.month || monthId);
  $: available = funds + carryOver - budgeted;
</script>

<div
  class:nextMonth
  class:currentMonth={!nextMonth}
  class="py-2 sm:h-28 bg-gray-100 hidden sm:flex justify-around items-center px-2"
>
  <div class="hidden sm:flex flex-col text-sm text-gray-600">
    <span>{currency(funds).format()} Funds for {shortMonth}</span>
    <span
      >{currency(carryOver || 0).format()}
      <span>{carryOver < 0 ? "Overspent in" : "Carryover from"}</span>
      {shortPrevMonth}</span
    >
    <span>{currency(budgeted || 0).format()} Budgeted for {shortMonth}</span>
    <!-- <span>{"TODO"} Budgeted for Future</span> -->
  </div>
  <div class="text-green-700 flex flex-col items-center">
    <span class="text-xl text-green-700 sm:hidden text-center">{budgetName}</span>
    <span class="font-medium text-4xl">{currency(available).format()}</span>
    <span>Available to Budget</span>
  </div>
</div>

<style>
  .currentMonth {
    flex: 1 1 600px;
  }
  .nextMonth {
    display: none;
  }
  @media (min-width: 1280px) {
    .nextMonth {
      display: flex;
      width: 375px;
      margin-right: 15px;
    }
  }
</style>
