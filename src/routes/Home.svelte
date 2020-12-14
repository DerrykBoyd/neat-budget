<script>
  import { user } from "../store/user";

  let name = "Todo Budgeting App";
</script>

<style>
</style>

<div class="home-content text-center">
  <h1 class="text-2xl text-green-800">{name}</h1>
  <ol class="py-2">
    <li class="p-2">
      <p>Todo add signin options</p>
    </li>
    <li class="p-2">
      <p>Todo add some data</p>
    </li>
    <li class="p-2">
      <p>Todo add brand colors</p>
    </li>
  </ol>
  <div id="firebaseui-auth-container" />
  <div id="loader" />
  {#if $user}
    <!-- content here -->
    <p>{$user.email}</p>
  {/if}
</div>
