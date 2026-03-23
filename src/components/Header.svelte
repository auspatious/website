<script lang="ts">
  import logo from '$lib/assets/logos/as-logo-symb-colour.svg';
  import logoText from '$lib/assets/logos/as-logo-white-text.svg';
  import Link from './Link.svelte';

  let menuOpen = $state(false);
</script>

<div
  class="navbar absolute top-0 right-0 left-0 z-50 mx-auto max-w-5xl flex-wrap transition-colors duration-300 {menuOpen ? 'bg-black/40' : 'bg-transparent'}"
>
  <div class="navbar-start">
    <Link href="/" class="flex items-center gap-3 p-1">
      <img src={logo} alt="Auspatious" class="h-10" />
      <img src={logoText} alt="Auspatious" class="h-3" />
    </Link>
  </div>
  <div class="navbar-center"></div>
  <div class="navbar-end">
    <!-- Desktop links -->
    <div class="hidden gap-4 p-1 lg:flex">
      <Link href="/" class="link link-hover">Home</Link>
      <Link href="/ " class="link link-hover">Contact Us</Link>
    </div>
    <!-- Mobile hamburger -->
    <button
      class="cursor-pointer bg-transparent p-1 lg:hidden"
      aria-label="Menu"
      onclick={() => (menuOpen = !menuOpen)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <line x1="4" y1="6" x2="20" y2="6" stroke-width="2" stroke-linecap="round"
          class="transition-all duration-300"
          style:transform-origin="12px 6px"
          style:transform={menuOpen ? 'translateY(6px) rotate(45deg)' : ''}
        />
        <line x1="4" y1="12" x2="20" y2="12" stroke-width="2" stroke-linecap="round"
          class="transition-opacity duration-300"
          style:opacity={menuOpen ? '0' : '1'}
        />
        <line x1="4" y1="18" x2="20" y2="18" stroke-width="2" stroke-linecap="round"
          class="transition-all duration-300"
          style:transform-origin="12px 18px"
          style:transform={menuOpen ? 'translateY(-6px) rotate(-45deg)' : ''}
        />
      </svg>
    </button>
  </div>
  <!-- Mobile menu panel -->
  <div
    class="w-full border-t border-white/50 transition-opacity duration-300 pt-2 mt-1 lg:hidden {menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}"
  >
    <div class="flex w-full justify-center gap-6 text-sm">
      <Link href="/" class="link link-hover" onclick={() => (menuOpen = false)}>Home</Link>
      <Link href="/" class="link link-hover" onclick={() => (menuOpen = false)}>Contact Us</Link>
    </div>
  </div>
</div>
