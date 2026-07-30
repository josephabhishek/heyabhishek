import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { rootMetadata } from '@/lib/seo';
import { site } from '@/config/site';
import { Providers } from '@/providers';
import { SkipLink } from '@/components/ui';

export const metadata = rootMetadata;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Zoom is never disabled: 200% must not lose function and 400% must reflow.
  maximumScale: 5,
};

/**
 * Root layout.
 *
 * Establishes the document, the landmark skeleton and the two client
 * providers. The `banner` and `contentinfo` landmarks are supplied by the
 * site shell in app/(site)/layout.tsx, with the components that fill them —
 * an empty landmark is worse than none for a screen-reader user.
 */
export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang={site.locale} suppressHydrationWarning>
      <body>
        <SkipLink />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
