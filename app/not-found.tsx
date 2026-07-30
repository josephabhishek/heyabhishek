import { Container, PageWrapper, Section } from '@/components/layout';
import { Heading, Link, Text } from '@/components/ui';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Not found',
  description: 'That page does not exist.',
  path: '/404',
  noIndex: true,
});

/**
 * 404 — real infrastructure, not a placeholder.
 *
 * Error copy states what happened and what to do, never apologises
 * theatrically and never blames the visitor (Phase 01, voice specification).
 */
export default function NotFound() {
  return (
    <PageWrapper>
      <Container>
        <Section spacing="pause">
          <Heading level={1} scale="display">
            That page does not exist
          </Heading>
          <Text className="mt-[var(--space-related)]">
            The address may have changed, or it may never have existed.{' '}
            <Link href="/">Start from the beginning</Link>.
          </Text>
        </Section>
      </Container>
    </PageWrapper>
  );
}
