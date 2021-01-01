<script>
  import Link from "svelte-routing/src/Link.svelte";
  import { fade } from "svelte/transition";
  import { clickOutside } from "utils/clickOutside";
  import { photoURL } from "store/user";
  import { currentPath } from "store/currentPath";
  import NavBtn from "./NavBtn";
  import NavUserMenu from "./NavUserMenu";
  import { auth } from "utils/firebase";
  import { appName } from "../../store/ui";

  let userMenuOpen = false;
  let loggedIn = localStorage.getItem("loggedIn") === "true";

  const toggleUserMenu = () => (userMenuOpen = !userMenuOpen);
  const closeUserMenu = () => (userMenuOpen = false);
  const setCurrentPath = (path) => currentPath.set(path);

  const logout = () => {
    auth.signOut();
    toggleUserMenu();
  };
</script>

<style>
</style>

<nav class="bg-green-500">
  <div class="px-2 sm:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-12">
      <div class="flex-1 flex items-center justify-start">
        <Link to="/" on:click={() => setCurrentPath('/')}>
          <div class="flex-shrink-0 flex items-center">
            <img class="block w-auto h-8" src="/icons/logo-gray.svg" alt="logo" />
            <span class="block text-2xl text-gray-200 w-auto ml-4">{$appName}</span>
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
        {#if loggedIn}
          <div use:clickOutside on:click_outside={closeUserMenu} class="ml-3 relative">
            <div>
              <button
                on:click={toggleUserMenu}
                class="border-none select-none flex items-center text-sm rounded-full focus:outline-none"
                id="user-menu"
                aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                {#if $photoURL}
                  <img class="h-8 w-8 rounded-full" src={$photoURL} alt="profile" />
                {:else}<span class="material-icons md-36 text-gray-100">face</span>{/if}
              </button>
            </div>
            {#if userMenuOpen}
              <NavUserMenu {toggleUserMenu} {logout} />
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>
