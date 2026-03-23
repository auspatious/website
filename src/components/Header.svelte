<script lang="ts">
  import logo from '$lib/assets/logos/as-logo-symb-colour.svg';
  import Link from './Link.svelte';
</script>

<div class="navbar bg-transparent">
  <div class="navbar-start">
    <Link href="/">
      <img src={logo} alt="Auspatious" class="h-10" />
    </Link>
  </div>
  <div class="navbar-center"></div>
  <div class="navbar-end"></div>
</div>
