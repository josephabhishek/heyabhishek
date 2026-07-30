import type { ReactNode } from 'react';
import { Nav, Footer } from '@/components/navigation';
import { PageWrapper } from '@/components/layout';

/**
 * Site shell.
 *
 * Carries the navigation and footer landmarks. `/resume` deliberately lives
 * outside this group: a recruiter should never be routed through the homepage
 * narrative, so that route renders on a bare shell.
 */
export default function SiteLayout({ children }: { readonly children: ReactNode }) {
  return (
    <>
      <Nav />
      <PageWrapper>{children}</PageWrapper>
      <Footer />
    </>
  );
}
