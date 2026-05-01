<script lang="ts">
  import { page } from '$app/state';
  import type { Component } from 'svelte';
  import type { ProjectMeta } from '$lib/projects';
  import BlurUpImage from '../../../components/BlurUpImage.svelte';

  const modules = import.meta.glob<{ meta: ProjectMeta; default: Component }>(
    '/src/content/projects/*.svx',
    { eager: true }
  );
  const bySlug = Object.fromEntries(Object.values(modules).map((m) => [m.meta.slug, m]));
  const project = $derived(bySlug[page.params.slug]);
</script>

<div class="hero relative sm:min-h-[600px] h-[50vh] overflow-hidden">
  <BlurUpImage lqip={project.meta.lqip} class="absolute max-w-7xl w-full inset-0">
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
      <h1 class="sm:text-6xl font-bold">{project.meta.title}</h1>
      <p class="mt-6 text-sm sm:text-xl font-bold tracking-[4px] uppercase">{project.meta.tagline}</p>
    </div>
  </div>
</div>

<article
  class="prose prose-a:text-ausblue mx-auto max-w-3xl px-6 py-16 [&_blockquote]:border-ausblue [&_blockquote]:not-italic [&_blockquote]:[quotes:none]"
>
  <project.default />
</article>
