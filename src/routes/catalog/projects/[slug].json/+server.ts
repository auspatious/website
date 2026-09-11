import { error, json } from '@sveltejs/kit';
import { projects } from '$lib/projects';
import { assetHref, bboxToPolygon, CC_BY_LINK, SITE_URL, STAC_VERSION } from '$lib/stac';

export const prerender = true;
export const entries = () => projects.map((p) => ({ slug: p.slug }));

export const GET = ({ params }: { params: { slug: string } }) => {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) error(404);

  return json({
    stac_version: STAC_VERSION,
    type: 'Feature',
    id: project.slug,
    collection: 'projects',
    geometry: bboxToPolygon(project.bbox),
    bbox: project.bbox,
    properties: {
      datetime: '2023-07-01T00:00:00Z',
      title: project.title,
      description: project.tagline
    },
    assets: {
      thumbnail: {
        href: assetHref(project.image.img.src),
        type: 'image/jpeg',
        title: `${project.title} thumbnail`,
        roles: ['thumbnail']
      }
    },
    links: [
      {
        rel: 'self',
        href: `${SITE_URL}/catalog/projects/${project.slug}.json`,
        type: 'application/geo+json'
      },
      { rel: 'root', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      {
        rel: 'parent',
        href: `${SITE_URL}/catalog/projects/collection.json`,
        type: 'application/json'
      },
      {
        rel: 'collection',
        href: `${SITE_URL}/catalog/projects/collection.json`,
        type: 'application/json'
      },
      { rel: 'alternate', href: `${SITE_URL}/projects/${project.slug}`, type: 'text/html' },
      CC_BY_LINK
    ]
  });
};
