<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { userLoaded } from "../store/user";
  import {
    sortedBudgets,
    createBudget,
    accountTypes,
    newAccountBalance,
    newAccountError,
    newAccountName,
    newAccountType,
  } from "../store/budgets";
  import Loader from "../components/Base/Loader.svelte";
  import Button from "../components/Base/Button.svelte";
  import { auth, db } from "../utils/firebase";
  import Input from "../components/Base/Input.svelte";
  import InfoMessage from "../components/Base/InfoMessage.svelte";
  import BudgetCard from "../components/MyBudgets/BudgetCard.svelte";
  import Modal from "../components/Base/Modal.svelte";
  import AddBudgetCard from "../components/MyBudgets/AddBudgetCard.svelte";
  import Select from "../components/Base/Select.svelte";
  import { modalStatus } from "../store/modal";
  import SelectGroups from "../components/Base/SelectGroups.svelte";
  import InputNumber from "../components/Base/InputNumber.svelte";
  import { nanoid } from "nanoid";
  import currency from "currency.js";
  import AddAccountForm from "../components/Budget/AddAccountForm.svelte";
  import { createTransaction } from "../store/transactions";

  currentPath.set("/settings");
  // redirect to home if not logged in.
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });

  let budgetName = "";
  let budgetNameError = "";
  let defaultSaved = false;
  let newBudgetModal = false;
  let currencyFormat = "USD";
  let savingDefault = false;

  const toggleModal = () => {
    if (newBudgetModal) {
      newBudgetModal = false;
      modalStatus.set("");
      budgetNameError = "";
    } else {
      newBudgetModal = true;
      modalStatus.set("settings");
    }
  };

  function saveSettings() {
    budgetNameError = "";
    if (!budgetName) {
      budgetNameError = "Add a budget name";
      return;
    }
    modalStatus.set("accounts");
  }

  async function addBudget() {
    budgetNameError = "";
    if (!$newAccountName || !$newAccountType || !$newAccountBalance) {
      newAccountError.set("All fields are required");
      return;
    }
    let newAccountId = nanoid();
    let now = new Date();
    let currentMonth = new Date(now.getFullYear(), now.getMonth());
    let accounts = [
      {
        id: newAccountId,
        name: $newAccountName,
        type: $newAccountType,
        onBudget: $accountTypes.find((type) => type.name === $newAccountType).type === "Budget",
        closed: false,
        balance: currency($newAccountBalance).value,
        clearedBalance: 0,
        deleted: false,
      },
    ];
    let firstTransaction = createTransaction({
      amount: currency($newAccountBalance).value,
      accountId: newAccountId,
      payeeId: "Income",
    });
    let newBudget = createBudget(budgetName, currencyFormat, accounts);
    await db.collection("budgets").doc(newBudget.id).set(newBudget);
    const budgetRef = db.collection("budgets").doc(newBudget.id);
    await budgetRef.collection("months").doc(`${currentMonth.valueOf()}`).set(
      {
        owner: auth.currentUser.uid,
        month: currentMonth.valueOf(),
        income: $newAccountBalance,
      },
      { merge: true }
    );
    await budgetRef.collection("transactions").doc(firstTransaction.id).set(firstTransaction);
    toggleModal();
    newAccountType.set("Checking");
    newAccountName.set("");
    newAccountBalance.set(0);
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

  modalStatus.set("settings");
</script>

{#if loggedIn}
  {#if !$userLoaded}
    <Loader color="grey" />
  {:else}
    <div class="px-2">
      <div class="flex items-center">
        <h2 class="text-gray-600 font-medium uppercase tracking-wide pr-4 my-2">My Budgets</h2>
        {#if defaultSaved}
          <InfoMessage icon="cloud_done">Saved</InfoMessage>
        {/if}
      </div>
      <div class="budget-grid">
        {#each $sortedBudgets as budget (budget.id)}
          <BudgetCard {budget} {setDefaultBudget} />
        {/each}
        <AddBudgetCard {toggleModal} />
      </div>
    </div>
    <Modal showModal={newBudgetModal}>
      {#if $modalStatus === "settings"}
        <div>
          <h3 class="text-xl font-bold">Budget Settings</h3>
          <Input
            bind:value={budgetName}
            name="budget-name"
            placeholder="Budget name"
            label="Name"
            onEnter={addBudget}
          />
          {#if budgetNameError}
            <InfoMessage icon="error" color="text-red-800">{budgetNameError}</InfoMessage>
          {/if}
          <Select
            bind:value={currencyFormat}
            options={["USD", "CAD", "GBP", "EUR"]}
            label="Currency Format"
          />
        </div>
      {:else}
        <AddAccountForm onboarding />
      {/if}
      <div slot="actions" class="relative flex justify-end items-center">
        {#if $modalStatus === "settings"}
          <Button handleClick={toggleModal} color="grey">Cancel</Button>
          <Button handleClick={saveSettings}>Next</Button>
        {:else}
          <Button handleClick={() => modalStatus.set("settings")} color="grey">Back</Button>
          <Button handleClick={addBudget}>Save</Button>
        {/if}
      </div>
    </Modal>
  {/if}
{:else}
  <!-- Not logged in -->
  <div>You must be logged in to view your budgets.</div>
{/if}

<style lang="scss">
  .budget-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1rem;
    align-items: stretch;
    @media screen and (max-width: 400px) {
      grid-template-columns: 1fr;
    }
  }
</style>
