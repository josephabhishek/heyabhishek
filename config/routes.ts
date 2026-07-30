/**
 * Route registry. Navigation, sitemap and the internal link graph all read
 * from here, so a route cannot exist without being classified.
 *
 * `priority` records the shipping milestone from Phase 04, Deliverable 13.
 */
export type Milestone = 'mvp' | 'v1.1' | 'v1.2' | 'v2';

export interface RouteDefinition {
  readonly path: string;
  readonly label: string;
  readonly nav: 'primary' | 'secondary' | 'none';
  readonly milestone: Milestone;
  /** Set before authoring. Content written without a target ranks by accident. */
  readonly targetQuery: string | null;
}

export const routes = [
  { path: '/', label: 'Home', nav: 'none', milestone: 'mvp', targetQuery: null },
  { path: '/work', label: 'Work', nav: 'primary', milestone: 'mvp', targetQuery: null },
  { path: '/teardowns', label: 'Teardowns', nav: 'primary', milestone: 'mvp', targetQuery: null },
  { path: '/journal', label: 'Journal', nav: 'primary', milestone: 'mvp', targetQuery: null },
  { path: '/about', label: 'About', nav: 'primary', milestone: 'mvp', targetQuery: null },
  { path: '/contact', label: 'Contact', nav: 'primary', milestone: 'mvp', targetQuery: null },
  { path: '/process', label: 'Process', nav: 'secondary', milestone: 'mvp', targetQuery: null },
  { path: '/resume', label: 'Resume', nav: 'secondary', milestone: 'mvp', targetQuery: null },
  {
    path: '/check',
    label: 'Check your site',
    nav: 'secondary',
    milestone: 'v1.1',
    targetQuery: null,
  },
  { path: '/measure', label: 'Measure', nav: 'secondary', milestone: 'v1.1', targetQuery: null },
  { path: '/archive', label: 'Archive', nav: 'secondary', milestone: 'v2', targetQuery: null },
  {
    path: '/unresolved',
    label: 'Unresolved',
    nav: 'secondary',
    milestone: 'v2',
    targetQuery: null,
  },
] as const satisfies readonly RouteDefinition[];

export const mvpRoutes = routes.filter((r) => r.milestone === 'mvp');
export const primaryNav = mvpRoutes.filter((r) => r.nav === 'primary');
export const secondaryNav = mvpRoutes.filter((r) => r.nav === 'secondary');
