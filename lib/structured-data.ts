import { site } from '@/config/site';
import { absoluteUrl } from '@/lib/url';

/**
 * JSON-LD builders. Structured data is emitted per route, never globally,
 * so a document's markup describes only itself.
 */

interface JsonLd {
  readonly '@context': 'https://schema.org';
  readonly '@type': string;
  readonly [key: string]: unknown;
}

export function personSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.role,
    url: absoluteUrl('/'),
    address: { '@type': 'PostalAddress', addressLocality: site.region },
    sameAs: Object.values(site.social).filter((v) => v.length > 0),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Person', name: site.name },
  };
}

export function breadcrumbSchema(trail: ReadonlyArray<{ name: string; path: string }>): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
