import { json } from '@sveltejs/kit';
import { selfLink, STAC_VERSION, type StacLink } from '$lib/stac';

export const prerender = true;

export const GET = ({ url }: { url: URL }) => {
  const links: StacLink[] = [
    selfLink(url),
    { rel: 'root', href: './catalog.json', type: 'application/json' },
    { rel: 'alternate', href: '../', type: 'text/html', title: 'Auspatious website' },
    { rel: 'child', href: 'people/collection.json', type: 'application/json', title: 'People' },
    { rel: 'child', href: 'projects/collection.json', type: 'application/json', title: 'Projects' },
    { rel: 'child', href: 'places/collection.json', type: 'application/json', title: 'Places' }
  ];

  return json({
    stac_version: STAC_VERSION,
    type: 'Catalog',
    id: 'auspatious',
    title: 'Auspatious',
    description: `Auspatious designs and delivers cloud-native geospatial solutions that turn complex data into useful, usable products.

This static STAC catalog is a bit of fun on the side: it lists the people behind [Auspatious](https://auspatious.com), the projects we deliver, and places that matter to us, all described using the same open, cloud-native geospatial standard we build with every day.

If you'd like something like this for your business, please get in touch with us at hello@auspatious.com.`,
    links
  });
};
