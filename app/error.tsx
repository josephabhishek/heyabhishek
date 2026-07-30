'use client';

import { Container, PageWrapper, Section } from '@/components/layout';
import { Button, Heading, Text } from '@/components/ui';

/**
 * Route-level error boundary.
 *
 * Says what happened and offers a way forward. Every failure state offers a
 * human fallback where one is possible — an error is often a lead, not just a
 * bug (Phase 01, error message style).
 */
export default function RouteError({ reset }: { readonly reset: () => void }) {
  return (
    <PageWrapper>
      <Container>
        <Section spacing="pause">
          <Heading level={1} scale="display">
            Something on this page failed to load
          </Heading>
          <Text className="mt-[var(--space-related)]">
            The rest of the site is unaffected. Trying again usually works.
          </Text>
          <div className="mt-[var(--space-distinct)]">
            <Button onClick={reset}>Try again</Button>
          </div>
        </Section>
      </Container>
    </PageWrapper>
  );
}
