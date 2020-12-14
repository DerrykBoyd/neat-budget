<script>
  import Link from "svelte-routing/src/Link.svelte";
  import { clickOutside } from "utils/clickOutside";
  import { dbUser } from "store/user";
  import { currentPath } from "store/currentPath";
  import MobileMenuBtn from "./MobileMenuBtn";
  import NavBtn from "./NavBtn";
  import Loader from "components/Base/Loader";
  import NavUserMenu from "./NavUserMenu";
  import { auth } from "utils/firebase";

  let mobileMenuOpen = false;
  let userMenuOpen = false;

  const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);
  const toggleUserMenu = () => (userMenuOpen = !userMenuOpen);
  const closeUserMenu = () => (userMenuOpen = false);
  const setCurrentPath = (path) => currentPath.set(path);

  const logout = () => {
    auth.signOut();
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
            <NavBtn to="/" text="Home" />
            <NavBtn to="/about" text="About" />
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <!-- user menu and login -->
        {#if $dbUser}
          <div
            use:clickOutside
            on:click_outside={closeUserMenu}
            class="ml-3 relative">
            <div>
              <button
                on:click={toggleUserMenu}
                class="border-none select-none flex items-center text-sm rounded-full focus:outline-none"
                id="user-menu"
                aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                {#if $dbUser.photoURL}
                  <img
                    class="h-8 w-8 rounded-full"
                    src={dbUser.photoURL}
                    alt="profile" />
                {:else}
                  <span class="material-icons md-36 text-gray-100">face</span>
                {/if}
              </button>
            </div>
            <NavUserMenu {userMenuOpen} {toggleUserMenu} {logout} />
          </div>
        {/if}
      </div>
    </div>
  </div>
  <!-- mobile menu dropdown -->
  <div
    class={`${mobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}
    on:click={toggleMobileMenu}>
    <NavBtn to="/" text="Home" />
    <NavBtn to="/about" text="About" />
  </div>
</nav>
