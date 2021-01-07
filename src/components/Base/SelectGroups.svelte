<script>
  import kebabCase from "lodash/kebabCase";
  export let label = "Select Menu";
  export let groups;
  // options should be an array of objects with type field to specify the group
  export let options;
  export let value;
  let name = kebabCase(label);
</script>

<style>
  /* your styles go here */
</style>

<div class="pt-4">
  <label for={name} class="block text-sm font-medium text-gray-700">{label}</label>
  <select
    bind:value
    id={name}
    {name}
    class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
    {#each groups as group}
      <optgroup label={group}>
        {#each options.filter((option) => option.type === group) as option}
          <option value={option.name}>{option.name}</option>
        {/each}
      </optgroup>
    {/each}
  </select>
</div>
