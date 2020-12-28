<script>
  import Button from "../Base/Button.svelte";
  import { defaultBudget } from "../../store/user";
  import Badge from "../Base/Badge.svelte";

  export let toggleModal;
</script>

<style>
</style>

<div
  on:click={toggleModal}
  class="budget-card col-span-1 flex shadow-sm rounded-md h-full cursor-pointer">
  <div
    class="flex-shrink-0 flex items-center justify-center w-20 p-4 bg-green-200 text-white text-sm font-medium rounded-l-md">
    <img src="icons/add-budget-icon.svg" alt="budget icon" />
  </div>
  <div
    class="px-4 py-2 flex-1 flex flex-wrap items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
    <div class="flex-grow m-2">
      <p class="text-green-600 text-lg">Add a new budget</p>
    </div>
  </div>
</div>
