import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Source } from '@/lib/content/schemas';
import { Label } from '@/components/ui';
import { Frame, type FrameVariant } from './frame';
import { SourceLine } from './source-line';
import { cn } from '@/lib/cn';

/**
 * Exhibit — evidence, presented formally.
 *
 * Composes `Frame` + media + `SourceLine`. It is the most-used component on
 * the site and the one that carries the "reverence for the ordinary" argument:
 * a plain screenshot, given a number, a caption and a provenance line, and
 * enough space around it, stops being a screenshot and becomes an exhibit.
 *
 * ### Media kinds
 * - `image` — screenshots, reports, analytics, photography. Uses `next/image`.
 * - `video` — recordings. **Poster-first, `preload="none"`**, so nothing is
 *   fetched until the reader asks. Recordings are the heaviest asset class on
 *   the site and the budget is 400KB each.
 * - `document` — a downloadable file. Renders a link that states the format
 *   and size, because a link that silently starts a 4MB download on mobile
 *   data is a hostile act.
 * - `embed` — anything else, passed as children. Tables, charts already
 *   rendered elsewhere, an iframe. Exhibit does not care what it holds.
 *
 * ### Width and height are required for images
 * Stricter than `exhibitSchema`, deliberately: undeclared dimensions cause
 * layout shift, and CLS is a hard gate. The schema should be tightened to
 * match in a later sprint.
 *
 * ### Accessibility
 * - Alt text must carry the **finding**, not the file type. "Search Console
 *   coverage report showing 0 indexed pages" — never "screenshot".
 *   `exhibitSchema` enforces a minimum length to make "screenshot" fail.
 * - An exhibit whose finding cannot be expressed in words is not usable as
 *   evidence. That is a content rule with an accessibility origin.
 * - Video carries `controls`; it is never the only carrier of its argument.
 *
 * @example
 * ```tsx
 * <Exhibit
 *   number={3}
 *   media={{ kind: 'image', src: '/images/coverage.avif',
 *            alt: 'Search Console coverage report showing zero indexed pages',
 *            width: 1600, height: 900 }}
 *   caption="Coverage report, first week after launch"
 *   source={source}
 * />
 * ```
 */
export type ExhibitMedia =
  | {
      readonly kind: 'image';
      readonly src: string;
      readonly alt: string;
      readonly width: number;
      readonly height: number;
      /** Set only on the LCP image. Everything else stays lazy. */
      readonly priority?: boolean;
    }
  | {
      readonly kind: 'video';
      readonly src: string;
      readonly poster: string;
      /** Describes what the recording shows, for readers who cannot watch it. */
      readonly description: string;
    }
  | {
      readonly kind: 'document';
      readonly href: string;
      readonly name: string;
      readonly format: string;
      readonly sizeKb: number;
    }
  | { readonly kind: 'embed' };

export interface ExhibitProps {
  readonly media: ExhibitMedia;
  /** Sequential and permanent. Enables "see Exhibit 3" in prose. */
  readonly number?: number;
  readonly caption?: ReactNode;
  readonly source: Source;
  readonly variant?: FrameVariant;
  readonly id?: string;
  /** Points at an `<Annotation id>` that explains this exhibit. */
  readonly describedBy?: string;
  readonly className?: string;
  /** Only used when `media.kind === 'embed'`. */
  readonly children?: ReactNode;
}

export function Exhibit({
  media,
  number,
  caption,
  source,
  variant = 'standard',
  id,
  describedBy,
  className,
  children,
}: ExhibitProps) {
  return (
    <div
      className={cn(className)}
      {...(id ? { id } : {})}
      {...(describedBy ? { 'aria-describedby': describedBy } : {})}
    >
      <Frame
        variant={variant}
        {...(number === undefined ? {} : { header: <Label>Exhibit {number}</Label> })}
        {...(caption === undefined ? {} : { caption })}
        footer={<SourceLine source={source} />}
      >
        <ExhibitMediaRenderer media={media}>{children}</ExhibitMediaRenderer>
      </Frame>
    </div>
  );
}

function ExhibitMediaRenderer({
  media,
  children,
}: {
  readonly media: ExhibitMedia;
  readonly children?: ReactNode;
}) {
  switch (media.kind) {
    case 'image':
      return (
        <Image
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          sizes="(min-width: 64rem) 66vw, 100vw"
          priority={media.priority ?? false}
          loading={media.priority ? 'eager' : 'lazy'}
          className="h-auto w-full"
        />
      );

    case 'video':
      return (
        // eslint-disable-next-line jsx-a11y/media-has-caption -- the recording
        // carries no speech; its argument is stated in the caption and in the
        // adjacent text equivalent, which is required by `pairSchema`.
        <video
          src={media.src}
          poster={media.poster}
          preload="none"
          controls
          playsInline
          muted
          aria-label={media.description}
          className="h-auto w-full"
        />
      );

    case 'document':
      return (
        <a
          href={media.href}
          download
          className="flex min-h-[var(--touch-min)] items-center gap-2 p-[var(--space-related)] underline underline-offset-4"
        >
          {media.name}
          <span data-apparatus="">
            {media.format.toUpperCase()}, {media.sizeKb}&nbsp;KB
          </span>
        </a>
      );

    case 'embed':
      return <>{children}</>;
  }
}
