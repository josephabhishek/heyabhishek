import type { ReactNode } from 'react';
import { Apparatus, Label } from '@/components/ui';
import { cn } from '@/lib/cn';

/**
 * ClassificationLine — one field of the briefing header.
 *
 * The register is a research publication or a museum catalogue entry, not a
 * spy film. There is no "CONFIDENTIAL" stamp and no redaction: those are
 * costume, and a document that pretends to be secret while sitting on a public
 * URL is making a claim it cannot support.
 *
 * What makes this read as a real document is **consistency of field
 * structure** — the same labels, in the same order, in the same position,
 * every time.
 */
export interface ClassificationLineProps {
  readonly field: string;
  readonly value: ReactNode;
  readonly className?: string;
}

export function ClassificationLine({ field, value, className }: ClassificationLineProps) {
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-3', className)}>
      <Label as="dt" className="min-w-[9ch]">
        {field}
      </Label>
      <Apparatus as="dd">{value}</Apparatus>
    </div>
  );
}

/**
 * ClassificationBlock — the document's field set.
 *
 * A definition list, because that is exactly what it is: fields and their
 * values. Screen readers announce the pairing, which is the whole point of the
 * structure.
 */
export function ClassificationBlock({
  children,
  className,
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) {
  return <dl className={cn('grid gap-[var(--rhythm-apparatus)]', className)}>{children}</dl>;
}
