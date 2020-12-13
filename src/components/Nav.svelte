<script>
  import Link from "svelte-routing/src/Link.svelte";
  import { clickOutside } from "../utils/clickOutside";
  import { links } from "svelte-routing";

  export let location;

  let currentPath = location.pathname;
  let mobileMenuOpen = false;
  let userMenuOpen = false;

  const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);
  const toggleUserMenu = () => (userMenuOpen = !userMenuOpen);
  const closeUserMenu = () => (userMenuOpen = false);

  const setCurrentPath = (path) => (currentPath = path);
</script>

<style>
  /* your styles go here */
</style>

<!-- This example requires Tailwind CSS v2.0+ -->
<nav class="bg-green-500">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <!-- Mobile menu button-->
        <button
          on:click={toggleMobileMenu}
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-200 border-gray-200 hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg
            class:hidden={mobileMenuOpen}
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            class:hidden={!mobileMenuOpen}
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <Link to="/" on:click={() => setCurrentPath("/")}>
          <div class="flex-shrink-0 flex items-center text-white">
            <img
              class="block md:hidden h-8 w-auto fill-current "
              src="/images/placeholder-logo-mobile.svg"
              alt="logo" />
            <img
              class="hidden md:block h-8 w-auto"
              src="/images/placeholder-logo.svg"
              alt="logo" />
          </div>
        </Link>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <Link to="/" on:click={(_) => setCurrentPath('/')}>
              <div
                class={`${currentPath === '/' ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-green-600 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}>
                Home
              </div>
            </Link>
            <Link to="/about" on:click={(_) => setCurrentPath('/about')}>
              <div
                class={`${currentPath === '/about' ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-green-600 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}>
                About
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <!-- Profile dropdown -->
        <div
          use:clickOutside
          on:click_outside={closeUserMenu}
          class="ml-3 relative">
          <div>
            <button
              on:click={toggleUserMenu}
              class="bg-green-800 border-white border-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
              id="user-menu"
              aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="" />
            </button>
          </div>
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
              on:click={toggleUserMenu}
              href="/signout"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem">Sign out</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
    on:click={toggleMobileMenu}>
    <Link to="/" on:click={(_) => setCurrentPath('/')}>
      <div
        class={`${currentPath === '/' ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-green-600 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}>
        Home
      </div>
    </Link>
    <Link to="/about" on:click={(_) => setCurrentPath('/about')}>
      <div
        class={`${currentPath === '/about' ? 'bg-green-700 text-white' : 'text-gray-200 hover:bg-green-600 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium`}>
        About
      </div>
    </Link>
  </div>
</nav>
