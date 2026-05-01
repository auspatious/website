import { error } from '@sveltejs/kit';
import { projects } from '$lib/projects';

export const load = ({ params }: { params: { slug: string } }) => {
  if (!projects.some((p) => p.slug === params.slug)) error(404);
};

export const entries = () => projects.map((p) => ({ slug: p.slug }));

export const prerender = true;
