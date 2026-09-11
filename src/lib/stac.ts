export const STAC_VERSION = '1.1.0';
export const SITE_URL = 'https://auspatious.com';
export const CATALOG_HREF = `${SITE_URL}/catalog/catalog.json`;

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

/** Resolves an enhanced-img asset path to an absolute URL for use as a STAC asset href. */
export function assetHref(src: string): string {
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
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
