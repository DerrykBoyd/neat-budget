<script>
  import currency from "currency.js";
  import { newMonth, setBudgeted, setMonth } from "../../store/months";
  import { db } from "../../utils/firebase";
  export let category;
  export let currentBudget;
  export let month;
  export let monthData;
  export let group = false;
  export let monthTimeStamp;

  let categoryData;
  let budgeted;
  let budgetedFormatted;
  let spent;
  let available;

  $: categoryData = monthData?.categories?.[category.id] || null;
  $: budgeted = currency(categoryData?.budgeted || 0);
  $: budgetedFormatted;
  $: budgetedFormatted = currency(budgeted);
  $: spent = categoryData?.spent || 0;
  $: available = budgeted - spent;
</script>

<div class={`${group ? "bg-green-100" : ""} totals-row text-xl sm:text-base`}>
  {#if month === "current"}
    <p class={`${group ? "font-bold" : ""} category h-8 sm:h-6`}>{category?.name}</p>
  {/if}
  {#if !group}
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
            on:change={async (e) => {
              console.log("change");
              budgeted = e.target.value;
              if (!monthData) await newMonth(currentBudget.id, monthTimeStamp);
              if (!monthData?.categories) monthData.categories = {};
              if (!monthData?.categories?.[category.id]) monthData.categories[category.id] = {};
              monthData.categories[category.id].budgeted = currency(budgeted);
              setBudgeted(currentBudget.id, monthData.month, category.id, budgeted);
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
  {:else if month !== "current"}
    <p class={`category h-8 sm:h-6`} />
  {/if}
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
