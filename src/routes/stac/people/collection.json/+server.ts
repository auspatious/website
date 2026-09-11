import { json } from '@sveltejs/kit';
import { people } from '$lib/people';
import { CC_BY_LINK, CC_BY_SPDX, itemLink, selfLink, STAC_VERSION, type StacLink } from '$lib/stac';

export const prerender = true;

// Australia, sized to the thumbnail's 1200x630 (~1.9:1) aspect ratio so STAC
// clients that overlay the thumbnail on a map don't stretch/squish it to fit.
const bbox: [number, number, number, number] = [101, -44, 166, -10];

export const GET = ({ url }: { url: URL }) => {
  const links: StacLink[] = [
    selfLink(url),
    { rel: 'root', href: '../catalog.json', type: 'application/json' },
    { rel: 'parent', href: '../catalog.json', type: 'application/json' },
    CC_BY_LINK,
    ...people.map((p) => itemLink(p.slug, p.name))
  ];

  return json({
    stac_version: STAC_VERSION,
    type: 'Collection',
    id: 'people',
    title: 'People',
    description:
      'The people behind Auspatious: who we are, what we do, and where in the world we work from.',
    license: CC_BY_SPDX,
    extent: {
      spatial: { bbox: [bbox] },
      temporal: { interval: [['1970-01-01T00:00:00Z', null]] }
    },
    assets: {
      thumbnail: {
        href: 'thumbnail.jpg',
        type: 'image/jpeg',
        title: 'People',
        roles: ['thumbnail']
      }
    },
    links
  });
};
