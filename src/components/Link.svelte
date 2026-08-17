<script lang="ts">
  import { resolve } from '$app/paths';
  import type { Pathname } from '$app/types';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';

  let {
    href,
    children,
    ...rest
  }: Omit<HTMLAnchorAttributes, 'href'> & {
    href: Pathname;
    children: Snippet;
  } = $props();
</script>

<a href={resolve(href)} {...rest}>
  {@render children()}
</a>
