<script>
  export let bgColor = "green";
  export let textColor = "white";

  const bgColors = {
    gray: "bg-gray-600",
    blue: "bg-blue-600",
    yellow: "bg-yellow-600",
    green: "bg-green-600",
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600",
  };
  const textColors = {
    gray: "text-gray-600",
    blue: "text-blue-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
    white: "text-white",
    black: "text-black",
  };
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

<div class={`badge p-4 ${bgColors[bgColor]} ${textColors[textColor]}`}>
  <slot />
</div>
