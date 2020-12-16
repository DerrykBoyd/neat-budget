<script>
  export let id = "";
  export let handleClick;
  export let disabled = false;
</script>

<style>
  /* your styles go here */
</style>

<button
  type="button"
  {id}
  {disabled}
  on:click={handleClick}
  class={`${disabled ? 'opacity-30 pointer-events-none' : 'hover:bg-green-700'} text-white  my-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
  <slot name="icon" />
  <slot />
</button>
