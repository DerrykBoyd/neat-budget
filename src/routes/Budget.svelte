<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { displayName } from "../store/user";
  import { budgets } from "../store/budgets";
  import Loader from "../components/Base/Loader.svelte";
  import Button from "../components/Base/Button.svelte";

  export let id;
  let budget = $budgets.find((budget) => budget.id === id);
  currentPath.set("/budget");
  // redirect to home if not logged in.
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });
</script>

<style>
  /* your styles go here */
</style>

{#if loggedIn}
  {#if !$displayName}
    <Loader color="grey" />
  {:else if !$budget}
    <div>Budget not found</div>
  {:else}
    {#each $budgets as budget}
      <div>{budget.id}</div>
    {/each}
  {/if}
{:else}
  <!-- Not logged in -->
  <div>You must be logged in to view your budgets.</div>
{/if}
