<script>
  import { currentPath } from "store/currentPath";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { dbUser } from "../store/user";
  export let location;
  currentPath.set("/profile");
  onMount(() => {
    if (!$dbUser) navigate("/");
  });
</script>

<style>
  /* your styles go here */
</style>

<p class="text-2xl text-center text-green-800">PROFILE PAGE</p>
