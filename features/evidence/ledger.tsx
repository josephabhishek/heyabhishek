import type { ReactNode } from 'react';
import { Apparatus, Label, Text } from '@/components/ui';
import { formatDate, isoDate } from '@/lib/format';
import { cn } from '@/lib/cn';

/**
 * Ledger — chronological transparency.
 *
 * A dated, ordered record of what changed and what was got wrong. It is where
 * revisions, mistakes, open questions and planned work are shown together
 * rather than scattered, so a reader can see the shape of the thinking over
 * time instead of a single polished state.
 *
 * This is the component competitors will not copy. Publishing a revision
 * history and a mistake in the same list requires having nothing to protect,
 * and the entries accumulate into something that cannot be fabricated
 * retrospectively.
 *
 * ### Entry kinds
 * - `revision` — usually derived from `git log`, not authored by hand.
 * - `mistake` — what I thought, what happened, what I changed. Always paired
 *   with the resulting judgement; a mistake alone reads junior.
 * - `unresolved` — an open question. Not a failure, a stated limit.
 * - `next` — planned work.
 *
 * ### Status
 * `open` or `resolved`, rendered as a **word**, never a colour or an icon.
 * Colour-only status is the single most common accessibility failure in
 * components of this type.
 *
 * ### Ordering
 * Newest first by default, because a returning reader wants what changed. Pass
 * `order="oldest-first"` for a narrative reading of how something developed.
 * Sorting happens here so callers cannot introduce an inconsistent order.
 *
 * ### Accessibility
 * - An ordered list, not a table: these are events in sequence, not a grid of
 *   comparable values. Screen readers announce position and count.
 * - Each date is a `<time datetime>`.
 * - No horizontal scroll at any width; entries stack.
 *
 * @example
 * ```tsx
 * <Ledger
 *   entries={[
 *     { kind: 'mistake', date: '2026-03-12',
 *       title: 'I blamed the images',
 *       body: 'It was a third-party script. I now profile scripts first.',
 *       status: 'resolved' },
 *   ]}
 * />
 * ```
 */
export type LedgerEntryKind = 'revision' | 'mistake' | 'unresolved' | 'next';

export interface LedgerEntry {
  readonly kind: LedgerEntryKind;
  /** ISO date, YYYY-MM-DD. */
  readonly date: string;
  readonly title: ReactNode;
  readonly body?: ReactNode;
  readonly status?: 'open' | 'resolved';
  /** For revisions: the commit that produced the change. */
  readonly reference?: string;
}

const KIND_LABEL: Record<LedgerEntryKind, string> = {
  revision: 'Revised',
  mistake: 'Got wrong',
  unresolved: 'Unresolved',
  next: 'Next',
};

export interface LedgerProps {
  readonly entries: readonly LedgerEntry[];
  readonly order?: 'newest-first' | 'oldest-first';
  /** Shown when there are no entries. Honest, never cheerful. */
  readonly emptyMessage?: ReactNode;
  readonly className?: string;
}

export function Ledger({
  entries,
  order = 'newest-first',
  emptyMessage = 'Nothing recorded yet.',
  className,
}: LedgerProps) {
  if (entries.length === 0) {
    return (
      <Apparatus as="p" className={cn(className)}>
        {emptyMessage}
      </Apparatus>
    );
  }

  const sorted = [...entries].sort((a, b) =>
    order === 'newest-first' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
  );

  return (
    <ol data-ledger="" data-density="compressed" className={cn('w-full', className)}>
      {sorted.map((entry) => (
        <li
          key={`${entry.date}-${entry.kind}-${String(entry.reference ?? entry.date)}`}
          className="border-t border-[color:var(--rule-color)] py-[var(--space-related)] first:border-t-0 first:pt-0"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <Label as="span">{KIND_LABEL[entry.kind]}</Label>

            <Apparatus as="span">
              <time dateTime={isoDate(entry.date)}>{formatDate(entry.date)}</time>
            </Apparatus>

            {entry.status ? <Apparatus as="span">{entry.status}</Apparatus> : null}

            {entry.reference ? (
              <Apparatus as="span" data-numeric="tabular">
                {entry.reference}
              </Apparatus>
            ) : null}
          </div>

          <Text as="p" className="mt-[var(--rhythm-apparatus)]">
            {entry.title}
          </Text>

          {entry.body ? (
            <Text as="p" register="annotation" inline className="mt-[var(--rhythm-apparatus)]">
              {entry.body}
            </Text>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
