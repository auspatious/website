<script lang="ts">
  import { base } from '$app/paths';
  import { getAppState, defaultAppState, heroImageModules } from '$lib/state.svelte';
  import { people } from '$lib/people';
  import { projects } from '$lib/projects';
  import BlurUpImage from '../components/BlurUpImage.svelte';
  import heroLqip from '$lib/assets/images/brisbane-smoke-sentinel2-2025.jpg?lqip';
  import logoVertWhite from '$lib/assets/logos/as-logo-vert-white.svg';

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
  <div class="hero-content relative z-10 mt-10 flex flex-col items-center text-center text-white">
    <img src={logoVertWhite} alt="Auspatious" />
    <p class="mt-6 max-w-2xl sm:text-2xl font-space-grotesk">
      We are building a world where geospatial and Earth observation data and tools are easy to use,
      openly shared, and trusted, leading to increasing sustainability, inclusivity and equity.
    </p>
  </div>
</div>

{#snippet heading(text: string)}
  <h2 class="mb-10 font-space-grotesk text-3xl font-bold uppercase">{text}</h2>
{/snippet}

<section class="mx-auto max-w-7xl px-6 py-16">
  {@render heading('Mission')}
  <div class="ml-auto space-y-12 text-xl md:w-[85%]">
    <div>
      <p class="mb-16 text-3xl font-bold">
        Auspatious designs and delivers cloud-native geospatial solutions that turn complex data into
        useful, usable products.
      </p>
      <p class="mb-8">
        We work with governments, research organisations, and mission-driven partners to:
      </p>
      <ul class="ml-12 list-disc space-y-2 [&>li]:pl-1">
        <li>Build robust, open, and reproducible geospatial platforms</li>
        <li>Lower barriers to accessing and analysing Earth observation data</li>
        <li>Apply open standards, open data, and open-source software to problems</li>
        <li>Share knowledge, grow capability, and strengthen the global EO community.</li>
      </ul>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-16">
  {@render heading('Our Approach')}
  <div class="ml-auto text-xl md:w-[85%]">
    <ul class="space-y-6 [&>li]:border-l-2 [&>li]:border-ausblue [&>li]:py-1 [&>li]:pl-6">
      <li><strong>Open by default:</strong> open source, open data, open science</li>
      <li><strong>Cloud-native:</strong> built for secure, scalable, operational use</li>
      <li><strong>Thoughtful and collaborative:</strong> we question, learn, and co-design</li>
      <li><strong>Impact-oriented:</strong> technology in service of community and the environment</li>
      <li><strong>Anti-cynical:</strong> we believe that collaboration and trust is better for everyone</li>
    </ul>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-16">
  {@render heading('Some of our Work')}
  <div class="ml-auto grid w-full grid-cols-1 gap-8 md:w-3/4 md:grid-cols-2">
    {#each projects as project}
      <a
        href="{base}/projects/{project.slug}"
        class="group relative block aspect-video overflow-hidden rounded-md shadow-lg transition hover:shadow-xl md:rounded-xl"
      >
        <BlurUpImage lqip={project.lqip} class="absolute inset-0 overflow-hidden rounded-md md:rounded-lg">
          <enhanced:img
            src={project.image}
            alt={project.title}
            sizes="(min-width: 768px) 50vw, 100vw"
            class="h-full w-full object-cover"
          />
        </BlurUpImage>
        <div class="absolute inset-0 overflow-hidden rounded-md bg-black/70 mix-blend-multiply md:rounded-lg"></div>
        <div class="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white md:p-6">
          <h3 class="flex flex-grow text-2xl md:text-3xl">{project.title}</h3>
          <p class="text-sm md:text-base">{project.tagline}</p>
          <span class="mt-2 text-xs font-bold tracking-widest underline-offset-4 group-hover:underline md:mt-4 md:text-sm">
            View project →
          </span>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-16">
  {@render heading('Who We Are')}
  <div class="flex flex-wrap justify-end gap-8">
    {#each people as person}
      <div class="flex h-64 w-64 flex-col justify-between rounded-xl bg-black p-6 text-white shadow-lg">
        <div class="h-24 w-24 overflow-hidden rounded-full">
          <enhanced:img src={person.image} alt={person.name} class="h-full w-full object-cover" />
        </div>
        <div>
          <h3 class="text-lg font-bold">{person.name}</h3>
          <p class="text-sm opacity-70">{person.title}</p>
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-sm btn-outline mt-3"
          >
            View LinkedIn
          </a>
        </div>
      </div>
    {/each}
  </div>
</section>
