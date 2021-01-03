<script>
  import { afterUpdate, onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { currentPath } from "store/currentPath";
  import { userEmail, userLoaded } from "../store/user";
  import { ui, uiConfig } from "utils/firebase";
  import Loader from "../components/Base/Loader.svelte";

  let loggedIn = localStorage.getItem("loggedIn") === "true";
  currentPath.set("/");
  onMount(() => {
    let queryString = new URLSearchParams(window.location.search);
    let hasLogin = queryString.has("login");
    loggedIn = localStorage.getItem("loggedIn") === "true";
    if (hasLogin || $userLoaded || loggedIn) {
      const firebaseUiContainer = document.getElementById("firebaseui-auth-container");
      if (firebaseUiContainer) firebaseUiContainer.style.display = "none";
    }
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
</script>

<style>
</style>

<div class="home-content text-center">
  {#if loggedIn}
    {#if !$userLoaded}
      <Loader color="grey" />
    {:else}{navigate('/my-budgets')}{/if}
  {:else}
    <h1 class="text-2xl text-green-800">Home Page</h1>
    <div>Home page to go here</div>
  {/if}
  <div id="firebaseui-auth-container" />
  <div id="loader" />
</div>
