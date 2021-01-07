<script>
  // your script goes here
  export let autocomplete = "on";
  export let label;
  export let name = "";
  export let placeholder = "";
  export let value = "";
  export let disabled = false;
  export let onEnter = null;
  export let min = null;
  export let max = null;
  export let step = null;

  const handleKeyDown = (e) => {
    if (onEnter && e.key === "Enter") onEnter(value);
  };
</script>

<style>
  /* your styles go here */
</style>

{#if label}
  <label for={name} class="mt-2 block text-sm font-medium text-gray-700">{label}</label>
{/if}
<input
  type="number"
  {name}
  {disabled}
  id={name}
  {autocomplete}
  {placeholder}
  {min}
  {max}
  {step}
  on:keydown={handleKeyDown}
  bind:value
  class={`${disabled ? 'opacity-40' : ''} mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`} />
