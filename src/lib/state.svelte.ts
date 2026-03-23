import { getContext, setContext } from 'svelte';

export type AppState = {
  serifFont: string;
  sansSerifFont: string;
};

export const defaultAppState: AppState = {
  serifFont: 'Inter',
  sansSerifFont: 'Inclusive Sans'
};

export function initializeAppState(): AppState {
  const state = $state<AppState>({ ...defaultAppState });
  setContext('app', state);
  return state;
}

export function getAppState(): AppState {
  return getContext<AppState>('app');
}
