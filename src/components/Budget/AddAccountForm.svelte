<script>
  import InfoMessage from "../Base/InfoMessage.svelte";
  import Input from "../Base/Input.svelte";
  import InputNumber from "../Base/InputNumber.svelte";
  import SelectGroups from "../Base/SelectGroups.svelte";
  import {
    accountTypes,
    newAccountBalance,
    newAccountError,
    newAccountName,
    newAccountType,
  } from "../../store/budgets";

  export let onboarding = false;
</script>

<style>
  /* your styles go here */
</style>

<h3 class="text-xl font-bold">{onboarding ? 'Add an Account' : 'Add Accounts'}</h3>
{#if onboarding}
  <p class="py-2">
    Add your first spending account to record your transactions. Neat Budget works best when you add
    all your spending accounts. You can add your other accounts on the next screen.
  </p>
{/if}
<SelectGroups
  bind:value={$newAccountType}
  label="Account Type"
  groups={[...new Set($accountTypes.map((account) => account.type))]}
  options={$accountTypes} />
<Input
  bind:value={$newAccountName}
  name="account-name"
  placeholder="Account Nickname"
  label="Account Nickname" />
<InputNumber
  bind:value={$newAccountBalance}
  name="account-balance"
  placeholder="0.00"
  min="0"
  step="0.01"
  label="Account Balance" />
<span class="py-1 text-sm text-gray-600">What is the current balance of this account?</span>
{#if $newAccountError}
  <InfoMessage icon="error" color="text-red-800">{$newAccountError}</InfoMessage>
{/if}
