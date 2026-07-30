import type { ReactNode } from 'react';
import type { Source } from '@/lib/content/schemas';
import { Apparatus, Label } from '@/components/ui';
import { SourceLine } from './source-line';
import { cn } from '@/lib/cn';

/**
 * Metric — a number that cannot mislead.
 *
 * The brief for this component was "it should be impossible to display
 * misleading metrics". That is achieved in two places, and neither of them is
 * a runtime check:
 *
 * 1. **The type system.** `denominator`, `timeframe`, `caveat` and `source`
 *    are required props. A bare number does not compile.
 * 2. **The content schema.** `metricSchema` enforces the same fields at build
 *    time, so a number authored in MDX cannot reach this component without
 *    them.
 *
 * ### The caveat is always visible
 *
 * An earlier design put the caveat behind a disclosure. That was wrong on two
 * counts. It contradicts the rule that the apparatus is content rather than
 * fine print — a caveat that must be clicked for has been demoted. And it
 * created an accessibility problem: content inside a closed `<details>` is
 * hidden from assistive technology, so the reader most reliant on the caveat
 * would have been the least likely to receive it.
 *
 * Making it visible is simpler, more honest, and removes the special case.
 *
 * ### Qualifier
 *
 * `qualifier` prefixes the value — "approximately", "at least", "between".
 * Use it whenever the figure is not exact. Precision about imprecision is the
 * whole proposition.
 *
 * ### Accessibility
 * - Renders a `<figure>`: the value and its qualifications are one unit and
 *   are never separated by interaction.
 * - Tabular figures via `data-numeric="tabular"`, because metrics are compared.
 * - `<time>` is not used here; the timeframe is prose ("one week"), not a date.
 *
 * @example
 * ```tsx
 * <Metric
 *   value={62}
 *   unit="organic clicks"
 *   label="First week after optimisation"
 *   denominator="from 605 impressions"
 *   timeframe="7–14 March 2026"
 *   caveat="Small sample. Mostly branded queries; not competitive ranking."
 *   source={source}
 * />
 * ```
 */
export interface MetricProps {
  /** The figure itself. */
  readonly value: number | string;
  /** Hedge for an inexact figure: "approximately", "at least", "between". */
  readonly qualifier?: string;
  /** What the figure counts. Client currency wherever possible. */
  readonly unit?: string;
  /** What this measures. */
  readonly label: ReactNode;
  /** Required. What the value is out of. */
  readonly denominator: ReactNode;
  /** Required. Over what period. */
  readonly timeframe: ReactNode;
  /** Required. What this number does not prove. */
  readonly caveat: ReactNode;
  /** Required. Where it came from. */
  readonly source: Source;
  /** Hide the source line when several metrics share one, shown once below. */
  readonly hideSource?: boolean;
  readonly className?: string;
}

export function Metric({
  value,
  qualifier,
  unit,
  label,
  denominator,
  timeframe,
  caveat,
  source,
  hideSource = false,
  className,
}: MetricProps) {
  return (
    <figure data-metric="" className={cn('max-w-[var(--measure-caption)]', className)}>
      <Label as="div">{label}</Label>

      <p
        data-numeric="tabular"
        className="mt-[var(--rhythm-apparatus)] text-[length:var(--text-heading)] leading-[var(--leading-heading)] tracking-[var(--tracking-heading)]"
      >
        {qualifier ? <span className="text-[length:var(--text-body)]">{qualifier} </span> : null}
        {value}
        {unit ? <span className="text-[length:var(--text-body)]"> {unit}</span> : null}
      </p>

      <figcaption className="mt-[var(--rhythm-apparatus)]">
        <Apparatus as="p">
          {denominator}
          <span aria-hidden="true"> · </span>
          {timeframe}
        </Apparatus>

        {/* The caveat is apparatus, not the Margin Voice: it states a limit of
            the measurement, it does not think out loud. It is never hidden and
            never set smaller than the rest of the apparatus — it is the most
            important line in the component, so it carries a rule to stop it
            merging with the line above. */}
        <Apparatus as="p" data-caveat="" className="mt-[var(--rhythm-apparatus)]">
          {caveat}
        </Apparatus>

        {hideSource ? null : (
          <SourceLine source={source} className="mt-[var(--rhythm-apparatus)]" />
        )}
      </figcaption>
    </figure>
  );
}
