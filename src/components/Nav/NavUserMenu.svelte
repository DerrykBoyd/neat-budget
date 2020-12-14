<script>
  import { links } from "svelte-routing";
  export let userMenuOpen;
  export let toggleUserMenu;
  export let logout;
</script>

<style>
  /* your styles go here */
</style>

<div
  use:links
  class={`${userMenuOpen ? 'block' : 'hidden'} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="user-menu">
  <a
    on:click={toggleUserMenu}
    href="/profile"
    class={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100`}
    role="menuitem">Your Profile</a>
  <a
    on:click={toggleUserMenu}
    href="/settings"
    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    role="menuitem">Settings</a>
  <a
    on:click={logout}
    href="/"
    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    role="menuitem">Sign out</a>
</div>
