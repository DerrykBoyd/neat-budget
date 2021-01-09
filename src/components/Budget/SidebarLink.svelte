<script>
  import currency from "currency.js";
  import { selectedAccount } from "../../store/budgets";
  export let accountId;
  export let name;
  export let balance = null;

  let negative = balance < 0;
  let isSelected = $selectedAccount === name;

  const handleLinkClick = () => {
    selectedAccount.set(accountId);
  };
</script>

<style lang="scss">
  .sidebar-link {
    &.isSelected {
      @apply bg-green-700;
    }
    display: flex;
    justify-content: space-between;
    @apply px-4;
    @apply py-2;
    cursor: pointer;
    &:hover {
      @apply bg-green-700;
    }
    & .account-balance {
      padding: 0 0.5rem;
      &.negative {
        @apply bg-gray-50;
        @apply text-red-800;
        border-radius: 2rem;
      }
    }
  }
</style>

<div class="sidebar-link" class:isSelected on:click={handleLinkClick}>
  <div>{name}</div>
  {#if balance}
    <div class="account-balance" class:negative>{currency(balance).format()}</div>
  {/if}
</div>
