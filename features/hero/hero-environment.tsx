import Image from 'next/image';
import { heroEnvironment } from '@/config/environment';

/**
 * HeroEnvironment — the photographed working surface.
 *
 * ### It is photography, not CSS
 * Warm paper, walnut, natural shadow and real depth come from a real
 * photograph taken in real light. They are not simulated with gradients,
 * noise or box-shadows. A CSS approximation of paper is a costume, and this
 * sprint's brief prohibits it as clearly as the art direction does.
 *
 * ### It renders nothing when there is nothing
 * With no assets configured this component returns `null`. That is deliberate:
 * the hero must be complete, legible and premium on typography and composition
 * alone. The photograph deepens it; it never carries it.
 *
 * ### It never becomes the LCP element
 * The largest contentful paint must remain the headline — text, not an image —
 * which is what makes a sub-1.8s LCP achievable on a mid-range phone over 4G.
 * The environment therefore:
 *   · is never marked `priority`
 *   · loads lazily
 *   · sits behind the content with `-z-10`
 *   · declares intrinsic dimensions so it reserves no layout shift
 *
 * ### Art direction, not scaling
 * The mobile frame is a different photograph, composed tighter with fewer
 * objects — not the desktop image squeezed. A wide desk crop at 360px is
 * unreadable clutter.
 */
export function HeroEnvironment() {
  const { surface } = heroEnvironment;

  if (!surface) return null;

  return (
    <div
      data-hero-layer="surface"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <picture>
        <source media="(min-width: 48rem)" srcSet={surface.desktop} />
        <Image
          src={surface.mobile}
          alt={surface.alt}
          width={surface.width}
          height={surface.height}
          loading="lazy"
          quality={82}
          sizes="100vw"
          className="h-full w-full object-cover object-top"
        />
      </picture>
    </div>
  );
}
