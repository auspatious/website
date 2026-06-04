<script lang="ts">
  import { fade, scale } from 'svelte/transition';

  let { open = $bindable(false) }: { open?: boolean } = $props();

  const email = 'hello@auspatious.com';
  let copied = $state(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      // ignore
    }
  }
</script>

{#if open}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <button
      class="absolute inset-0 bg-black/60"
      aria-label="Close"
      onclick={() => (open = false)}
      transition:fade={{ duration: 150 }}
    ></button>
    <div
      class="relative w-full max-w-lg rounded-3xl bg-white p-10 text-black shadow-2xl"
      transition:scale={{ duration: 150, start: 0.95 }}
    >
      <button
        class="absolute top-5 right-5 cursor-pointer text-2xl leading-none text-black/40 hover:text-black"
        aria-label="Close"
        onclick={() => (open = false)}
      >
        &times;
      </button>

      <div class="text-xl font-bold">Get in touch</div>
      <p class="mt-1 text-black/70">
        We'd love to hear from you. Send us an email and we'll get back to you as soon as possible.
      </p>

      <div class="mt-8">
        <h3 class="font-bold text-black/50">Email us at</h3>
        <div class="relative mt-2">
          <input
            type="text"
            readonly
            value={email}
            class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-14 text-black"
          />
          <button
            class="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-gray-200 text-black/70 hover:bg-gray-300"
            aria-label="Copy email"
            onclick={copyEmail}
          >
            {#if copied}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            {:else}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            {/if}
          </button>
        </div>
      </div>

      <div class="mt-8 flex justify-end">
        <a
          href="mailto:{email}"
          class="rounded-lg bg-ausblue px-8 py-3 font-bold text-white transition hover:opacity-90"
        >
          Open email
        </a>
      </div>
    </div>
  </div>
{/if}
