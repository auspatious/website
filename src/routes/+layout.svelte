<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { PUBLIC_SITE_URL } from '$env/static/public';
  import favicon from '$lib/assets/logos/as-logo-symb-colour.svg';
  import { initializeAppState } from '$lib/state.svelte';
  import DevMenu from '../components/DevMenu.svelte';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  const app = initializeAppState();

  $effect(() => {
    document.documentElement.style.setProperty('--font-main', app.mainFont);
  });

  let { children } = $props();

  const siteName = 'Auspatious';
  const defaultTitle = 'Auspatious: a cloud native geospatial company';
  const defaultDescription = 'Spatial data intelligence';
  const canonicalUrl = $derived(`${PUBLIC_SITE_URL}${page.url.pathname}`);
</script>

<svelte:head>
  <title>{defaultTitle}</title>
  <meta name="description" content={defaultDescription} />
  <link rel="icon" href={favicon} />
  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:site_name" content={siteName} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={defaultTitle} />
  <meta property="og:description" content={defaultDescription} />
  <meta property="og:url" content={canonicalUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={defaultTitle} />
  <meta name="twitter:description" content={defaultDescription} />
</svelte:head>
<Header />
{@render children()}
<Footer />
<DevMenu />
