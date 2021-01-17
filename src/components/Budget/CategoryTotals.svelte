<script>
  import currency from "currency.js";
  import CategoryRow from "./CategoryRow.svelte";

  export let currentBudget;
  export let month;
  export let monthData;
</script>

<style lang="scss">
  .totals-grid {
    display: grid;
    width: 100%;
    & .totals-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      @apply text-gray-700;
      @apply px-4;
      @apply py-2;
      & .category {
        flex: 1 0 240px;
        max-width: 80vw;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .totals {
        flex: 1 0 260px;
        display: flex;
        justify-content: space-between;
        @apply py-2 sm:py-1;
      }
    }
  }
</style>

<div class="totals-grid divide-y">
  <div class="totals-row uppercase text-base sm:text-sm">
    {#if month === 'current'}
      <p class="category font-bold">Category</p>
    {/if}
    <div class="totals">
      <p>Budgeted</p>
      <p>Spent</p>
      <p>Available</p>
    </div>
  </div>
  <div class="totals-row uppercase text-base sm:text-sm">
    {#if month === 'current'}
      <p class="category font-bold">Totals</p>
    {/if}
    <div class="totals font-bold">
      <p>{currency(monthData?.budgeted || 0).format()}</p>
      <p>{currency(monthData?.spent || 0).format()}</p>
      <p>{currency(monthData?.budgeted - monthData?.spent || 0).format()}</p>
    </div>
  </div>
  {#each currentBudget?.categoryGroups as group (group.id)}
    <CategoryRow group category={group} {month} {monthData} />
    {#each currentBudget?.categories as category (category.id)}
      {#if group?.id === category?.groupId}
        <CategoryRow {category} {month} {monthData} />
      {/if}
    {/each}
  {/each}
</div>
