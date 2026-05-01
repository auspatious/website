import cloudflare from '@sveltejs/adapter-cloudflare';
import static_ from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

const ghPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx'],
  preprocess: [mdsvex({ extensions: ['.svx'] })],
  kit: {
    adapter: ghPages ? static_() : cloudflare(),
    paths: {
      base: ghPages ? process.env.BASE_PATH || '' : ''
    }
  },
  vitePlugin: {
    dynamicCompileOptions: ({ filename }) =>
      filename.includes('node_modules') ? undefined : { runes: true }
  }
};

export default config;
