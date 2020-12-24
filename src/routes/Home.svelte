<script>
  import { afterUpdate, onMount } from "svelte";
  import { currentPath } from "store/currentPath";
  import { userEmail, displayName, loadingUser } from "store/user";
  import { budgets, createBudget } from "store/budgets";
  import { ui, uiConfig } from "utils/firebase";
  import Loader from "../components/Base/Loader.svelte";
  import Button from "../components/Base/Button.svelte";

  let name = "DB Budgeting App";
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  currentPath.set("/");
  onMount(() => {
    let queryString = new URLSearchParams(window.location.search);
    let hasLogin = queryString.has("login");
    loggedIn = localStorage.getItem("loggedIn") === "true";
    if (hasLogin || $loadingUser || loggedIn)
      document.getElementById("firebaseui-auth-container").style.display = "none";
  });
  afterUpdate(() => {
    let queryString = new URLSearchParams(window.location.search);
    let hasLogin = queryString.has("login");
    loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!$userEmail?.email && !hasLogin && !loggedIn) {
      document.getElementById("firebaseui-auth-container").style.display = "";
      ui.start("#firebaseui-auth-container", uiConfig);
    } else ui.reset();
  });

  let newBudget = createBudget();

  function addBudget(newBudget) {
    budgets.update((arr) => [...arr, newBudget]);
  }
</script>

<style>
</style>

<div class="home-content text-center">
  <h1 class="text-2xl text-green-800">{name}</h1>
  {#if loggedIn}
    {#if !$displayName}
      <Loader color="grey" />
    {:else}
      <div>Welcome {$displayName}</div>
      {#if !$budgets.length}
        <div>Looks like you don't have any budgets yet. Lets create one.</div>
        <Button handleClick={() => addBudget(newBudget)}>Add Budget</Button>
      {:else}
        <div>{$budgets[0]}</div>
      {/if}
    {/if}
  {:else}
    <!-- Not logged in - show home page -->
    <div>Home page to go here</div>
  {/if}
  <div id="firebaseui-auth-container" />
  <div id="loader" />
</div>
