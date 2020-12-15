<script>
  export let id = "";
  export let handleClick;
</script>

<style>
  /* your styles go here */
</style>

<button
  type="button"
  {id}
  on:click={handleClick}
  class="my-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  <slot name="icon" />
  <slot />
</button>
