<script lang="ts">
  import { base } from '$app/paths';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  let {
    href,
    children,
    ...rest
  }: HTMLAnchorAttributes & { children: Snippet } = $props();
</script>

<a href="{base}{href}" {...rest}>
  {@render children()}
</a>
