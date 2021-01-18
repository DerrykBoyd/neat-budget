<script>
  import currency from "currency.js";
  import { setMonth } from "../../store/months";
  import { db } from "../../utils/firebase";
  export let category;
  export let currentBudget;
  export let month;
  export let monthData;
  export let group = false;

  let categoryData = monthData?.categories?.[category.id] || null;
  let budgeted = currency(categoryData?.budgeted || 0);
  let budgetedFormatted;
  $: budgetedFormatted = currency(budgeted);
  let spent = categoryData?.spent || 0;
  let available = budgeted - spent;
</script>

<div class={`${group ? "bg-green-100" : ""} totals-row text-xl sm:text-base`}>
  {#if month === "current"}
    <p class={`${group ? "font-bold" : ""} category`}>{category?.name}</p>
  {/if}
  <div class="totals">
    <div>
      <div class="relative rounded-md">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500">$</span>
        </div>
        <input
          disabled={group}
          type="number"
          step="0.01"
          value={budgetedFormatted}
          on:change={(e) => {
            console.log("change");
            budgeted = e.target.value;
            if (!monthData?.categories) monthData.categories = {};
            if (!monthData?.categories?.[category.id]) monthData.categories[category.id] = {};
            monthData.categories[category.id].budgeted = currency(budgeted);
            setMonth(currentBudget.id, monthData);
          }}
          class={`text-xl sm:text-base focus:ring-green-700 focus:border-green-700 pl-6 py-1 block w-32 bg-transparent rounded-md ${
            group ? "border-transparent" : "hover:border-green-700 sm:border-transparent"
          }`}
        />
      </div>
    </div>
    <span class="budgeted-value">{currency(spent).format()}</span>
    <span class="budgeted-value">{currency(available).format()}</span>
  </div>
</div>

<style lang="scss">
  .totals-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
    @apply text-gray-700;
    @apply px-4;
    @apply py-1;
    & .budgeted-value {
      width: 100px;
      border-radius: 4px;
      padding: 0.25rem 0.5rem;
      background: transparent;
      text-align: center;
      @apply py-2 sm:py-1 align-middle;
    }
    & .category {
      flex: 1 0 240px;
      max-width: 80vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .totals {
      flex: 1 0 260px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;
      @apply py-2 sm:py-1 align-middle;
    }
  }
</style>
