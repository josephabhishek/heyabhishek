import type { ReactNode } from 'react';
import { Container } from '@/components/layout';
import { Heading, ScrollHint, Text } from '@/components/ui';
import { HeroEnvironment } from './hero-environment';
import { cn } from '@/lib/cn';

/**
 * Hero — the first impression.
 *
 * The first screen must answer four questions **through composition rather
 * than paragraphs**: who this is, what they do, why they can be trusted, and
 * why the approach differs. It has roughly eleven seconds, and most of that
 * judgement is formed pre-attentively — from space, alignment and restraint —
 * before a word is read.
 *
 * ### Reading order, and why it is this order
 *
 * ```
 * 1  problem      the visitor's situation, in their language
 * 2  practice     what this is, stated once, plainly
 * 3  annotation   a human voice, at close range
 * 4  evidence     one real artefact
 * 5  action       one link, no urgency
 * 6  scroll hint  the document continues
 * ```
 *
 * The problem comes before the practitioner because every competitor opens
 * with themselves; that pattern break is what earns the second screen. The
 * annotation is what stops the composition reading as cold — the system is
 * austere at a distance and warm up close, and this is the first place that
 * warmth appears.
 *
 * ### LCP is the headline
 * Text, not an image. Preserve that. The environment photograph is lazy,
 * behind the content, and never `priority`. A hero image above this text would
 * cost roughly a second on a mid-range Android over 4G, and the whole
 * proposition is that this practice does not do that to people.
 *
 * ### Motion
 * No GSAP, no timeline, no JavaScript. Reveals are CSS scroll-driven where the
 * browser supports it, and simply absent where it does not. Everything is
 * fully legible with motion disabled.
 */
export interface HeroProps {
  /** The problem, in the visitor's language. Twelve words or fewer. */
  readonly problem: ReactNode;
  /** What this practice is. One sentence, no adjectives. */
  readonly practice?: ReactNode;
  /** A human voice at close range. Short. */
  readonly annotation?: ReactNode;
  /** One real artefact — a Metric or a Pair. Omitted until one exists. */
  readonly evidence?: ReactNode;
  /** One action. Never an imperative with urgency. */
  readonly action?: ReactNode;
  readonly className?: string;
}

export function Hero({ problem, practice, annotation, evidence, action, className }: HeroProps) {
  return (
    <section
      data-motion="hero"
      aria-labelledby="hero-problem"
      className={cn('relative isolate', className)}
    >
      <HeroEnvironment />

      <Container>
        <div
          data-hero-composition=""
          className={cn(
            // Intentional per breakpoint, not a scaled desktop layout.
            // 360: single column, tight top space, the headline dominates.
            // 768: more air above, measure widens.
            // 1024+: the composition sits in the evidence columns, leaving the
            //        annotation field empty — the asymmetry is established
            //        before it carries content, which is what makes the field
            //        read as a system rather than an accident.
            'pt-[var(--space-beat)] pb-[var(--space-pause)]',
            'md:pt-[var(--space-pause)]',
            'lg:grid lg:gap-[var(--container-gutter)]',
          )}
          style={{ gridTemplateColumns: 'repeat(var(--grid-columns), minmax(0, 1fr))' }}
        >
          <div className="lg:col-span-8" style={{ gridColumn: 'span var(--grid-evidence-span)' }}>
            <Heading
              id="hero-problem"
              level={1}
              scale="display"
              data-motion-part="problem"
              className="max-w-[15ch] text-pretty"
            >
              {problem}
            </Heading>

            {practice ? (
              <Text
                as="p"
                size="lead"
                data-motion-part="practice"
                data-reveal=""
                className="mt-[var(--space-related)] max-w-[var(--measure-prose)]"
              >
                {practice}
              </Text>
            ) : null}

            {annotation ? (
              <div
                data-motion-part="annotation"
                data-reveal=""
                className="mt-[var(--space-distinct)]"
              >
                {annotation}
              </div>
            ) : null}

            {evidence ? (
              <div data-motion-part="evidence" data-reveal="" className="mt-[var(--space-pause)]">
                {evidence}
              </div>
            ) : null}

            {action ? (
              <div data-motion-part="action" className="mt-[var(--space-distinct)]">
                {action}
              </div>
            ) : null}

            <ScrollHint className="mt-[var(--space-pause)]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
