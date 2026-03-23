<script lang="ts">
  import { getAppState, defaultAppState, heroImageModules } from '$lib/state.svelte';
  import BlurUpImage from '../components/BlurUpImage.svelte';
  import heroLqip from '$lib/assets/images/ndvi-wofs-cairo.jpg?lqip';

  const app = getAppState();

  const heroSrc = $derived(heroImageModules[app.heroImage] ?? '');
  const isDefault = $derived(app.heroImage === defaultAppState.heroImage);
</script>

<!--
  Hero media: uses enhanced:img + LQIP blur-up for the default image.
  When the dev menu switches the image, falls back to a regular <img>.

  To add new hero images, just drop them in src/lib/assets/images/ — they'll
  automatically appear in the dev menu dropdown.

  Future: to support hero videos, add heroType/heroVideo fields to AppState
  and add a <video autoplay muted loop playsinline> branch here.
-->

<div class="hero relative min-h-dvh overflow-hidden">
  <BlurUpImage lqip={heroLqip.lqip} class="absolute inset-0">
    {#if isDefault}
      <enhanced:img
        src="$lib/assets/images/ndvi-wofs-cairo.jpg"
        alt=""
        class="h-full w-full object-cover"
      />
    {:else}
      <img src={heroSrc} alt="" class="h-full w-full object-cover" />
    {/if}
  </BlurUpImage>
  <div class="hero-overlay absolute inset-0 bg-black/40"></div>
  <div class="hero-content relative z-10 text-center text-white">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Auspatious</h1>
      <p class="py-6">Spatial data intelligence</p>
    </div>
  </div>
</div>
