<script>
  import Link from "svelte-routing/src/Link.svelte";
  import { clickOutside } from "../../utils/clickOutside";
  import { user, loadingUser } from "../../store/user";
  import MobileMenuBtn from "./MobileMenuBtn.svelte";
  import NavBtn from "./NavBtn.svelte";
  import Loader from "../Base/Loader.svelte";
  import NavUserMenu from "./NavUserMenu.svelte";

  export let location;

  let currentPath = location.pathname;
  let mobileMenuOpen = false;
  let userMenuOpen = false;

  const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);
  const toggleUserMenu = () => (userMenuOpen = !userMenuOpen);
  const closeUserMenu = () => (userMenuOpen = false);
  const setCurrentPath = (path) => (currentPath = path);

  const login = () => {
    loadingUser.set(true);
    setTimeout(() => {
      user.set("Test");
      loadingUser.set(false);
    }, 2000);
  };

  const logout = () => {
    user.set(null);
    toggleUserMenu();
  };
</script>

<style>
  /* your styles go here */
</style>

<nav class="bg-green-500">
  <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <MobileMenuBtn {toggleMobileMenu} {mobileMenuOpen} />
      </div>
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <Link to="/" on:click={() => setCurrentPath('/')}>
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
            <NavBtn to="/" {setCurrentPath} {currentPath} text="Home" />
            <NavBtn to="/about" {setCurrentPath} {currentPath} text="About" />
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <!-- user menu and login -->
        {#if $user}
          <div
            use:clickOutside
            on:click_outside={closeUserMenu}
            class="ml-3 relative">
            <div>
              <button
                on:click={toggleUserMenu}
                class="bg-green-800 border-white border-2 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white"
                id="user-menu"
                aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="" />
              </button>
            </div>
            <NavUserMenu {userMenuOpen} {toggleUserMenu} {logout} />
          </div>
        {:else}
          <div
            class="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            on:click={login}>
            {#if $loadingUser}
              <Loader text="Loading..." />
            {:else}Log In{/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
  <!-- mobile menu dropdown -->
  <div
    class={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
    on:click={toggleMobileMenu}>
    <NavBtn to="/" {setCurrentPath} {currentPath} text="Home" />
    <NavBtn to="/about" {setCurrentPath} {currentPath} text="About" />
  </div>
</nav>
