<script>
  import { afterUpdate, onMount } from "svelte";
  import { currentPath } from "store/currentPath";
  import { userEmail, displayName, loadingUser } from "store/user";
  import { ui, uiConfig } from "utils/firebase";

  let name = "Todo Budgeting App";
  currentPath.set("/");
  onMount(() => {
    let queryString = new URLSearchParams(window.location.search);
    let hasLogin = queryString.has("login");
    let loggedIn = localStorage.getItem("loggedIn") === "true";
    if (hasLogin || $loadingUser || loggedIn)
      document.getElementById("firebaseui-auth-container").style.display = "none";
  });
  afterUpdate(() => {
    let queryString = new URLSearchParams(window.location.search);
    let hasLogin = queryString.has("login");
    let loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!$userEmail?.email && !hasLogin && !loggedIn) {
      document.getElementById("firebaseui-auth-container").style.display = "";
      ui.start("#firebaseui-auth-container", uiConfig);
    } else ui.reset();
  });
</script>

<style>
</style>

<div class="home-content text-center">
  <h1 class="text-2xl text-green-800">{name}</h1>
  <ol class="py-2">
    <li class="p-2">
      <p class="line-through">Todo add signin options</p>
    </li>
    <li class="p-2">
      <p class="line-through">Todo User Settings - Change Display Name</p>
    </li>
    <li class="p-2">
      <p class="line-through">Todo User Settings - Change Profile Photo</p>
    </li>
    <li class="p-2">
      <p class="">Todo User Settings - Add uploading feedback when saving photo</p>
    </li>
    <li class="p-2">
      <p>Todo User Settings - Change Password</p>
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
  {#if $displayName}
    <p>DB User Logged In - {$displayName}, {$userEmail}</p>
  {/if}
</div>
