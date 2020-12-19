<script>
  import { fade } from "svelte/transition";
  import Button from "./Button.svelte";
  import { modalLoaded, showModal } from "../../store/modal";
</script>

<style>
  .modal-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

{#if $showModal}
  <!-- content here -->
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="modal-container min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay, show/hide based on modal state.-->
      <div transition:fade={{ duration: 150 }} class={`fixed inset-0`} aria-hidden="true">
        <div class="absolute inset-0 bg-black opacity-50" />
      </div>
      <!-- Modal Content -->
      <div
        transition:fade={{ duration: 150 }}
        on:introend={() => modalLoaded.set(true)}
        class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <slot />
        </div>
        {#if $$slots.actions}
          <!-- content here -->
          <div class="bg-gray-50 p-2 sm:px-4 flex flex-row-reverse">
            <slot name="actions" />
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
