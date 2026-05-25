<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { getAppState, defaultAppState, heroImageModules } from '$lib/state.svelte';
  import { people } from '$lib/people';
  import { projects } from '$lib/projects';
  import BlurUpImage from '../components/BlurUpImage.svelte';
  import heroLqip from '$lib/assets/images/brisbane-smoke-sentinel2-2025.jpg?lqip';
  import logoVertWhite from '$lib/assets/logos/as-logo-vert-white.svg';
  import dataAtHome from '$lib/assets/images/data-processing-at-home.jpg?enhanced';
  import indonesiaWorkshop from '$lib/assets/images/indonesia-workshop.jpg?enhanced';

  const app = getAppState();

  const heroSrc = $derived(heroImageModules[app.heroImage] ?? '');
  const isDefaultImage = $derived(app.heroImage === defaultAppState.heroImage);
  const videoSrc = $derived(`${base}/${app.heroVideo}`);

  let expandedPerson = $state<number | null>(null);

  function togglePerson(i: number) {
    expandedPerson = expandedPerson === i ? null : i;
  }

  function reveal(node: HTMLElement) {
    node.classList.add('reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('revealed');
            observer.unobserve(node);
          }
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return { destroy: () => observer.disconnect() };
  }
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
    <img
      src={logoVertWhite}
      alt="Auspatious"
      in:fly={{ y: -20, duration: 1000, delay: 200, easing: cubicOut }}
    />
    <p
      class="mt-6 max-w-2xl px-6 font-space-grotesk text-lg sm:text-2xl"
      in:fly={{ y: -20, duration: 1000, delay: 700, easing: cubicOut }}
    >
      We are building a world where geospatial and Earth observation data and tools are easy to use,
      openly shared, and trusted, leading to increasing sustainability, inclusivity and equity.
    </p>
  </div>
</div>

