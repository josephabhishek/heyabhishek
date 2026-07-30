/**
 * The hero environment manifest.
 *
 * The desk environment is built from REAL PHOTOGRAPHY. Nothing here is
 * illustrated, and no material is simulated in CSS — that rule comes from the
 * art direction (ADR-0008) and from this sprint's own brief, which states that
 * texture must come from real photography or scanned assets.
 *
 * The manifest is **empty until the photographs exist**. `HeroEnvironment`
 * renders nothing at all when a layer is absent, so the hero is complete and
 * premium without it, and improves the moment assets are added. Nothing about
 * the composition depends on a photograph being present.
 *
 * To fill it: shoot the frames described in `docs/PHOTOGRAPHY.md`, put the
 * files in `public/images/environment/`, and list them here. No component
 * changes are required.
 */

export interface EnvironmentLayer {
  /** Narrow viewports. Composed tighter — fewer objects, closer crop. */
  readonly mobile: string;
  /** Wide viewports. The full desk. */
  readonly desktop: string;
  /** Intrinsic size of the desktop asset, for aspect ratio and CLS. */
  readonly width: number;
  readonly height: number;
  /**
   * Decorative by default: the environment carries atmosphere, and every
   * factual claim is made in text. If a layer ever contains readable evidence,
   * give it a real description and it stops being decorative.
   */
  readonly alt: string;
}

export interface HeroEnvironment {
  readonly surface: EnvironmentLayer | null;
}

export const heroEnvironment: HeroEnvironment = {
  surface: null,
};

/** True when there is anything to render. */
export const hasEnvironment = heroEnvironment.surface !== null;
