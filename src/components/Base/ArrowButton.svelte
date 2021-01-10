<script>
  export let id = "";
  export let handleClick = null;
  export let disabled = false;
  export let color = "gray";
  export let noMargin = false;
  export let darkText = false;

  let bgColor = "bg-gray-600 bg-opacity-100";
  let hoverColor = "hover:bg-opacity-70";
  let textColor = darkText ? "text-gray-700" : "text-white";

  $: switch (color) {
    case "red":
      bgColor = "bg-red-600";
      textColor = darkText ? "text-red-700" : "text-white";
      break;
    case "green":
      bgColor = "bg-green-600";
      textColor = darkText ? "text-green-700" : "text-white";
      break;
    case "white":
      bgColor = "bg-transparent";
      textColor = darkText ? "text-gray-700" : "text-white";
      break;
  }
</script>

<style>
  /* your styles go here */
</style>

<button
  type="button"
  {id}
  {disabled}
  on:click={handleClick}
  class={`${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${hoverColor} ${textColor} ${noMargin ? '' : 'm-2'} inline-flex items-center p-4 rounded-full font-medium ${bgColor}`}>
  <slot name="icon" />
  <slot />
</button>
