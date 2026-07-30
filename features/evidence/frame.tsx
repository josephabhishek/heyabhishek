import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Frame — the visual signature.
 *
 * Every piece of evidence on the site appears inside one: a consistent formal
 * container, with its provenance in a fixed position beneath it, and its
 * annotation in the adjacent field.
 *
 * This is what makes the work recognisable in a single screenshot with the
 * name, colour and typeface removed. It is also forgery-resistant in a way a
 * logo is not — a competitor can copy the geometry, but the frame is only
 * meaningful when it contains real sourced evidence, so copying the form
 * without the substance produces something visibly empty.
 *
 * Frame is a **container only**. It never fetches, never lazy-loads and never
 * knows what it holds. Exhibit composes it with media; Ledger composes it with
 * a record; a future component will compose it with something else.
 *
 * ### Variants
 * - `standard` — rule on all sides. The default.
 * - `bare` — no rule. For evidence whose own edges are the frame, such as a
 *   full-bleed screenshot that already has a browser chrome in it.
 * - `inset` — rule plus internal padding, for small or fragile artefacts that
 *   need air inside the container rather than around it.
 *
 * ### Accessibility
 * Renders `<figure>` when a caption is present and `<div>` otherwise. An empty
 * `<figure>` is noise in a screen-reader landmark list.
 *
 * @example
 * ```tsx
 * <Frame
 *   header={<Label>Exhibit 3</Label>}
 *   footer={<SourceLine source={source} />}
 *   caption="Coverage report, first week after launch"
 * >
 *   <Image … />
 * </Frame>
 * ```
 */
export type FrameVariant = 'standard' | 'bare' | 'inset';

export interface FrameProps {
  /** Exhibit number, label, or title. Sits above the body. */
  readonly header?: ReactNode;
  /** Provenance. Almost always a `<SourceLine>`. Sits below the caption. */
  readonly footer?: ReactNode;
  /** Neutral and factual: *what this is*. Never what it means. */
  readonly caption?: ReactNode;
  readonly variant?: FrameVariant;
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

const variantClass: Record<FrameVariant, string> = {
  standard: 'border border-[color:var(--rule-color)]',
  bare: '',
  inset: 'border border-[color:var(--rule-color)] p-[var(--space-related)]',
};

export function Frame({
  header,
  footer,
  caption,
  variant = 'standard',
  id,
  className,
  children,
}: FrameProps) {
  const Tag = caption ? 'figure' : 'div';

  return (
    <Tag data-frame={variant} className={cn('w-full', className)} {...(id ? { id } : {})}>
      {header ? <div className="mb-[var(--rhythm-apparatus)]">{header}</div> : null}

      <div className={cn(variantClass[variant])}>{children}</div>

      {caption ? (
        <figcaption className="mt-[var(--rhythm-apparatus)]">
          <span data-apparatus="" className="block">
            {caption}
          </span>
          {/* Provenance belongs to the caption, not beside it: a figure's
              caption is the place assistive technology looks for what the
              figure is and where it came from. */}
          {footer ? <span className="mt-[var(--rhythm-apparatus)] block">{footer}</span> : null}
        </figcaption>
      ) : (
        footer && <div className="mt-[var(--rhythm-apparatus)]">{footer}</div>
      )}
    </Tag>
  );
}
