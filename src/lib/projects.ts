import type { Picture } from '@sveltejs/enhanced-img';

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  /** Longer-form summary, reused as the STAC item description. */
  description: string;
  image: Picture;
  lqip: string;
  /** Rough [west, south, east, north] extent of the project's region, for the STAC catalog. */
  bbox: [number, number, number, number];
};

export const projects: ProjectMeta[] = Object.values(
  import.meta.glob<ProjectMeta>('/src/content/projects/*.svx', {
    eager: true,
    import: 'meta'
  })
).sort((a, b) => a.title.localeCompare(b.title));
