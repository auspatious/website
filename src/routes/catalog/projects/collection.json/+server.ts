import { json } from '@sveltejs/kit';
import { projects } from '$lib/projects';
import { CC_BY_LINK, CC_BY_SPDX, SITE_URL, STAC_VERSION, unionBbox } from '$lib/stac';

export const prerender = true;

export const GET = () =>
  json({
    stac_version: STAC_VERSION,
    type: 'Collection',
    id: 'projects',
    title: 'Projects',
    description: 'Projects delivered by Auspatious.',
    license: CC_BY_SPDX,
    extent: {
      spatial: { bbox: [unionBbox(projects.map((p) => p.bbox))] },
      temporal: { interval: [['2023-07-01T00:00:00Z', null]] }
    },
    links: [
      {
        rel: 'self',
        href: `${SITE_URL}/catalog/projects/collection.json`,
        type: 'application/json'
      },
      { rel: 'root', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      { rel: 'parent', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      CC_BY_LINK,
      ...projects.map((p) => ({
        rel: 'item',
        href: `${SITE_URL}/catalog/projects/${p.slug}.json`,
        type: 'application/geo+json',
        title: p.title
      }))
    ]
  });
