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
</div>

<style>
  /* your styles go here */
</style>
