<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { userLoaded } from "../store/user";
  import { sortedBudgets, createBudget } from "../store/budgets";
  import Loader from "../components/Base/Loader.svelte";
  import Button from "../components/Base/Button.svelte";
  import { auth, db } from "../utils/firebase";
  import Input from "../components/Base/Input.svelte";
  import InfoMessage from "../components/Base/InfoMessage.svelte";
  import BudgetCard from "../components/MyBudgets/BudgetCard.svelte";
  import Modal from "../components/Base/Modal.svelte";
  import AddBudgetCard from "../components/MyBudgets/AddBudgetCard.svelte";
  import Select from "../components/Base/Select.svelte";

  currentPath.set("/settings");
  // redirect to home if not logged in.
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });

  let budgetName = "";
  let budgetNameError = "";
  let savingDefault = false;
  let defaultSaved = false;
  let newBudgetModal = false;
  let currencyFormat = "USD";

  const toggleModal = () => {
    if (newBudgetModal) {
      newBudgetModal = false;
      budgetNameError = "";
    } else {
      newBudgetModal = true;
    }
  };

  function addBudget() {
    if (!budgetName) {
      budgetNameError = "Add a budget name";
      return;
    }
    budgetNameError = "";
    let newBudget = createBudget(budgetName, currencyFormat);
    db.collection("budgets").add(newBudget);
    toggleModal();
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
  {#if !$userLoaded}
    <Loader color="grey" />
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
      <AddBudgetCard {toggleModal} />
    </div>
    <Modal showModal={newBudgetModal}>
      <div>
        <Input
          bind:value={budgetName}
          name="budget-name"
          placeholder="Budget name"
          label="Name"
          onEnter={addBudget} />
        {#if budgetNameError}
          <InfoMessage icon="error" color="text-red-800">{budgetNameError}</InfoMessage>
        {/if}
        <Select
          bind:value={currencyFormat}
          options={['USD', 'CAD', 'GBP', 'EUR']}
          label="Currency Format" />
      </div>
      <div slot="actions" class="relative flex justify-end items-center">
        <Button handleClick={toggleModal} color="grey">Cancel</Button>
        <Button handleClick={() => addBudget()}>Save</Button>
      </div>
    </Modal>
  {/if}
{:else}
  <!-- Not logged in -->
  <div>You must be logged in to view your budgets.</div>
{/if}
