import { json } from '@sveltejs/kit';
import { projects } from '$lib/projects';
import { CC_BY_LINK, CC_BY_SPDX, itemLink, selfLink, STAC_VERSION, type StacLink } from '$lib/stac';

export const prerender = true;

// The whole world — a 2:1 box, the closest a full-width global extent can get
// to the thumbnail's 1200x630 (~1.9:1) aspect ratio without cropping longitude.
const bbox: [number, number, number, number] = [-180, -90, 180, 90];

export const GET = ({ url }: { url: URL }) => {
  const links: StacLink[] = [
    selfLink(url),
    { rel: 'root', href: '../catalog.json', type: 'application/json' },
    { rel: 'parent', href: '../catalog.json', type: 'application/json' },
    CC_BY_LINK,
    ...projects.map((p) => itemLink(p.slug, p.title))
  ];

  return json({
    stac_version: STAC_VERSION,
    type: 'Collection',
    id: 'projects',
    title: 'Projects',
    description:
      'Projects delivered by Auspatious: cloud-native geospatial platforms, data products, and capability-building work for governments, research organisations, and mission-driven partners around the world.',
    license: CC_BY_SPDX,
    extent: {
      spatial: { bbox: [bbox] },
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
    links
  });
};
