import { getContext, setContext } from 'svelte';

export type AppState = {
  serifFont: string;
  sansFont: string;
  heroImage: string;
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

export const defaultAppState: AppState = {
  serifFont: 'Inter',
  sansFont: 'Inclusive Sans',
  heroImage: 'ndvi-wofs-cairo.jpg'
};

export function initializeAppState(): AppState {
  const state = $state<AppState>({ ...defaultAppState });
  setContext('app', state);
  return state;
}

export function getAppState(): AppState {
  return getContext<AppState>('app');
}
