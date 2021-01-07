<script>
  import { scale } from "svelte/transition";
  import { modalLoaded, modalStatus } from "../../store/modal";

  export let showModal = false;
</script>

<style>
  .modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

{#if showModal}
  <!-- content here -->
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="modal-container min-h-screen pt-4 px-0 sm:px-4 pb-20 text-center">
      <!-- Background overlay, show/hide based on modal state.-->
      <div class={`fixed inset-0`} aria-hidden="true">
        <div class="absolute inset-0 bg-black opacity-50" />
      </div>
      <!-- Modal Content -->
      <div
        transition:scale
        on:introend={() => modalLoaded.set(true)}
        class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 min-h-32">
          <slot />
        </div>
        {#if $$slots.actions}
          <!-- content here -->
          <div class="bg-gray-50">
            <slot name="actions" />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
