<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import { initializeAppState } from '$lib/state.svelte';
  import DevMenu from '../components/DevMenu.svelte';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  const app = initializeAppState();

  $effect(() => {
    document.documentElement.style.setProperty('--font-main', app.mainFont);
  });

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Header />
{@render children()}
<Footer />
<DevMenu />
