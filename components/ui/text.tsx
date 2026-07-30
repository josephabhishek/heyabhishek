import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Text primitive.
 *
 * Two registers exist and must never be confused for each other:
 *
 *   evidence    Neutral and factual. Prose, captions, ledgers, source lines.
 *   annotation  The Margin Voice. Italic by default, narrow measure, first
 *               person. It confides; it does not describe. If a piece of
 *               annotation only restates what the exhibit already shows, it is
 *               a caption and should be written as one.
 *
 * The register is a semantic choice, so it lives here rather than in a class
 * name at the point of use. Sprint 01.5 fixed the typography behind both.
 */
export type TextRegister = 'evidence' | 'annotation';

/** Seven steps. There is no eighth. */
export type TextSize = 'micro' | 'apparatus' | 'body' | 'lead';

/**
 * Tabular where numbers are compared, proportional in running prose.
 * `none` leaves the inherited setting alone.
 */
export type TextNumerals = 'tabular' | 'prose' | 'none';

/** Compressed for apparatus, standard for reading, expanded for evidence. */
export type TextDensity = 'compressed' | 'standard' | 'expanded';

const sizeClass: Record<TextSize, string> = {
  micro: 'text-[length:var(--text-micro)]',
  apparatus: 'text-[length:var(--text-apparatus)]',
  body: 'text-[length:var(--text-body)]',
  lead: 'text-[length:var(--text-lead)]',
};

export interface TextProps {
  readonly as?: ElementType;
  readonly register?: TextRegister;
  readonly size?: TextSize;
  readonly numerals?: TextNumerals;
  readonly density?: TextDensity;
  /**
   * Marks annotation as the inline (canonical) form: a leading rule and an
   * indent, read in sequence. On wide viewports the margin field is used
   * instead, which is a progressive enhancement rather than the default.
   */
  readonly inline?: boolean;
  /** Opts an annotation out of italic. Rare; needs a reason. */
  readonly upright?: boolean;
  readonly className?: string;
  /** Motion attachment point. Carries no behaviour; see features/hero. */
  readonly 'data-motion-part'?: string;
  readonly children: ReactNode;
}

export function Text({
  as: Tag = 'p',
  register = 'evidence',
  size = 'body',
  numerals = 'none',
  density,
  inline = false,
  upright = false,
  className,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      data-register={register}
      className={cn(sizeClass[size], upright && 'not-italic', className)}
      {...(register === 'annotation' && inline ? { 'data-inline': '' } : {})}
      {...(numerals === 'none' ? {} : { 'data-numeric': numerals })}
      {...(density ? { 'data-density': density } : {})}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Apparatus text — source lines, captions, caveats.
 *
 * A separate component rather than a Text variant, because the apparatus has a
 * rule attached to it that a prop cannot express: it is content, never fine
 * print. It is one step down from prose and it is never greyed into
 * invisibility, never italicised to look incidental, and never tucked away.
 * It is distinguished by position and structure, not by diminishment.
 */
export interface ApparatusProps {
  readonly as?: ElementType;
  readonly className?: string;
  readonly children: ReactNode;
}

export function Apparatus({ as: Tag = 'p', className, children }: ApparatusProps) {
  return (
    <Tag data-apparatus="" className={cn(className)}>
      {children}
    </Tag>
  );
}
