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
      'Auspatious designs and delivers cloud-native geospatial solutions that turn complex data into useful, usable products. This static STAC catalog is a bit of fun on the side: it lists the people behind Auspatious, the projects we deliver, and places that matter to us, all described using the same open, cloud-native geospatial standard we build with every day.',
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
