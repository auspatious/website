<script lang="ts">
  import { base } from '$app/paths';
  import { page } from '$app/state';
  import { env } from '$env/dynamic/public';
  import type { Component } from 'svelte';
  import { projects, type ProjectMeta } from '$lib/projects';
  import BlurUpImage from '../../../components/BlurUpImage.svelte';
  import { revealChildren } from '$lib/reveal';

  const modules = import.meta.glob<{ meta: ProjectMeta; default: Component }>(
    '/src/content/projects/*.svx',
    { eager: true }
  );
  const bySlug = Object.fromEntries(Object.values(modules).map((m) => [m.meta.slug, m]));
  const project = $derived(bySlug[page.params.slug!]);

  const ogTitle = $derived(`${project.meta.title} — Auspatious`);
  const canonicalBaseUrl = $derived((env.PUBLIC_SITE_URL || page.url.origin).replace(/\/$/, ''));
  const ogUrl = $derived(`${canonicalBaseUrl}${page.url.pathname}`);
  const ogImage = $derived(
    project.meta.image.img.src.startsWith('http')
      ? project.meta.image.img.src
      : `${canonicalBaseUrl}${project.meta.image.img.src}`
  );

  const currentIndex = $derived(projects.findIndex((p) => p.slug === page.params.slug));
  const prev = $derived(currentIndex > 0 ? projects[currentIndex - 1] : null);
  const next = $derived(
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  );

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<svelte:head>
  <title>{ogTitle}</title>
  <meta name="description" content={project.meta.tagline} />
  <link rel="canonical" href={ogUrl} />

  <meta property="og:type" content="article" />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={project.meta.tagline} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={ogUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={ogTitle} />
  <meta name="twitter:description" content={project.meta.tagline} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="hero relative h-svh overflow-hidden">
  <BlurUpImage lqip={project.meta.lqip} class="absolute w-full inset-0">
    <enhanced:img
      src={project.meta.image}
      alt={project.meta.title}
      sizes="100vw"
      class="h-full w-full object-cover"
    />
  </BlurUpImage>
  <div class="hero-overlay absolute inset-0 bg-black/70 mix-blend-multiply"></div>
  <div class="hero-content relative z-10 mx-auto w-full max-w-3xl justify-start text-left text-white">
    <div>
      <h1 class="text-3xl sm:text-6xl font-bold">{project.meta.title}</h1>
      <p class="mt-3 sm:mt-6 text-sm sm:text-xl font-bold tracking-[1px] sm:tracking-[4px] uppercase">{project.meta.tagline}</p>
    </div>
  </div>
</div>

<article
  class="prose prose-a:text-auslink mx-auto max-w-3xl px-6 py-6 sm:py-16 [&_blockquote]:border-ausblue [&_blockquote]:not-italic [&_blockquote]:[quotes:none] [&_img]:rounded-xl"
  use:revealChildren
>
  <project.default />
</article>

<nav class="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 pb-16 text-sm text-auslink">
  {#if prev}
    <div class="flex flex-1 flex-col">
      <span class="text-white opacity-60">← Previous</span>
      <a href="{base}/projects/{prev.slug}" class="font-bold">{prev.title}</a>
    </div>
  {:else}
    <span class="flex-1"></span>
  {/if}

  <button
    onclick={scrollToTop}
    class="flex-1 cursor-pointer text-center font-bold tracking-widest uppercase"
  >
    Back to top ↑
  </button>

  {#if next}
    <div class="flex flex-1 flex-col text-right">
      <span class="text-white opacity-60">Next →</span>
      <a href="{base}/projects/{next.slug}" class="font-bold">{next.title}</a>
    </div>
  {:else}
    <span class="flex-1"></span>
  {/if}
</nav>