{#snippet heading(text: string)}
  <h2 class="mb-10 font-space-grotesk text-3xl font-bold tracking-widest uppercase">{text}</h2>
{/snippet}

<section class="mx-auto max-w-7xl px-6 my-8 md:my-16">
  {@render heading('Mission')}
  <div class="ml-auto space-y-12 text-base md:w-[85%] md:text-xl">
    <div>
      <p class="mb-8 text-xl font-bold md:mb-16 md:text-3xl" use:reveal>
        Auspatious designs and delivers cloud-native geospatial solutions that turn complex data into
        useful, usable products.
      </p>
      <p class="mb-8" use:reveal>
        We work with governments, research organisations, and mission-driven partners to:
      </p>
      <ul class="ml-6 list-disc space-y-2 [&>li]:pl-1 md:ml-12">
        <li use:reveal>Build robust, open, and reproducible geospatial platforms</li>
        <li use:reveal>Lower barriers to accessing and analysing Earth observation data</li>
        <li use:reveal>Apply open standards, open data, and open-source software to problems</li>
        <li use:reveal>Share knowledge, grow capability, and strengthen the global EO community.</li>
      </ul>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 my-8 md:my-16">
  {@render heading('Our Approach')}
  <div class="ml-auto text-base md:w-[85%] md:text-xl">
    <ul class="space-y-6 [&>li]:border-l-2 [&>li]:border-ausblue [&>li]:py-1 [&>li]:pl-6">
      <li use:reveal><strong>Open by default:</strong> open source, open data, open science</li>
      <li use:reveal><strong>Cloud-native:</strong> built for secure, scalable, operational use</li>
      <li use:reveal><strong>Thoughtful and collaborative:</strong> we question, learn, and co-design</li>
      <li use:reveal><strong>Impact-oriented:</strong> technology in service of community and the environment</li>
      <li use:reveal><strong>Anti-cynical:</strong> we believe that collaboration and trust is better for everyone</li>
    </ul>
  </div>
</section>

<section class="mx-auto grid min-h-svh w-full max-w-7xl snap-start md:min-h-0 md:h-[50svh] grid-cols-1 overflow-hidden rounded-t-[2rem] border-x-[8px] border-t-[8px] border-ausblue bg-[#232323] md:grid-cols-2 md:rounded-t-[3rem] md:border-x-[16px] md:border-t-[16px]">
  <div class="flex flex-col px-6 py-16 md:px-16">
    {@render heading('What We Do')}
    <div class="flex flex-1 items-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mx-auto mb-6 h-12 w-12"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <h3 class="mb-6 text-center font-space-grotesk text-xl font-bold uppercase md:text-2xl">
          Software development
        </h3>
        <p class="text-center text-base md:text-xl">
          We build and maintain geospatial software that is simple, robust, and fit for purpose. Our
          focus is on good architecture, sensible abstractions, and long-term maintainability, not
          code for its own sake. Sometimes that means writing software; sometimes it means
          integrating existing tools; and sometimes the best solution is writing no code at all. We
          love open source software and contribute upstream whenever possible.
        </p>
      </div>
    </div>
  </div>
  <div class="relative hidden min-h-[50vh] md:block md:min-h-0">
    <enhanced:img
      src={dataAtHome}
      alt=""
      sizes="(min-width: 768px) 50vw, 100vw"
      class="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</section>

<section class="-mt-[2rem] relative z-10 mx-auto grid min-h-svh w-full max-w-7xl snap-start md:min-h-0 md:h-[50svh] grid-cols-1 overflow-hidden rounded-t-[2rem] border-x-[8px] border-t-[8px] border-ausblue bg-[#D9D9D9] text-black md:-mt-[3rem] md:grid-cols-2 md:rounded-t-[3rem] md:border-x-[16px] md:border-t-[16px]">
  <div class="flex min-h-svh snap-start items-center bg-[#D9D9D9] px-6 py-16 md:min-h-0 md:px-16">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mx-auto mb-6 h-12 w-12"
      >
        <path d="M2 19V5a2 2 0 0 1 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
        <circle cx="13" cy="14" r="2" />
        <path d="M13 12v-2" />
        <path d="M13 16v2a2 2 0 0 0 2 2h2" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      <h3 class="mb-6 text-center font-space-grotesk text-xl font-bold uppercase md:text-2xl">
        Project design and delivery
      </h3>
      <p class="text-center text-base md:text-xl">
        We help shape and deliver complex geospatial projects from idea to implementation. Working
        closely with stakeholders and iterating early, we reduce risk, maintain momentum, and deliver
        systems that create lasting value.
      </p>
    </div>
  </div>
  <div class="flex min-h-svh snap-start items-center bg-white px-6 py-16 md:min-h-0 md:px-16">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mx-auto mb-6 h-12 w-12"
      >
        <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 7 19h10.5Z" />
      </svg>
      <h3 class="mb-6 text-center font-space-grotesk text-xl font-bold uppercase md:text-2xl">
        Cloud infrastructure
      </h3>
      <p class="text-center text-base md:text-xl">
        Auspatious designs secure, scalable infrastructure using modern cloud-native patterns and
        Infrastructure as Code. Security, reliability, and simplicity are built in from the start,
        ensuring systems are reproducible, understandable, and ready to scale.
      </p>
    </div>
  </div>
</section>

<section class="-mt-[2rem] relative z-20 mx-auto grid min-h-svh w-full max-w-7xl snap-start md:min-h-0 md:h-[50svh] grid-cols-1 overflow-hidden rounded-[2rem] border-[8px] border-ausblue bg-[#232323] md:-mt-[3rem] md:grid-cols-2 md:rounded-[3rem] md:border-[16px]">
  <div class="relative hidden min-h-[50vh] md:block md:min-h-0">
    <enhanced:img
      src={indonesiaWorkshop}
      alt=""
      sizes="(min-width: 768px) 50vw, 100vw"
      class="absolute inset-0 h-full w-full object-cover"
    />
  </div>
  <div class="flex items-center px-6 py-16 md:px-16">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mx-auto mb-6 h-12 w-12"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
      <h3 class="mb-6 text-center font-space-grotesk text-xl font-bold uppercase md:text-2xl">
        Cloud-native geospatial
      </h3>
      <p class="text-center text-base md:text-xl">
        Cloud-native geospatial is our core expertise. We design platforms and pipelines that make
        geospatial and Earth observation data scalable, accessible, and useful. We are trained and
        certified in information security practices.
      </p>
    </div>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 my-8 md:my-16">
  {@render heading('Some of our Work')}
  <div class="ml-auto grid w-full grid-cols-1 gap-8 md:w-3/4 md:grid-cols-2">
    {#each projects as project}
      <a
        href="{base}/projects/{project.slug}"
        class="group relative block aspect-video overflow-hidden rounded-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl md:rounded-xl"
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
          <span class="mt-2 text-xs font-bold tracking-widest text-ausblue underline-offset-4 group-hover:underline md:mt-4 md:text-sm">
            View project →
          </span>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 my-8 md:my-16">
  {@render heading('Who We Are')}
  <div class="flex flex-wrap justify-center gap-8 md:justify-end">
    {#each people as person, i}
      <div
        class="flex w-64 cursor-pointer flex-col overflow-hidden rounded-xl bg-black shadow-lg transition-shadow duration-300 md:h-64 md:flex-row {expandedPerson === i
          ? '!w-full md:flex-1'
          : 'hover:scale-105'} hover:shadow-2xl"
        onclick={() => togglePerson(i)}
        onkeydown={(e) => e.key === 'Enter' && togglePerson(i)}
        onfocusout={() => (expandedPerson = null)}
        role="button"
        tabindex="0"
      >
        <div class="flex h-64 w-full shrink-0 flex-col items-center justify-between p-6 text-center text-white md:w-64 md:items-start md:text-left">
          <div class="h-24 w-24 overflow-hidden rounded-full">
            <enhanced:img src={person.image} alt={person.name} class="h-full w-full object-cover" />
          </div>
          <div>
            <h3 class="text-2xl font-bold">{person.name}</h3>
            <p class="text-sm opacity-70">{person.title}</p>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-sm btn-outline mt-3"
              onclick={(e: MouseEvent) => e.stopPropagation()}
            >
              View LinkedIn
            </a>
          </div>
        </div>
        <div
          class="overflow-hidden {expandedPerson === i
            ? 'flex-1'
            : 'hidden'}"
        >
          <div class="max-h-64 overflow-y-auto border-t border-white/10 px-5 py-6 text-base text-white md:h-full md:max-h-none md:min-w-64 md:border-t-0 md:border-l">
            {#each person.bio as paragraph}
              <p class="mb-3">{paragraph}</p>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>
