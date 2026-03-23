<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { initializeAppState } from '$lib/state.svelte';
  import DevMenu from '../components/DevMenu.svelte';
  import Header from '../components/Header.svelte';

  const app = initializeAppState();

  $effect(() => {
    document.documentElement.style.setProperty('--font-serif', app.serifFont);
    document.documentElement.style.setProperty('--font-sans', app.sansSerifFont);
  });

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />
{@render children()}
<DevMenu />
