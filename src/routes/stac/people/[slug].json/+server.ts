import { error, json } from '@sveltejs/kit';
import { people } from '$lib/people';
import { bboxToPolygon, CC_BY_LINK, selfLink, STAC_VERSION, type StacLink } from '$lib/stac';

export const prerender = true;
export const entries = () => people.map((p) => ({ slug: p.slug }));

export const GET = ({ params, url }: { params: { slug: string }; url: URL }) => {
  const person = people.find((p) => p.slug === params.slug);
  if (!person) error(404);

  const links: StacLink[] = [
    selfLink(url, 'application/geo+json'),
    { rel: 'root', href: '../catalog.json', type: 'application/json' },
    { rel: 'parent', href: 'collection.json', type: 'application/json' },
    { rel: 'collection', href: 'collection.json', type: 'application/json' },
    { rel: 'about', href: person.linkedin, type: 'text/html', title: 'LinkedIn' },
    CC_BY_LINK
  ];

  return json({
    stac_version: STAC_VERSION,
    type: 'Feature',
    id: person.slug,
    collection: 'people',
    geometry: bboxToPolygon(person.location.bbox),
    bbox: person.location.bbox,
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
      },
      cv: {
        href: person.cv,
        type: 'application/pdf',
        title: `${person.name} CV`,
        roles: ['metadata']
      }
    },
    links
  });
};
