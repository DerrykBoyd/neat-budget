<script>
  import Button from "../Base/Button.svelte";

  export let currentBudget;
</script>

<style>
  .sidebar {
    display: none;
  }
  .sidebar-top {
    min-height: 56px;
    max-height: 56px;
    overflow: hidden;
  }
  .sidebar-link {
    @apply px-4 py-2;
    cursor: pointer;
  }
  .sidebar-link:hover {
    @apply bg-green-700;
  }
  @media (min-width: 1024px) {
    .sidebar {
      display: flex;
      flex-direction: column;
    }
  }
</style>

<div class="sidebar bg-green-600 h-full divide-y text-gray-200">
  <div class="sidebar-top bg-green-800 px-4 flex items-center font-medium">
    {currentBudget.name}
  </div>
  <div class="sidebar-links">
    <div class="sidebar-link">Budget Link</div>
    <div class="sidebar-link">All Accounts Link</div>
  </div>
  <div class="sidebar-accounts grid grid-cols-1 overflow-y-auto">
    <div class="px-4 pt-2 pb-1 underline font-medium">On Budget Accounts</div>
    {#each currentBudget.accounts as account}
      {#if account.onBudget}
        <div class="sidebar-link">{account.name}</div>
      {/if}
    {/each}
    <div class="px-4">
      <Button inverted color="white">+ Add Account</Button>
    </div>
    <div class="px-4 pt-2 pb-1 underline font-medium">Off Budget Accounts</div>
    <div class="px-4">
      <Button inverted color="white">+ Add Account</Button>
    </div>
  </div>
</div>
