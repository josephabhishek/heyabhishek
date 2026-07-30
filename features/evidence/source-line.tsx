import type { ReactNode } from 'react';
import type { Source, Revision } from '@/lib/content/schemas';
import { Apparatus } from '@/components/ui';
import { formatDate, formatDateRange, isoDate } from '@/lib/format';
import { cn } from '@/lib/cn';

/**
 * SourceLine — provenance.
 *
 * Every piece of evidence on this site carries one, in the same format, in the
 * same position. That unvarying repetition is the point: consistency across
 * hundreds of instances reads as a system rather than as a series of choices.
 *
 * The format is deliberately close to an auction catalogue's provenance line.
 * It does two jobs at once — it makes a claim checkable, and it makes plain
 * evidence feel considered. The honesty apparatus and the quality signal are
 * the same element.
 *
 * ### Composition
 * `tool · subject · dates · method · exclusions · status`
 *
 * `exclusions` is the field that matters most in practice. "Branded queries
 * excluded" appearing routinely, unprompted, does more for credibility than
 * any claim, because it is the distinction most practitioners rely on a reader
 * not knowing to ask about.
 *
 * ### Accessibility
 * - Dates render inside `<time datetime>` so they are machine-readable.
 * - `status` is a visible word, never a colour or an icon.
 * - Rendered as a `<dl>`-free single line: a definition list would be read
 *   term-by-term by screen readers and this is one continuous statement.
 *
 * @example
 * ```tsx
 * <SourceLine source={exhibit.source} />
 * <SourceLine source={exhibit.source} revision={latestRevision} />
 * ```
 */
export interface SourceLineProps {
  readonly source: Source;
  /** Most recent revision, when the document has been amended. */
  readonly revision?: Revision;
  /** Rendered before the tool, e.g. "Exhibit 3". */
  readonly prefix?: ReactNode;
  readonly className?: string;
}

const STATUS_LABEL: Record<Source['status'], string | null> = {
  // The default needs no label: unlabelled means measured.
  measured: null,
  'self-reported': 'self-reported',
  estimated: 'estimated',
};

export function SourceLine({ source, revision, prefix, className }: SourceLineProps) {
  const { start, end } = source.dateRange;
  const statusLabel = STATUS_LABEL[source.status];

  return (
    <Apparatus as="p" className={cn('flex flex-wrap items-baseline gap-x-2', className)}>
      {prefix ? <Separated first>{prefix}</Separated> : null}

      <Separated first={!prefix}>
        {source.url ? (
          <a href={source.url} rel="noreferrer noopener" target="_blank">
            {source.tool}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          source.tool
        )}
      </Separated>

      <Separated>{source.subject}</Separated>

      <Separated>
        <time dateTime={isoDate(start)}>{formatDateRange(start, end)}</time>
      </Separated>

      <Separated>{source.method}</Separated>

      {source.exclusions ? <Separated>{source.exclusions}</Separated> : null}

      {statusLabel ? <Separated>{statusLabel}</Separated> : null}

      {revision ? (
        <Separated>
          revised <time dateTime={isoDate(revision.date)}>{formatDate(revision.date)}</time>
        </Separated>
      ) : null}
    </Apparatus>
  );
}

/**
 * One field of the source line, with its separator.
 *
 * The separator is a real character in the markup rather than a CSS
 * `::before`, so it survives copy-paste into an email — which is how a source
 * line most often gets checked.
 */
function Separated({
  first = false,
  children,
}: {
  readonly first?: boolean;
  readonly children: ReactNode;
}) {
  return (
    <span>
      {first ? null : <span aria-hidden="true">· </span>}
      {children}
    </span>
  );
}
