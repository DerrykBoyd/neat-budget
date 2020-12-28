<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { displayName, defaultBudget } from "../store/user";
  import { sortedBudgets, createBudget } from "../store/budgets";
  import Loader from "../components/Base/Loader.svelte";
  import Button from "../components/Base/Button.svelte";
  import { auth, db } from "../utils/firebase";
  import Input from "../components/Base/Input.svelte";
  import InfoMessage from "../components/Base/InfoMessage.svelte";
  import Link from "svelte-routing/src/Link.svelte";
  import BudgetCard from "../components/MyBudgets/BudgetCard.svelte";

  currentPath.set("/settings");
  // redirect to home if not logged in.
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });

  export let budgetName = "";
  export let budgetNameError = "";
  export let savingDefault = false;
  export let defaultSaved = false;

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

  function setDefaultBudget(id) {
    savingDefault = true;
    db.collection("users")
      .doc(auth.currentUser.uid)
      .update({
        defaultBudget: id,
      })
      .then(() => {
        defaultSaved = true;
        setTimeout(() => {
          defaultSaved = false;
        }, 2000);
      })
      .catch((e) => console.error(e))
      .finally(() => (savingDefault = false));
  }
</script>

<style>
  .budget-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1rem;
    align-items: stretch;
  }
  @media screen and (max-width: 400px) {
    .budget-grid {
      grid-template-columns: 1fr;
    }
  }
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
      <div class="flex items-center">
        <h2 class="text-gray-600 font-medium uppercase tracking-wide pr-4 my-2">My Budgets</h2>
        {#if defaultSaved}
          <InfoMessage icon="cloud_done">Saved</InfoMessage>
        {/if}
      </div>
      <div class="budget-grid">
        {#each $sortedBudgets as budget}
          <BudgetCard {budget} {setDefaultBudget} />
        {/each}
      </div>
    {/if}
  {/if}
{:else}
  <!-- Not logged in -->
  <div>You must be logged in to view your budgets.</div>
{/if}
