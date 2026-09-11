import { error, json } from '@sveltejs/kit';
import { people } from '$lib/people';
import { CC_BY_LINK, SITE_URL, STAC_VERSION } from '$lib/stac';

export const prerender = true;
export const entries = () => people.map((p) => ({ slug: p.slug }));

export const GET = ({ params }: { params: { slug: string } }) => {
  const person = people.find((p) => p.slug === params.slug);
  if (!person) error(404);

  return json({
    stac_version: STAC_VERSION,
    type: 'Feature',
    id: person.slug,
    collection: 'people',
    geometry: {
      type: 'Point',
      coordinates: [person.location.longitude, person.location.latitude]
    },
    bbox: [
      person.location.longitude,
      person.location.latitude,
      person.location.longitude,
      person.location.latitude
    ],
    properties: {
      datetime: '1970-01-01T00:00:00Z',
      title: person.name,
      description: person.bio.join('\n\n'),
      job_title: person.title
    },
    assets: {
      photo: {
        href: person.image.img.src,
        type: 'image/jpeg',
        title: `${person.name} headshot`,
        roles: ['thumbnail']
      }
    },
    links: [
      {
        rel: 'self',
        href: `${SITE_URL}/catalog/people/${person.slug}.json`,
        type: 'application/geo+json'
      },
      { rel: 'root', href: '../catalog.json', type: 'application/json' },
      { rel: 'parent', href: 'collection.json', type: 'application/json' },
      { rel: 'collection', href: 'collection.json', type: 'application/json' },
      CC_BY_LINK
    ]
  });
};
