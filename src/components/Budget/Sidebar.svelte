<script>
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
    <div class="hover:bg-green-700 p-4 h-14">Budget Link</div>
    <div class="p-4 h-14">All Accounts Link</div>
  </div>
  <div class="sidebar-accounts grid grid-cols-1 overflow-y-auto">
    <div class="p-4">On Budget Accounts</div>
    <button class="ml-4">Add Account</button>
    <div class="p-4">Off Budget Accounts</div>
    <button class="ml-4">Add Account</button>
  </div>
</div>
