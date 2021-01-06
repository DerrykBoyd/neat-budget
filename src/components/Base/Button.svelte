<script>
  export let id = "";
  export let handleClick = null;
  export let disabled = false;
  export let color = "green";
  export let noMargin = false;
  export let inverted = false;

  let bgColor = "bg-green-600";
  let hoverColor = inverted ? "hover:bg-green-200" : "hover:bg-green-700";
  let textColor = inverted ? "text-green-700" : "text-white";
  let border = "";

  $: switch (color) {
    case "red":
      bgColor = inverted ? "bg-transparent" : "bg-red-600";
      border = "border border-red-600 rounded";
      hoverColor = inverted ? "hover:bg-red-200" : "hover:bg-red-700";
      textColor = inverted ? "text-red" : "text-white";
      break;
    case "grey":
    case "gray":
      bgColor = inverted ? "bg-transparent" : "bg-gray-200";
      border = "border border-gray-200 rounded";
      hoverColor = inverted ? "hover:bg-gray-200" : "hover:bg-gray-300";
      textColor = inverted ? "text-white" : "text-gray-800";
      break;
    case "white":
      bgColor = inverted ? "bg-transparent" : "white";
      border = "border border-gray-200 rounded";
      hoverColor = inverted ? "hover:border-white hover:text-white" : "hover:bg-gray-50";
      textColor = inverted ? "text-gray-200" : "text-gray-800";
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
  class={`${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${border} ${hoverColor} ${textColor} ${noMargin ? '' : 'my-2 mr-2'} inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${bgColor}`}>
  <slot name="icon" />
  <slot />
</button>
