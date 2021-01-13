<script>
  import currency from "currency.js";
  export let category;
  export let month;
  export let monthData;
  export let group = false;

  let categoryData = monthData?.categories[category.id];
  let budgeted = categoryData?.budgeted || 0;
  let spent = categoryData?.spent || 0;
  let available = budgeted - spent;
</script>

<style lang="scss">
  .totals-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
    @apply text-gray-700;
    @apply px-4;
    @apply py-2;
    & .category {
      flex: 1 0 240px;
      max-width: 80vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & .totals {
      flex: 1 0 260px;
      display: flex;
      justify-content: space-between;
      @apply py-2 sm:py-1;
    }
  }
</style>

<div class={`${group ? 'bg-green-100' : ''} totals-row text-xl sm:text-base`}>
  {#if month === 'current'}
    <p class={`${group ? 'font-bold' : ''} category`}>{category?.name}</p>
  {/if}
  <div class="totals">
    <span>{currency(budgeted).format()}</span>
    <span>{currency(spent).format()}</span>
    <span>{currency(available).format()}</span>
  </div>
</div>
