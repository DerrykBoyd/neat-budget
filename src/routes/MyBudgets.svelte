<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { displayName } from "../store/user";
  import { sortedBudgets, createBudget } from "../store/budgets";
  import Loader from "../components/Base/Loader.svelte";
  import Button from "../components/Base/Button.svelte";
  import { db } from "../utils/firebase";
  import Input from "../components/Base/Input.svelte";
  import InfoMessage from "../components/Base/InfoMessage.svelte";
  import Link from "svelte-routing/src/Link.svelte";

  currentPath.set("/settings");
  // redirect to home if not logged in.
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });

  export let budgetName = "";
  export let budgetNameError = "";

  function addBudget() {
    if (!budgetName) {
      budgetNameError = "Add a budget name";
      return;
    }
    budgetNameError = "";
    let newBudget = createBudget(budgetName);
    db.collection("budgets").add(newBudget);
    budgetName = "";
  }
</script>

<style>
  /* your styles go here */
</style>

{#if loggedIn}
  {#if !$displayName}
    <Loader color="grey" />
  {:else}
    <Input
      bind:value={budgetName}
      name="budget-name"
      placeholder="name"
      label="New Budget"
      onEnter={addBudget} />
    {#if budgetNameError}
      <InfoMessage icon="error" color="red-800">{budgetNameError}</InfoMessage>
    {/if}
    <Button handleClick={() => addBudget('newBudget')}>Add Budget</Button>
    {#if !$sortedBudgets.length}
      <div>Looks like you don't have any budgets yet. Lets create one.</div>
    {:else}
      {#each $sortedBudgets as budget}
        <Link to={`budget/${budget.id}`}>
          <div>{budget.name}</div>
        </Link>
        <div>{budget.id}</div>
        <div>{budget.createdTime}</div>
      {/each}
    {/if}
  {/if}
{:else}
  <!-- Not logged in -->
  <div>You must be logged in to view your budgets.</div>
{/if}
