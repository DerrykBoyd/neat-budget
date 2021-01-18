<script>
  import currency from "currency.js";
  import CategoryRow from "./CategoryRow.svelte";

  export let currentBudget;
  export let month;
  export let monthData;

  let totalBudgeted;

  $: totalBudgeted =
    monthData?.categories &&
    Object.values(monthData?.categories).reduce((total, category) => {
      return (total += category.budgeted);
    });
</script>

<div class="totals-grid divide-y">
  <div class="totals-row uppercase">
    {#if month === "current"}
      <p class="category font-bold">Category</p>
    {/if}
    <div class="totals w-full">
      <span class="py-2 sm:py-1 w-32">Budgeted</span>
      <span class="budgeted-value">Spent</span>
      <span class="budgeted-value">Available</span>
    </div>
  </div>
  <div class="totals-row uppercase text-xl sm:text-base">
    {#if month === "current"}
      <p class="category font-bold">Totals</p>
    {/if}
    <div class="totals">
      <div>
        <div class="relative rounded-md">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500">$</span>
          </div>
          <input
            disabled
            type="number"
            step="0.01"
            value={currency(totalBudgeted || 0)}
            class={`text-xl sm:text-base focus:ring-green-700 focus:border-green-700 pl-6 py-1 block w-32 bg-transparent rounded-md border-transparent`}
          />
        </div>
      </div>
      <span class="budgeted-value">{currency(monthData?.spent || 0).format()}</span>
      <span class="budgeted-value"
        >{currency(monthData?.budgeted - monthData?.spent || 0).format()}</span
      >
    </div>
  </div>
  {#each currentBudget?.categoryGroups as group (group.id)}
    <CategoryRow group category={group} {month} {monthData} {currentBudget} />
    {#each currentBudget?.categories as category (category.id)}
      {#if group?.id === category?.groupId}
        <CategoryRow {category} {month} {monthData} {currentBudget} />
      {/if}
    {/each}
  {/each}
</div>

<style lang="scss">
  .totals-grid {
    display: grid;
    width: 100%;
    & .totals-row {
      & .budgeted-value {
        width: 100px;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        background: transparent;
        text-align: center;
        @apply py-2 sm:py-1 align-middle;
      }
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      @apply text-gray-700;
      @apply px-4;
      @apply py-1;
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
  }
</style>
