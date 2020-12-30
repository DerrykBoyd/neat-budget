<script>
  export let id = "";
  export let handleClick = null;
  export let disabled = false;
  export let color = "green";
  export let noMargin = false;

  let bgColor = "bg-green-600";
  let hoverColor = "hover:bg-green-700";
  let textColor = "text-white";

  $: switch (color) {
    case "red":
      bgColor = "bg-red-600";
      hoverColor = "hover:bg-red-700";
      break;
    case "grey":
    case "gray":
      bgColor = "bg-gray-200";
      hoverColor = "hover:bg-gray-300";
      textColor = "text-gray-800";
      break;
    case "white":
      bgColor = "white";
      hoverColor = "hover:bg-gray-50";
      textColor = "text-gray-800";
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
  class={`${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${hoverColor} ${textColor} ${noMargin ? '' : 'my-2 mr-2'} inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${bgColor}`}>
  <slot name="icon" />
  <slot />
</button>
