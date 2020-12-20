<script>
  export let text = "";
  export let size = "2rem";
  export let color = "white";
</script>

<style>
  .spinner {
    animation: rotate 2s linear infinite;
    z-index: 2;
    width: var(--size);
    height: var(--size);
  }

  .spinner .path {
    stroke: var(--color);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>

<div style="color: {color}" class="flex flex-col items-center justify-center">
  <svg style="--size: {size}; --color: {color}" class="spinner" viewBox="0 0 50 50">
    <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
  </svg>
  {#if text}<span class="pl-2">{text}</span>{/if}
</div>
