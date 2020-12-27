<script>
  import Routes from "Routes.svelte";
</script>

<style global lang="postcss">
  /* only apply purgecss on utilities, per Tailwind docs */
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */
  @tailwind utilities;

  @layer base {
    a {
      @apply text-green-800 underline;
    }
  }
</style>

<Routes />
