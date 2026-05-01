<script lang="ts">
  import logo from '$lib/assets/logos/as-logo-vert-tag-colour.svg';
  import { socials } from '$lib/socials';
</script>

<footer class="mx-auto flex max-w-5xl items-end justify-between p-10 pt-26 text-white">
  <p class="text-sm opacity-70">Auspatious &copy; 2026</p>
  <div class="flex flex-col items-center gap-3">
    <img src={logo} alt="Auspatious" class="h-40" />
    <div class="flex gap-4">
      {#each socials as social}
        <a href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="fill-black">
            <path d={social.svgPath} />
          </svg>
        </a>
      {/each}
    </div>
  </div>
</footer>
