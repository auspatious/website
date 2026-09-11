<script lang="ts">
  import Link from '../components/Link.svelte';
</script>

<svelte:head>
  <title>Page not found — Auspatious</title>
</svelte:head>

<section
  class="flex min-h-[70svh] flex-col items-center justify-center px-6 text-center text-white"
>
  <p class="glow font-space-grotesk text-8xl font-bold sm:text-9xl">404</p>
  <h1 class="mt-6 font-space-grotesk text-xl font-bold tracking-widest uppercase sm:text-2xl">
    Lost in orbit
  </h1>
  <p class="mt-3 max-w-md text-base opacity-70 sm:text-lg">
    This page doesn't exist, or has drifted off somewhere we can't see it.
  </p>
  <Link href="/" class="btn btn-outline mt-8">Back to home</Link>
</section>

<style>
  .glow {
    background: linear-gradient(90deg, var(--color-ausblue), var(--color-auslink));
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: pulse 2.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
</style>
