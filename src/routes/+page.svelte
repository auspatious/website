<script lang="ts">
  import { base } from '$app/paths';
  import { getAppState, defaultAppState, heroImageModules } from '$lib/state.svelte';
  import { people } from '$lib/people';
  import BlurUpImage from '../components/BlurUpImage.svelte';
  import heroLqip from '$lib/assets/images/brisbane-smoke-sentinel2-2025.jpg?lqip';

  const app = getAppState();

  const heroSrc = $derived(heroImageModules[app.heroImage] ?? '');
  const isDefaultImage = $derived(app.heroImage === defaultAppState.heroImage);
  const videoSrc = $derived(`${base}/${app.heroVideo}`);
</script>

<!--
  Hero media: supports both image and video backgrounds.

  Image mode: uses enhanced:img + LQIP blur-up for the default image.
  When the dev menu switches the image, falls back to a regular <img>.
  To add new hero images, drop them in src/lib/assets/images/.

  Video mode: uses <video> with files from static/.
  To add new hero videos, drop them in static/ and add the filename
  to the heroVideos array in src/lib/state.svelte.ts.
-->

<div class="hero relative min-h-svh overflow-hidden">
  {#if app.heroType === 'video'}
    <video
      autoplay
      muted
      loop
      playsinline
      class="absolute inset-0 h-full w-full object-cover object-[27%_center] sm:object-center"
      src={videoSrc}
    ></video>
  {:else}
    <BlurUpImage lqip={heroLqip.lqip} class="absolute inset-0">
      {#if isDefaultImage}
        <enhanced:img
          src="$lib/assets/images/brisbane-smoke-sentinel2-2025.jpg"
          alt=""
          class="h-full w-full object-cover"
        />
      {:else}
        <img src={heroSrc} alt="" class="h-full w-full object-cover" />
      {/if}
    </BlurUpImage>
  {/if}
  <div class="hero-overlay absolute inset-0 bg-black/40"></div>
  <div class="hero-content relative z-10 text-center text-white">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Auspatious</h1>
      <p class="py-6">Spatial data intelligence</p>
    </div>
  </div>
</div>

<section class="mx-auto max-w-5xl px-6 py-16">
  <h2 class="mb-10 text-center text-3xl font-bold">Who We Are</h2>
  <div class="flex flex-wrap justify-center gap-8">
    {#each people as person}
      <div class="card w-64 bg-base-200 shadow-lg">
        <figure class="px-6 pt-6">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <enhanced:img src={person.image} alt={person.name} />
            </div>
          </div>
        </figure>
        <div class="card-body items-center text-center">
          <h3 class="card-title">{person.name}</h3>
          <p class="text-sm opacity-70">{person.title}</p>
          <div class="card-actions mt-2">
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
              View LinkedIn
            </a>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
