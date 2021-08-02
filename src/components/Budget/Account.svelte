<script>
  import { selectedAccount } from "../../store/budgets";
  import { transactions } from "../../store/transactions";

  let accountTransactions;

  console.log($transactions);
  $: if ($selectedAccount === "All") accountTransactions = Object.values($transactions);
  $: if ($selectedAccount !== "All") {
    accountTransactions = Object.values($transactions).filter(
      (el) => $selectedAccount === el.accountId
    );
  }
</script>

<div>
  <p>Account Screen here {$selectedAccount}</p>
  <p>Transaction Count: {accountTransactions.length}</p>
  {#each accountTransactions as transaction}
    <span>{transaction.amount}</span>
    <span>{new Date(transaction.date).toDateString()}</span>
  {/each}
</div>

<style>
  /* your styles go here */
</style>
