import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Icon wrapper.
 *
 * Icons are never the sole carrier of meaning. An icon is either decorative
 * (hidden from assistive technology) or it has a label — there is no third
 * case, and the required `label` prop makes the choice explicit at every use.
 */
export interface IconProps {
  readonly icon: LucideIcon;
  /** `null` marks the icon decorative and hides it from assistive tech. */
  readonly label: string | null;
  readonly size?: number;
  readonly className?: string;
}

export function Icon({ icon: Glyph, label, size = 16, className }: IconProps) {
  if (label === null) {
    return (
      <Glyph aria-hidden focusable={false} width={size} height={size} className={cn(className)} />
    );
  }

  return (
    <Glyph
      role="img"
      aria-label={label}
      focusable={false}
      width={size}
      height={size}
      className={cn(className)}
    />
  );
}
