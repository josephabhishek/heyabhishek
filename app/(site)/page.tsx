import { loadAll } from '@/lib/content/loader';
import { home } from '@/content/pages/home';
import { pageMetadata } from '@/lib/seo';
import { personSchema } from '@/lib/structured-data';
import { Hero } from '@/features/hero';
import { PageSection } from '@/features/sections';
import { Annotation } from '@/features/annotation';
import { Container, Stack } from '@/components/layout';
import { Divider, EmptyState, Heading, Link, Text } from '@/components/ui';

export const metadata = pageMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: '/',
});

/**
 * Homepage.
 *
 * A Server Component that assembles the editorial system. It invents nothing:
 * every element is a component from `features/` or `components/`, and every
 * sentence comes from `content/pages/home.ts`.
 *
 * The case study section reads the real content directory. With no published
 * case studies it renders an honest empty state — that is production
 * behaviour, not a placeholder, and it is what the page will legitimately show
 * until the first document passes schema validation.
 */
export default async function HomePage() {
  const { documents } = await loadAll('case-studies');

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- JSON-LD has no user input;
        // the object is constructed entirely from config/site.ts.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />

      <Hero problem={home.hero.problem} subheading={home.hero.subheading} />

      <Container>
        <Divider />
      </Container>

      <PageSection
        id="story"
        level={2}
        heading={home.story.heading}
        subheading={home.story.subheading}
        annotation={<Annotation placement="margin">{home.story.annotation}</Annotation>}
      >
        {home.story.body.map((paragraph) => (
          <Text key={paragraph} as="p">
            {paragraph}
          </Text>
        ))}
      </PageSection>

      <PageSection
        id="evidence"
        level={2}
        heading={home.evidence.heading}
        subheading={home.evidence.subheading}
        spacing="pause"
      />

      <PageSection
        id="process"
        level={2}
        heading={home.process.heading}
        subheading={home.process.subheading}
      >
        <Stack as="ol" gap="distinct" className="mt-[var(--space-related)]">
          {home.process.steps.map((step, index) => (
            <li key={step.title}>
              <Heading level={3} scale="title">
                <span data-numeric="tabular">{index + 1}</span> {step.title}
              </Heading>
              <Text as="p" className="mt-[var(--rhythm-heading-below)]">
                {step.body}
              </Text>
            </li>
          ))}
        </Stack>
      </PageSection>

      <PageSection
        id="cases"
        level={2}
        heading={home.cases.heading}
        subheading={home.cases.subheading}
        spacing="pause"
        evidence={documents.length === 0 ? <EmptyState>{home.cases.empty}</EmptyState> : null}
      />

      {/* The single silence per route sits before the close, so the question
          arrives after a rest rather than after more argument. */}
      <PageSection id="contact" level={2} heading={home.contact.heading} spacing="silence">
        <Text as="p">{home.contact.body}</Text>
        <Text as="p">{home.contact.commitment}</Text>
        <Text as="p">{home.contact.ownership}</Text>
        <Text as="p" className="mt-[var(--space-related)]">
          <Link href="/contact">Start a conversation</Link>
        </Text>
      </PageSection>
    </>
  );
}
