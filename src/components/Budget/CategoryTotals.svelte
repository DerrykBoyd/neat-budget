<script>
  export let currentBudget;
  export let month;
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
      @apply text-gray-700 px-4 py-2;
      & .category {
        flex: 1 0 240px;
        @apply py-2 sm:py-1;
      }
      & .totals {
        flex: 1 0 260px;
        @apply py-2 sm:py-1;
        display: flex;
        justify-content: space-evenly;
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
  {#each currentBudget?.categoryGroups as group}
    <div class="totals-row bg-green-100 text-xl sm:text-base">
      {#if month === 'current'}
        <p class="category bg-green-100 font-bold">{group?.name}</p>
      {/if}
      <div class="totals"><span>$0.00</span> <span>$0.00</span> <span>$0.00</span></div>
    </div>
    {#each currentBudget?.categories as category}
      {#if group?.id === category?.groupId}
        <div class="totals-row text-xl sm:text-base">
          {#if month === 'current'}
            <p class="category">{category?.name}</p>
          {/if}
          <div class="totals"><span>$0.00</span> <span>$0.00</span> <span>$0.00</span></div>
        </div>
      {/if}
    {/each}
  {/each}
</div>
