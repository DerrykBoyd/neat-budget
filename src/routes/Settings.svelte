<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  currentPath.set("/settings");
  let loggedIn = localStorage.getItem("loggedIn") === "true";
  onMount(() => {
    if (!loggedIn) navigate("/");
  });
</script>

<style>
  /* your styles go here */
</style>

<p class="text-2xl text-center text-green-800">SETTINGS PAGE</p>
