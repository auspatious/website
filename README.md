# Auspatious' Website

## Copyright and License

All code is made available under Apache 2.0 and any content is Copyright Auspatious, made available
under [CC-BY]([https://](https://creativecommons.org/licenses/by/4.0/deed.en).

## Dev Notes

This is a [SvelteKit](https://svelte.dev/docs/kit) project using [Tailwind CSS](https://tailwindcss.com/)
with [daisyUI](https://daisyui.com/), and deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/).

### Getting Started

Install dependencies with [pnpm](https://pnpm.io/):

```sh
pnpm install
```

Start a development server:

```sh
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

### Building and Previewing

Build for production:

```sh
pnpm build
```

Preview the production build locally using Wrangler:

```sh
pnpm preview
```

### Other Commands

```sh
pnpm check        # Run svelte-check for type checking
pnpm lint         # Check formatting (Prettier) and linting (ESLint)
pnpm format       # Auto-format with Prettier
pnpm gen          # Generate Cloudflare Worker types with Wrangler
```
