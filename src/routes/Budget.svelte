<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { displayName } from "../store/user";
  import { budgets, selectedAccount } from "../store/budgets";
  import Loader from "../components/Base/Loader.svelte";
  import Sidebar from "../components/Budget/Sidebar.svelte";
  import Months from "../components/Budget/Months.svelte";
  import Account from "../components/Budget/Account.svelte";

  export let id;
  let currentBudget = null;
  let currentMonth = new Date();
  $: currentBudget = $budgets.find((budget) => budget.id === id);
  currentPath.set(`/budget/${id}`);
  // redirect to home if not logged in.
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });

  selectedAccount.set("Budget");
</script>

<style>
  .budget {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: calc(100vh - 48px);
    align-items: stretch;
  }
  @media (min-width: 1024px) {
    .budget {
      grid-template-columns: 300px 1fr;
    }
  }
  @media (min-width: 1280px) {
  }
</style>

{#if loggedIn}
  {#if !$displayName}
    <Loader color="grey" />
  {:else if !currentBudget}
    <div>Budget not found</div>
  {:else}
    <div class="budget">
      <Sidebar {currentBudget} />
      {#if $selectedAccount === 'Budget'}
        <Months {currentBudget} {currentMonth} />
      {:else}
        <Account />
      {/if}
    </div>
  {/if}
{:else}
  <!-- Not logged in -->
  <div>You must be logged in to view your budgets.</div>
{/if}
