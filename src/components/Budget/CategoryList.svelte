<script>
  export let currentBudget;
</script>

<style>
  .category-list {
    flex: 1 0 200px;
  }
</style>

<div class="category-list divide-y flex-1">
  <div class="header px-2 py-1 text-gray-600 uppercase text-sm"><span>Category</span></div>
  {#each currentBudget?.categoryGroups as group}
    <p class="bg-green-100 px-2 py-1">{group?.name}</p>
    {#each currentBudget?.categories as category}
      {#if group?.id === category?.groupId}
        <p class="px-2 py-1">{category?.name}</p>
      {/if}
    {/each}
  {/each}
</div>
