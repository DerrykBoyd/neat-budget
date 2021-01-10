<script>
  import {
    faChevronLeft,
    faChevronRight,
    faChevronDown,
    faChevronUp,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  export let id = "";
  export let handleClick = null;
  export let disabled = false;
  export let color = "gray";
  export let noMargin = false;
  export let darkText = false;
  export let direction = "right";

  let bgColor = darkText ? "bg-gray-600" : "bg-white";
  let hoverColor = "hover:bg-opacity-20";
  let textColor = darkText ? "text-gray-700" : "text-white";
  let icon = faChevronRight;

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

  $: switch (direction) {
    case "left":
      icon = faChevronLeft;
      break;
    case "up":
      icon = faChevronUp;
      break;
    case "down":
      icon = faChevronDown;
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
  class={`${disabled ? 'opacity-30 pointer-events-none' : 'opacity-100'} ${hoverColor} ${textColor} ${noMargin ? '' : 'm-2'} focus:outline-none bg-opacity-0 inline-flex justify-center items-center p-4 w-12 h-12 rounded-full font-medium ${bgColor}`}>
  <Fa {icon} />
</button>
