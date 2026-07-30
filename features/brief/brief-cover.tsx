import type { ReactNode } from 'react';
import { Container } from '@/components/layout';
import { Heading, ScrollHint, Text } from '@/components/ui';
import { ClassificationBlock, ClassificationLine } from './classification';
import { PreparedFor } from './prepared-for';
import { cn } from '@/lib/cn';

/**
 * BriefCover — the opening chapter.
 *
 * Not a hero. The first viewport is the cover of a briefing document, and the
 * visitor should feel they have been handed something prepared rather than
 * shown something advertised.
 *
 * ### Reading order
 * ```
 * 1  Subject          the visitor's category — about them, before us
 * 2  Headline         the finding, stated as a finding
 * 3  Summary          one paragraph of executive summary
 * 4  Prepared for     the interaction. Optional. Names the reader.
 * 5  Classification   date · version · prepared by · status
 * 6  Scroll rule      the document continues
 * ```
 *
 * Subject comes first because a brief is addressed to a situation. Every
 * competitor's first screen is addressed to itself.
 *
 * ### The document register
 * This chapter is the only place on the site that uses the formal field
 * structure. As the visitor descends, the document register gives way to the
 * working register — annotation in the margin, evidence in frames, the
 * asymmetric field active. That transition is the transformation, and it is
 * structural rather than decorative: see `styles/editorial.css`.
 *
 * ### LCP
 * The headline is the largest contentful paint. Text, not an image. Preserve
 * that: a cover image here would cost roughly a second on a mid-range Android
 * over 4G, and the argument this document makes is that this practice does not
 * do that to people.
 */
export interface BriefCoverProps {
  /** The visitor's category. Appears above the headline. */
  readonly subject: ReactNode;
  /** The finding. Twelve words or fewer. */
  readonly headline: ReactNode;
  /** One paragraph. The executive summary. */
  readonly summary?: ReactNode;
  /** Default addressee, shown until the visitor names themselves. */
  readonly preparedForFallback: string;
  /** ISO date, rendered from the build record. */
  readonly issued: string;
  readonly version: string;
  readonly preparedBy: string;
  /** Honest status of the document — e.g. "3 live clients, first case in preparation". */
  readonly status: ReactNode;
  /** A human voice at close range. */
  readonly annotation?: ReactNode;
  /** One real artefact. Omitted until one exists. */
  readonly evidence?: ReactNode;
  readonly className?: string;
}

export function BriefCover({
  subject,
  headline,
  summary,
  preparedForFallback,
  issued,
  version,
  preparedBy,
  status,
  annotation,
  evidence,
  className,
}: BriefCoverProps) {
  return (
    <section
      data-chapter="brief"
      data-register-document=""
      aria-labelledby="brief-headline"
      className={cn('relative isolate', className)}
    >
      <Container>
        <div
          className="pt-[var(--space-beat)] pb-[var(--space-pause)] md:pt-[var(--space-pause)] lg:grid lg:gap-[var(--container-gutter)]"
          style={{ gridTemplateColumns: 'repeat(var(--grid-columns), minmax(0, 1fr))' }}
        >
          {/* Columns 9–12 stay empty here, deliberately. The asymmetric field
              is established before it carries content, which is what makes it
              read as a system rather than a layout accident. It is also this
              route's silence, placed at the opening rather than the middle. */}
          <div style={{ gridColumn: 'span var(--grid-evidence-span)' }}>
            {/* A one-item list, not a bare pair: <dt>/<dd> outside a <dl> is
                invalid markup and is announced badly by screen readers. */}
            <ClassificationBlock>
              <ClassificationLine field="Subject" value={subject} />
            </ClassificationBlock>

            <Heading
              id="brief-headline"
              level={1}
              scale="display"
              data-motion-part="headline"
              className="mt-[var(--space-related)] max-w-[15ch] text-pretty"
            >
              {headline}
            </Heading>

            {summary ? (
              <Text
                as="p"
                size="lead"
                data-reveal=""
                className="mt-[var(--space-related)] max-w-[var(--measure-prose)]"
              >
                {summary}
              </Text>
            ) : null}

            {annotation ? (
              <div data-reveal="" className="mt-[var(--space-distinct)]">
                {annotation}
              </div>
            ) : null}

            <PreparedFor fallback={preparedForFallback} className="mt-[var(--space-pause)]" />

            {evidence ? (
              <div data-reveal="" className="mt-[var(--space-pause)]">
                {evidence}
              </div>
            ) : null}

            <ClassificationBlock className="mt-[var(--space-pause)] border-t border-[color:var(--rule-color)] pt-[var(--space-related)]">
              <ClassificationLine field="Issued" value={issued} />
              <ClassificationLine field="Version" value={version} />
              <ClassificationLine field="By" value={preparedBy} />
              <ClassificationLine field="Status" value={status} />
            </ClassificationBlock>

            <ScrollHint label="Begin reading" className="mt-[var(--space-distinct)]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
