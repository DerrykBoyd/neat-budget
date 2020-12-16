<script>
  // your script goes here
  export let autocomplete = "current-password";
  export let label;
  export let name = "";
  export let value = "";
  export let disabled = false;
</script>

<style>
  /* your styles go here */
</style>

{#if label}<label for={name} class="mt-2 block text-sm font-medium text-gray-700">{label}</label>{/if}
<input
  type="password"
  {name}
  {disabled}
  id={name}
  {autocomplete}
  bind:value
  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
