<script>
  import { fade } from "svelte/transition";
  export let icon = "";
  // color - pass in a valid tailwindCSS color string
  export let color = "gray-600";
</script>

<style>
  /* your styles go here */
</style>

<div transition:fade={{ duration: 400 }} class={`text-${color} opacity-70 text-sm flex items-center`}>
  {#if icon}<span class="material-icons">{icon}</span>{/if}
  <span class="px-2"><slot /></span>
</div>
