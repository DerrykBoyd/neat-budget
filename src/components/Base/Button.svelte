<script>
  import { green } from "../../utils/colorVars";
  export let id = "";
  export let handleClick = null;
  export let disabled = false;
  export let color = "green";

  let bgColor = "green-600";
  let hoverColor = "green-700";
  let textColor = "white";

  switch (color) {
    case "red":
      bgColor = "red-600";
      hoverColor = "red-700";
      break;
    case "grey":
    case "gray":
      bgColor = "gray-200";
      hoverColor = "gray-300";
      textColor = "black-800";
      break;
    case "white":
      bgColor = "white";
      hoverColor = "gray-50";
      textColor = "black-800";
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
  class={`${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'} hover:bg-${hoverColor} text-${textColor}  my-2 mr-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-${bgColor} focus:outline-none`}>
  <slot name="icon" />
  <slot />
</button>
