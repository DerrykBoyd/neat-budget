<script>
  export let currentBudget;
</script>

<style>
  .totals-grid {
    display: grid;
    grid-template-columns: minmax(360px, 1fr);
  }
</style>

<div class="totals-grid divide-y">
  <div class="flex flex-1 justify-between header px-8 py-1 text-gray-600 uppercase text-sm">
    <span>Budgeted</span>
    <span>Spent</span>
    <span>Available</span>
  </div>
  {#each currentBudget?.categoryGroups as group}
    <p class="flex justify-between bg-green-100 py-1 px-8">
      <span>$0.00</span>
      <span>$0.00</span>
      <span>$0.00</span>
    </p>
    {#each currentBudget?.categories as category}
      {#if group?.id === category?.groupId}
        <p class="flex justify-between px-8 py-1">
          <span>$0.00</span>
          <span>$0.00</span>
          <span>$0.00</span>
        </p>
      {/if}
    {/each}
  {/each}
</div>
