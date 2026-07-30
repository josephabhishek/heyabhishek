import { loadAll } from '@/lib/content/loader';
import { home } from '@/content/pages/home';
import { buildInfo } from '@/config/build';
import { site } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import { personSchema } from '@/lib/structured-data';
import { BriefCover } from '@/features/brief';
import { HeroEnvironment } from '@/features/hero';
import { PageSection } from '@/features/sections';
import { Annotation } from '@/features/annotation';
import { Stack } from '@/components/layout';
import { EmptyState, Heading, Link, Text } from '@/components/ui';

export const metadata = pageMetadata({
  title: home.meta.title,
  description: home.meta.description,
  path: '/',
});

/**
 * Homepage — the Living Brief.
 *
 * A Server Component that assembles the design system. It invents nothing:
 * every element is a component from `features/` or `components/`, and every
 * sentence comes from `content/pages/home.ts`.
 *
 * ### Structure
 * ```
 * BriefCover              the document register — formal, fields, in sequence
 * ─────────────────────   the register boundary
 * data-register-work      the working register — margin field, evidence, pauses
 *   Method                the causal chain
 *   Evidence              exhibits
 *   Process               diagnose, fix, measure, repeat
 *   Case files            or an honest empty state
 *   Close                 a question, after a silence
 * ```
 *
 * The move from the first register to the second is the transformation. It is
 * structural, not animated: it works with JavaScript disabled, with motion
 * disabled, and before any photograph exists.
 *
 * The case study section reads the real content directory. With none published
 * it renders an honest empty state — production behaviour, not a placeholder.
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

      {/* The desk emerges behind the later chapters once photographed. Absent
          today, and the transformation does not depend on it. */}
      <HeroEnvironment />

      <BriefCover
        subject={home.brief.subject}
        headline={home.brief.headline}
        summary={home.brief.summary}
        annotation={<Annotation>{home.brief.annotation}</Annotation>}
        preparedForFallback={home.brief.preparedForFallback}
        issued={buildInfo.builtAtLabel}
        version={buildInfo.version}
        preparedBy={site.name}
        status={home.brief.status}
      />

      {/* Everything below is the working register. The document has ended and
          the investigation begins. */}
      <div data-register-work="">
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
      </div>
    </>
  );
}
