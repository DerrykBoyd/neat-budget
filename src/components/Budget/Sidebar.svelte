<script>
  import Button from "../Base/Button.svelte";
  import Modal from "../Base/Modal.svelte";
  import AddAccountForm from "./AddAccountForm.svelte";
  import { db } from "../../utils/firebase";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import { nanoid } from "nanoid";
  import currency from "currency.js";
  import {
    accountTypes,
    newAccountName,
    newAccountType,
    newAccountBalance,
    newAccountError,
  } from "../../store/budgets";

  export let currentBudget;

  let addAccountMoal = false;

  const saveAccounts = () => {
    if (!$newAccountName || !$newAccountType || !$newAccountBalance) {
      newAccountError.set("All fields are required");
      return;
    }
    let newAccount = {
      id: nanoid(),
      name: $newAccountName,
      type: $newAccountType,
      onBudget: $accountTypes.find((type) => type.name === $newAccountType).type === "Budget",
      closed: false,
      balance: currency($newAccountBalance).value,
      clearedBalance: 0,
      deleted: false,
    };
    const budgetRef = db.collection("budgets").doc(currentBudget.id);
    budgetRef
      .update({
        accounts: firebase.firestore.FieldValue.arrayUnion(newAccount),
      })
      .catch((e) => console.error("Error adding account", e))
      .finally(() => {
        newAccountType.set("Checking");
        newAccountName.set("");
        newAccountBalance.set(0);
      });
  };
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
    @apply px-4;
    @apply py-2;
    cursor: pointer;
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
    <div class="px-4 pt-2 pb-1 underline font-medium">On Budget Accounts</div>
    {#each currentBudget.accounts as account}
      {#if account.onBudget}
        <div class="sidebar-link">{account.name}</div>
      {/if}
    {/each}
    <div class="px-4 pt-2 pb-1 underline font-medium">Off Budget Accounts</div>
    {#each currentBudget.accounts as account}
      {#if !account.onBudget}
        <div class="sidebar-link">{account.name}</div>
      {/if}
    {/each}
    <div class="px-4">
      <Button handleClick={() => (addAccountMoal = true)} inverted color="white">
        + Add Account
      </Button>
    </div>
  </div>
</div>
<Modal showModal={addAccountMoal}>
  <AddAccountForm />
  <div slot="actions" class="relative flex justify-end items-center">
    <Button
      handleClick={() => {
        addAccountMoal = false;
        newAccountError.set('');
      }}
      color="grey">
      Cancel
    </Button>
    <Button handleClick={saveAccounts}>Save & Add Another</Button>
    <Button
      handleClick={() => {
        saveAccounts();
        addAccountMoal = false;
      }}>
      Save & Close
    </Button>
  </div>
</Modal>
