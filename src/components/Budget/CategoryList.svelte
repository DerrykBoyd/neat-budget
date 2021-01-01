<script>
  export let currentBudget;
</script>

<style>
</style>

<div class="category-list divide-y">
  {#each currentBudget?.categoryGroups as group}
    <p class="bg-green-100 p-2">{group?.name}</p>
    {#each currentBudget?.categories as category}
      {#if group?.id === category?.groupId}
        <p class="px-2 py-1">- {category?.name}</p>
      {/if}
    {/each}
  {/each}
</div>
