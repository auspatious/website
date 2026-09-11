import { json } from '@sveltejs/kit';
import { people } from '$lib/people';
import { CC_BY_LINK, CC_BY_SPDX, SITE_URL, STAC_VERSION } from '$lib/stac';

export const prerender = true;

const lons = people.map((p) => p.location.longitude);
const lats = people.map((p) => p.location.latitude);

export const GET = () =>
  json({
    stac_version: STAC_VERSION,
    type: 'Collection',
    id: 'people',
    title: 'People',
    description:
      'The people behind Auspatious: who we are, what we do, and where in the world we work from.',
    license: CC_BY_SPDX,
    extent: {
      spatial: {
        bbox: [[Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]]
      },
      temporal: { interval: [['1970-01-01T00:00:00Z', null]] }
    },
    assets: {
      thumbnail: {
        href: `${SITE_URL}/catalog/people/thumbnail.svg`,
        type: 'image/svg+xml',
        title: 'People (placeholder)',
        roles: ['thumbnail']
      }
    },
    links: [
      { rel: 'self', href: `${SITE_URL}/catalog/people/collection.json`, type: 'application/json' },
      { rel: 'root', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      { rel: 'parent', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      CC_BY_LINK,
      ...people.map((p) => ({
        rel: 'item',
        href: `${SITE_URL}/catalog/people/${p.slug}.json`,
        type: 'application/geo+json',
        title: p.name
      }))
    ]
  });
