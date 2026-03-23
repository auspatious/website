// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: Env;
      ctx: ExecutionContext;
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
    }

    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
  }
}

declare module '*?lqip' {
  const lqip: {
    lqip: string;
    width: number;
    height: number;
    src: string;
  };
  export default lqip;
}

export {};
