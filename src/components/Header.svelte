<script lang="ts">
  import logo from '$lib/assets/logos/as-logo-symb-colour.svg';
  import logoText from '$lib/assets/logos/as-logo-white-text.svg';
  import Link from './Link.svelte';
</script>

<div class="navbar absolute top-0 right-0 left-0 z-50 mx-auto max-w-5xl bg-transparent">
  <div class="navbar-start">
    <Link href="/" class="flex items-center gap-3 p-1">
      <img src={logo} alt="Auspatious" class="h-10" />
      <img src={logoText} alt="Auspatious" class="h-3" />
    </Link>
  </div>
  <div class="navbar-center"></div>
  <div class="navbar-end gap-4">
    <Link href="/" class="link link-hover">Home</Link>
    <Link href="/contact" class="link link-hover">Contact Us</Link>
  </div>
</div>
