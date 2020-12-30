<script>
  import Fa from "svelte-fa";
  import {
    dismissAlert,
    alertCanDismiss,
    showAlert,
    alertColor,
    alertLeftIcon,
    alertMessage,
  } from "../../store/ui";
</script>

<style>
  /* your styles go here */
</style>

{#if $showAlert}
  <div
    class={`bg-${$alertColor}-200 p-4 fixed bottom-0 w-full sm:bottom-4 sm:right-4 sm:w-1/2 sm:rounded-md`}>
    <div class="flex items-center">
      {#if $alertLeftIcon}
        <div class={`flex-shrink-0 text-${$alertColor}-800 pr-2`}>
          <Fa icon={$alertLeftIcon} />
        </div>
      {/if}
      <div class="ml-2">
        <p class={`text-sm font-medium text-${$alertColor}-800`}>{$alertMessage}</p>
      </div>
      {#if $alertCanDismiss}
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button
              on:click={dismissAlert}
              class={`inline-flex rounded-md text-${$alertColor}-800 p-1.5 hover:bg-${$alertColor}-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600`}>
              <span class="sr-only">Dismiss</span>
              <!-- Heroicon name: x -->
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
