import type { ReactNode } from 'react';
import { Container } from '@/components/layout';
import { Heading, Text } from '@/components/ui';
import { cn } from '@/lib/cn';

/**
 * Hero — the framework, not yet the performance.
 *
 * The first screen must deliver a complete argument in about eleven seconds
 * **without requiring reading**: a problem the visitor recognises, one piece of
 * real evidence, and the impression of care. Everything below the fold is
 * elaboration for those who want it.
 *
 * ### What is deliberately absent
 * No logo in the first viewport, and no call to action. Both are choices, not
 * omissions: the space is worth more spent on the visitor's problem, and a CTA
 * in the first screen is an admission that you expect them to leave.
 *
 * ### LCP
 * The largest contentful element is the **problem statement — text, not an
 * image**. That is what makes a sub-1.8s LCP achievable on a mid-range phone
 * over 4G, and it must be preserved. Do not put a hero image above this text.
 *
 * ### Motion hooks
 * `data-motion="hero"` and the `data-motion-part` attributes are attachment
 * points for Sprint 04. They carry no behaviour now. Nothing in this component
 * animates, and everything it says is fully legible with motion disabled —
 * information never lives in an animation.
 *
 * ### Background layers
 * `data-hero-layer` exists so a later sprint can introduce depth without
 * restructuring the markup. It renders nothing today.
 */
export interface HeroProps {
  /** The problem, in the visitor's language. Twelve words or fewer. */
  readonly problem: ReactNode;
  /** One line of specificity: what this practice does about it. */
  readonly subheading?: ReactNode;
  /** One real artefact. A Pair, an Exhibit, or a Metric. */
  readonly evidence?: ReactNode;
  /** The Margin Voice, if the opening warrants one. */
  readonly annotation?: ReactNode;
  readonly className?: string;
}

export function Hero({ problem, subheading, evidence, annotation, className }: HeroProps) {
  return (
    <section
      data-motion="hero"
      aria-labelledby="hero-problem"
      className={cn('relative isolate', className)}
    >
      {/* Reserved for depth in a later sprint. Renders nothing and costs
          nothing today; it exists so the markup does not need restructuring. */}
      <div
        data-hero-layer="base"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <Container>
        <div className="pt-[var(--space-beat)] pb-[var(--space-pause)]">
          <Heading
            id="hero-problem"
            level={1}
            scale="display"
            data-motion-part="problem"
            className="max-w-[16ch] text-balance"
          >
            {problem}
          </Heading>

          {subheading ? (
            <Text
              as="p"
              size="lead"
              data-motion-part="subheading"
              className="mt-[var(--space-related)] max-w-[var(--measure-prose)]"
            >
              {subheading}
            </Text>
          ) : null}

          {evidence ? (
            <div data-motion-part="evidence" className="mt-[var(--space-pause)]">
              {evidence}
            </div>
          ) : null}

          {annotation ? (
            <div data-motion-part="annotation" className="mt-[var(--space-related)]">
              {annotation}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
