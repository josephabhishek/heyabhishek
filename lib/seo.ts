import type { Metadata } from 'next';
import { site, siteUrl } from '@/config/site';
import { absoluteUrl } from '@/lib/url';

/**
 * Metadata architecture. Every route builds its metadata through here so that
 * titles, canonicals and social cards cannot be forgotten or diverge.
 */

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    // The default is intentionally minimal until the naming decision is made.
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: '',
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: siteUrl(),
  },
  twitter: { card: 'summary_large_image' },
};

export interface PageMetaInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly type?: 'website' | 'article';
  readonly publishedTime?: string;
  readonly noIndex?: boolean;
}

export function pageMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    ...(input.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      type: input.type ?? 'website',
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
    },
    twitter: { title: input.title, description: input.description },
  };
}
