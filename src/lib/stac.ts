export const STAC_VERSION = '1.1.0';

/**
 * Canonical origin, used ONLY for `self` links (the one link the STAC spec requires to be
 * an absolute URI, even in an otherwise self-contained/relative-linked catalog — see
 * https://github.com/radiantearth/stac-spec/blob/master/best-practices.md#self-contained-catalogs).
 * Every other link (root/parent/collection/item/child, and links to other parts of the site)
 * is relative, so the catalog resolves correctly wherever it's actually served from
 * (production, a Cloudflare preview URL, or localhost).
 */
export const SITE_URL = 'https://auspatious.com';

export type StacLink = {
  rel: string;
  href: string;
  type?: string;
  title?: string;
};

export const CC_BY_SPDX = 'CC-BY-4.0';

export const CC_BY_LINK: StacLink = {
  rel: 'license',
  href: 'https://creativecommons.org/licenses/by/4.0/',
  title: 'Creative Commons Attribution 4.0 International'
};

/** Derives the (spec-required absolute) self link from the request path, so it can't drift from the file's actual location. */
export function selfLink(url: URL, type = 'application/json'): StacLink {
  return { rel: 'self', href: `${SITE_URL}${url.pathname}`, type };
}

/** A `rel: item` link to a sibling `<slug>.json` in the same collection directory. */
export function itemLink(slug: string, title: string): StacLink {
  return { rel: 'item', href: `${slug}.json`, type: 'application/geo+json', title };
}

/** Turns a [west, south, east, north] bbox into a rectangular GeoJSON Polygon. */
export function bboxToPolygon([w, s, e, n]: [number, number, number, number]) {
  return {
    type: 'Polygon' as const,
    coordinates: [
      [
        [w, s],
        [e, s],
        [e, n],
        [w, n],
        [w, s]
      ]
    ]
  };
}

/** Union bbox covering a set of [west, south, east, north] boxes (no antimeridian handling). */
export function unionBbox(
  boxes: [number, number, number, number][]
): [number, number, number, number] {
  const [first, ...rest] = boxes;
  return rest.reduce(
    (acc, [w, s, e, n]) => [
      Math.min(acc[0], w),
      Math.min(acc[1], s),
      Math.max(acc[2], e),
      Math.max(acc[3], n)
    ],
    first
  );
}
