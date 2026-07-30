import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Annotation — the Margin Voice.
 *
 * This is the defining component of the site and the one carrying most of its
 * warmth. Everything else in the system is exact and cool; this is a person
 * thinking out loud beside the evidence.
 *
 * ### What belongs here, and what does not
 *
 * An annotation **confides**. It carries reasoning, surprise, a rejected
 * option, a second thought:
 *
 * > *"I expected the images to be the problem. They weren't — it was a
 * > third-party script I hadn't looked at."*
 *
 * A **caption describes** — "Coverage report, March 2026". If a piece of
 * annotation only restates what the exhibit already shows, it is a caption
 * and belongs in `<Frame caption>`. This distinction is the difference between
 * the component working and becoming decorative, and no prop can enforce it.
 *
 * ### Responsive behaviour — inline is canonical
 *
 * On narrow screens the annotation is an **inline interjection**: a register
 * break in the vertical flow, marked by a rule and an indent, read *in
 * sequence* with the evidence. That is the canonical form, not a fallback.
 *
 * On wide screens it may move to the margin field. That is a progressive
 * enhancement, and it is a genuine trade: the margin gains parallel reading
 * and loses guaranteed encounter, because a marginal note can be skipped
 * entirely while an interjection cannot.
 *
 * The move is done with CSS grid placement inside `<MarginField>`, so **DOM
 * order never changes**. Reading order for screen readers and for keyboard
 * users is identical at every viewport.
 *
 * ### Accessibility
 * - Set `id` and point the referent at it with `aria-describedby` when the
 *   annotation explains a specific artefact.
 * - Italic is applied by CSS, not by `<em>`, so screen readers are not told
 *   that an entire paragraph is emphasised.
 * - The rule is a `border`, so it survives forced-colors mode.
 *
 * @example
 * ```tsx
 * <Annotation id="note-3">
 *   I expected the images to be the problem. They weren&rsquo;t.
 * </Annotation>
 *
 * <Frame aria-describedby="note-3">…</Frame>
 * ```
 */
export interface AnnotationProps {
  /** Required when a referent points here with `aria-describedby`. */
  readonly id?: string;
  /**
   * `inline` — the canonical interjection, with rule and indent.
   * `margin`  — bare, for placement inside `<MarginField>`, which supplies
   *             the offset. Using `inline` inside a margin field would
   *             double the indentation.
   */
  readonly placement?: 'inline' | 'margin';
  readonly as?: 'aside' | 'div' | 'p';
  readonly className?: string;
  readonly children: ReactNode;
}

export function Annotation({
  id,
  placement = 'inline',
  as: Tag = 'aside',
  className,
  children,
}: AnnotationProps) {
  return (
    <Tag
      data-register="annotation"
      className={cn(className)}
      {...(placement === 'inline' ? { 'data-inline': '' } : {})}
      {...(id ? { id } : {})}
    >
      {children}
    </Tag>
  );
}

/**
 * MarginField — the wide-viewport annotation column.
 *
 * Places its evidence and its annotation in the same grid row so the
 * annotation sits beside what it refers to. Below the desktop breakpoint the
 * annotation span collapses to zero (see `styles/tokens/grid.css`) and both
 * children fall into one column, in DOM order.
 *
 * Use `placement="margin"` on the annotation inside this component.
 *
 * @example
 * ```tsx
 * <MarginField
 *   annotation={<Annotation placement="margin">…</Annotation>}
 * >
 *   <Exhibit … />
 * </MarginField>
 * ```
 */
export interface MarginFieldProps {
  readonly annotation?: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
}

export function MarginField({ annotation, className, children }: MarginFieldProps) {
  return (
    <div
      data-margin-field=""
      className={cn('grid gap-[var(--container-gutter)]', className)}
      style={{ gridTemplateColumns: 'repeat(var(--grid-columns), minmax(0, 1fr))' }}
    >
      <div style={{ gridColumn: 'span var(--grid-evidence-span)' }}>{children}</div>

      {annotation ? (
        <div
          style={{
            gridColumn: 'span max(var(--grid-annotation-span), var(--grid-columns))',
          }}
        >
          {annotation}
        </div>
      ) : null}
    </div>
  );
}
