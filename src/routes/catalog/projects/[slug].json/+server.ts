import { error, json } from '@sveltejs/kit';
import { projects } from '$lib/projects';
import { bboxToPolygon, CC_BY_LINK, SITE_URL, STAC_VERSION } from '$lib/stac';

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
      description: project.description
    },
    assets: {
      thumbnail: {
        href: project.image.img.src,
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
      { rel: 'root', href: '../catalog.json', type: 'application/json' },
      { rel: 'parent', href: 'collection.json', type: 'application/json' },
      { rel: 'collection', href: 'collection.json', type: 'application/json' },
      { rel: 'alternate', href: `../../projects/${project.slug}`, type: 'text/html' },
      CC_BY_LINK
    ]
  });
};
