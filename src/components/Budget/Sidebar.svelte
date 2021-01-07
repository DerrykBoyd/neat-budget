<script>
  export let currentBudget;
</script>

<style lang="scss">
  .sidebar {
    display: none;
  }
  .sidebar-top {
    min-height: 56px;
    max-height: 56px;
    overflow: hidden;
  }
  .sidebar-link {
    @apply cursor-pointer p-4 h-14;
    &:hover {
      @apply bg-green-700;
    }
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
    <div class="sidebar-link">On Budget Accounts</div>
    <div class="sidebar-link">Add Account</div>
    <div class="sidebar-link">Off Budget Accounts</div>
    <div class="sidebar-link">Add Account</div>
  </div>
</div>
