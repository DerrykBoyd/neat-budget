<script>
  import Link from "svelte-routing/src/Link.svelte";
  import Button from "../Base/Button.svelte";
  import { defaultBudget } from "../../store/user";
  import Badge from "../Base/Badge.svelte";
  export let budget;
  export let setDefaultBudget;
</script>

<style>
  .budget-card * {
    text-decoration: none;
  }
</style>

<Link to={`/budget/${budget.id}`}>
  <div class="budget-card col-span-1 flex shadow-sm rounded-md h-full">
    <div
      class="flex-shrink-0 flex items-center justify-center w-20 p-4 bg-green-200 text-white text-sm font-medium rounded-l-md">
      <img src="icons/budget-icon.svg" alt="budget icon" />
    </div>
    <div
      class="px-4 py-2 flex-1 flex flex-wrap items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md">
      <div class="flex-grow m-2">
        <p class="text-green-600 text-lg">{budget.name}</p>
        <p class="text-gray-500 hidden sm:block">Some other info</p>
      </div>
      {#if $defaultBudget === budget.id}
        <Badge>Default</Badge>
      {:else}
        <div on:click|preventDefault={() => setDefaultBudget(budget.id)}>
          <Button color="grey" noMargin>Set Default</Button>
        </div>
      {/if}
    </div>
  </div>
</Link>
