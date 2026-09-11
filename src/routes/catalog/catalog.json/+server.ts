import { json } from '@sveltejs/kit';
import { SITE_URL, STAC_VERSION } from '$lib/stac';

export const prerender = true;

export const GET = () =>
  json({
    stac_version: STAC_VERSION,
    type: 'Catalog',
    id: 'auspatious',
    title: 'Auspatious',
    description:
      'A static STAC catalog for Auspatious: the people, projects, and places behind our work.',
    links: [
      { rel: 'self', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      { rel: 'root', href: `${SITE_URL}/catalog/catalog.json`, type: 'application/json' },
      { rel: 'alternate', href: SITE_URL, type: 'text/html', title: 'Auspatious website' },
      {
        rel: 'child',
        href: `${SITE_URL}/catalog/people/collection.json`,
        type: 'application/json',
        title: 'People'
      },
      {
        rel: 'child',
        href: `${SITE_URL}/catalog/projects/collection.json`,
        type: 'application/json',
        title: 'Projects'
      },
      {
        rel: 'child',
        href: `${SITE_URL}/catalog/places/collection.json`,
        type: 'application/json',
        title: 'Places'
      }
    ]
  });
