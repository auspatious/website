<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    lqip,
    class: className = '',
    children
  }: {
    lqip: string;
    class?: string;
    children: Snippet;
  } = $props();

  let loaded = $state(false);

  function handleLoad(node: HTMLDivElement) {
    const img = node.querySelector('img');
    if (!img) return;
    if (img.complete) {
      loaded = true;
    } else {
      img.addEventListener('load', () => (loaded = true), { once: true });
    }
  }
</script>

<div
  class="relative overflow-hidden {className}"
  style:background-image="url('{lqip}')"
  style:background-size="cover"
  style:background-position="center"
>
  <div
    class="h-full w-full transition-opacity duration-700"
    class:opacity-0={!loaded}
    use:handleLoad
  >
    {@render children()}
  </div>
</div>
