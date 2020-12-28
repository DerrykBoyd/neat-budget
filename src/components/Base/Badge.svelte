<script>
  export let bgColor = "green-600";
  export let textColor = "white";
</script>

<style>
  .badge {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    border-radius: 1rem;
  }
</style>

<div class={`badge p-4 bg-${bgColor} text-${textColor}`}>
  <slot />
</div>
