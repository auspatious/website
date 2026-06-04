<script lang="ts">
  import logo from '$lib/assets/logos/as-logo-symb-colour.svg';
  import logoText from '$lib/assets/logos/as-logo-white-text.svg';
  import Link from './Link.svelte';
  import ContactModal from './ContactModal.svelte';

  let menuOpen = $state(false);
  let scrolled = $state(false);
  let contactOpen = $state(false);

  $effect(() => {
    const onScroll = () => {
      scrolled = window.scrollY > window.innerHeight - 80;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<div
  class="fixed top-0 right-0 left-0 z-50 transition-colors duration-300 {scrolled || menuOpen
    ? 'bg-[#232323]'
    : 'bg-transparent'}"
>
  <div class="navbar mx-auto max-w-5xl flex-wrap">
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
        <button class="link link-hover cursor-pointer" onclick={() => (contactOpen = true)}>
          Contact Us
        </button>
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
      class="w-full overflow-hidden transition-all duration-300 lg:hidden {menuOpen
        ? 'mt-1 max-h-40 border-t border-white/50 pt-2 opacity-100'
        : 'pointer-events-none max-h-0 opacity-0'}"
    >
      <div class="flex w-full justify-center gap-6 text-sm">
        <Link href="/" class="link link-hover" onclick={() => (menuOpen = false)}>Home</Link>
        <button
          class="link link-hover cursor-pointer"
          onclick={() => {
            menuOpen = false;
            contactOpen = true;
          }}
        >
          Contact Us
        </button>
      </div>
    </div>
  </div>
</div>

<ContactModal bind:open={contactOpen} />
