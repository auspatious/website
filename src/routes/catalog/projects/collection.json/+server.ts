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
    description:
      'Projects delivered by Auspatious: cloud-native geospatial platforms, data products, and capability-building work for governments, research organisations, and mission-driven partners around the world.',
    license: CC_BY_SPDX,
    extent: {
      spatial: { bbox: [unionBbox(projects.map((p) => p.bbox))] },
      temporal: { interval: [['2023-07-01T00:00:00Z', null]] }
    },
    assets: {
      thumbnail: {
        href: 'thumbnail.jpg',
        type: 'image/jpeg',
        title: 'Projects',
        roles: ['thumbnail']
      }
    },
    links: [
      {
        rel: 'self',
        href: `${SITE_URL}/catalog/projects/collection.json`,
        type: 'application/json'
      },
      { rel: 'root', href: '../catalog.json', type: 'application/json' },
      { rel: 'parent', href: '../catalog.json', type: 'application/json' },
      CC_BY_LINK,
      ...projects.map((p) => ({
        rel: 'item',
        href: `${p.slug}.json`,
        type: 'application/geo+json',
        title: p.title
      }))
    ]
  });
