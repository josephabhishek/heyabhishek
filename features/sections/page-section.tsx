import type { ReactNode } from 'react';
import { Container, Section, type SectionSpacing } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { MarginField } from '@/features/annotation';
import { cn } from '@/lib/cn';

/**
 * PageSection — the reusable section architecture.
 *
 * Every section on every route is built from this. It exists so that a page is
 * *assembled* rather than invented: spacing, heading levels, measure and the
 * annotation relationship are decided once here, not re-decided per section.
 *
 * ### Slots
 * ```
 * eyebrow      small label above the heading
 * heading      required; `level` is required so the outline stays correct
 * subheading   one line of specificity the heading could not carry
 * body         prose
 * annotation   the Margin Voice — beside on wide screens, in sequence below
 * evidence     an Exhibit, Metric, Pair or Ledger
 * media        full-width media that should escape the prose measure
 * cta          one action, at the end
 * ```
 *
 * ### Heading levels are a prop, not a guess
 * `level` is required. A section cannot silently emit an `h2` in a context
 * that needs `h3`, because heading order is a structural fact and skipping a
 * level breaks screen-reader navigation.
 *
 * ### Spacing
 * `spacing` maps to the semantic tokens: `beat` between narrative beats,
 * `pause` before evidence, `silence` for the single rest per route. The amount
 * of space states what kind of relationship it marks.
 *
 * @example
 * ```tsx
 * <PageSection
 *   level={2}
 *   heading="What I found"
 *   annotation={<Annotation placement="margin">…</Annotation>}
 *   evidence={<Exhibit … />}
 * >
 *   <Text>…</Text>
 * </PageSection>
 * ```
 */
export interface PageSectionProps {
  readonly id?: string;
  readonly level: 2 | 3;
  readonly eyebrow?: ReactNode;
  readonly heading: ReactNode;
  readonly subheading?: ReactNode;
  readonly annotation?: ReactNode;
  readonly evidence?: ReactNode;
  readonly media?: ReactNode;
  readonly cta?: ReactNode;
  readonly spacing?: SectionSpacing;
  readonly className?: string;
  readonly children?: ReactNode;
}

export function PageSection({
  id,
  level,
  eyebrow,
  heading,
  subheading,
  annotation,
  evidence,
  media,
  cta,
  spacing = 'beat',
  className,
  children,
}: PageSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  const header = (
    <>
      {eyebrow ? (
        <Text as="p" size="apparatus" className="mb-[var(--rhythm-apparatus)]">
          {eyebrow}
        </Text>
      ) : null}

      <Heading
        level={level}
        scale={level === 2 ? 'heading' : 'title'}
        {...(headingId ? { id: headingId } : {})}
      >
        {heading}
      </Heading>

      {subheading ? (
        <Text
          as="p"
          size="lead"
          className="mt-[var(--rhythm-heading-below)] max-w-[var(--measure-prose)]"
        >
          {subheading}
        </Text>
      ) : null}
    </>
  );

  const body = children ? (
    <div data-editorial="" className="mt-[var(--space-related)]">
      {children}
    </div>
  ) : null;

  return (
    <Section
      spacing={spacing}
      className={cn(className)}
      {...(id ? { id } : {})}
      {...(headingId ? { labelledBy: headingId } : {})}
    >
      <Container>
        {annotation ? (
          <MarginField annotation={annotation}>
            {header}
            {body}
          </MarginField>
        ) : (
          <>
            {header}
            {body}
          </>
        )}

        {evidence ? <div className="mt-[var(--space-pause)]">{evidence}</div> : null}
        {media ? <div className="mt-[var(--space-pause)]">{media}</div> : null}
        {cta ? <div className="mt-[var(--space-distinct)]">{cta}</div> : null}
      </Container>
    </Section>
  );
}
