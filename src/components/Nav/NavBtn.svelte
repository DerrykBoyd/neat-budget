<script>
  import { Link } from "svelte-routing";
  import { currentPath } from "store/currentPath";

  export let text;
  export let to;
</script>

<style>
  /* your styles go here */
  div {
    text-decoration: none;
  }
</style>

<Link {to} on:click={(_) => currentPath.set(to)}>
  <div
    class={`${$currentPath === to ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-green-600 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}>
    {text}
  </div>
</Link>
