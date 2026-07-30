import { cn } from '@/lib/cn';

/**
 * Divider — a rule.
 *
 * Structure is exposed rather than implied (Phase 02). Rules are borders, not
 * colours, so they survive forced-colors mode.
 */
export type DividerWeight = 'hairline' | 'regular' | 'emphasis';

const weightVar: Record<DividerWeight, string> = {
  hairline: 'var(--rule-hairline)',
  regular: 'var(--rule-regular)',
  emphasis: 'var(--rule-emphasis)',
};

export interface DividerProps {
  readonly weight?: DividerWeight;
  /** Decorative by default; set a label only when the rule conveys meaning. */
  readonly label?: string;
  readonly className?: string;
}

export function Divider({ weight = 'hairline', label, className }: DividerProps) {
  return (
    <hr
      className={cn('w-full border-0 bg-[var(--rule-color)]', className)}
      style={{ height: weightVar[weight] }}
      {...(label ? { 'aria-label': label } : { 'aria-hidden': true, role: 'presentation' })}
    />
  );
}
