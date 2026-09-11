import { json } from '@sveltejs/kit';
import { people } from '$lib/people';
import {
  CC_BY_LINK,
  CC_BY_SPDX,
  itemLink,
  selfLink,
  STAC_VERSION,
  type StacLink,
  unionBbox
} from '$lib/stac';

export const prerender = true;

const bbox = unionBbox(
  people.map((p) => [
    p.location.longitude,
    p.location.latitude,
    p.location.longitude,
    p.location.latitude
  ])
);

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
