<script>
  // your script goes here
  export let autocomplete = "current-password";
  export let label;
  export let name = "";
  export let value = "";
  export let disabled = false;
  export let showText = false;
</script>

<style>
  /* your styles go here */
</style>

{#if label}<label for={name} class="mt-2 block text-sm font-medium text-gray-700">{label}</label>{/if}
{#if !showText}
  <div class="relative">
    <input
      type="password"
      {name}
      {disabled}
      id={name}
      {autocomplete}
      bind:value
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    <button
      on:click={() => (showText = true)}
      aria-label="Show password as plain text. Warning: this will display your password on the screen."
      class="absolute bottom-0 right-2 text-gray-400"><span class="material-icons">visibility</span></button>
  </div>
{:else}
  <div class="relative">
    <input
      type="text"
      {name}
      {disabled}
      id={name}
      {autocomplete}
      bind:value
      class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
    <button
      on:click={() => (showText = false)}
      aria-label="Show password as plain text. Warning: this will display your password on the screen."
      class="absolute bottom-0 right-2 text-gray-400"><span class="material-icons">visibility_off</span></button>
  </div>
{/if}
