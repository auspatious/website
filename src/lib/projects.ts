import type { Picture } from '@sveltejs/enhanced-img';

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  image: Picture;
  lqip: string;
};

export const projects: ProjectMeta[] = Object.values(
  import.meta.glob<ProjectMeta>('/src/content/projects/*.svx', {
    eager: true,
    import: 'meta'
  })
).sort((a, b) => a.title.localeCompare(b.title));
