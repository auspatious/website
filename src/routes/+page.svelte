<script lang="ts">
  import { getAppState, defaultAppState, heroImageModules } from '$lib/state.svelte';

  const app = getAppState();

  const heroSrc = $derived(heroImageModules[app.heroImage] ?? '');
  const isDefault = $derived(app.heroImage === defaultAppState.heroImage);
</script>

<!--
  Hero media: uses enhanced:img for the default image (full avif/webp/srcset
  optimization). When the dev menu switches the image, falls back to a regular
  <img> using the Vite glob-resolved URL.

  To add new hero images, just drop them in src/lib/assets/images/ — they'll
  automatically appear in the dev menu dropdown.

  Future: to support hero videos, add heroType/heroVideo fields to AppState
  and add a <video autoplay muted loop playsinline> branch here.
-->

<div class="hero relative min-h-screen overflow-hidden">
  <div class="absolute inset-0">
    {#if isDefault}
      <enhanced:img
        src="$lib/assets/images/ndvi-wofs-cairo.jpg"
        alt=""
        class="h-full w-full object-cover"
      />
    {:else}
      <img src={heroSrc} alt="" class="h-full w-full object-cover" />
    {/if}
  </div>
  <div class="hero-overlay absolute inset-0 bg-black/40"></div>
  <div class="hero-content relative z-10 text-center text-white">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Auspatious</h1>
      <p class="py-6">Spatial data intelligence</p>
    </div>
  </div>
</div>
