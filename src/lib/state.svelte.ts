import { getContext, setContext } from 'svelte';

export type AppState = {
  mainFont: string;
  heroType: 'image' | 'video';
  heroImage: string;
  heroVideo: string;
};

// Glob import of all hero images for dev menu switching (resolved at build time)
export const heroImageModules = Object.fromEntries(
  Object.entries(
    import.meta.glob('$lib/assets/images/*', { eager: true, import: 'default' }) as Record<
      string,
      string
    >
  ).map(([path, src]) => [path.split('/').pop()!, src])
);

export const heroImageNames = Object.keys(heroImageModules);

export const heroVideos = ['nasa.webm'];

export const defaultAppState: AppState = {
  mainFont: 'Space Grotesk',
  heroType: 'image',
  heroImage: 'brisbane-smoke-sentinel2-2025.jpg',
  heroVideo: 'nasa.webm'
};

export function initializeAppState(): AppState {
  const state = $state<AppState>({ ...defaultAppState });
  setContext('app', state);
  return state;
}

export function getAppState(): AppState {
  return getContext<AppState>('app');
}
