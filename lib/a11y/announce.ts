/**
 * Polite live-region announcer.
 *
 * Needed for route-change announcements: on client navigation a keyboard or
 * screen-reader user must be told where they now are, or they lose their place
 * (Phase 04, Deliverable 16 — blocking for the accessibility gate).
 *
 * A single shared region is created lazily; multiple regions cause
 * double-announcements in several screen readers.
 */
const REGION_ID = 'a11y-live-region';

function region(): HTMLElement | null {
  if (typeof document === 'undefined') return null;

  const existing = document.getElementById(REGION_ID);
  if (existing) return existing;

  const created = document.createElement('div');
  created.id = REGION_ID;
  created.setAttribute('role', 'status');
  created.setAttribute('aria-live', 'polite');
  created.setAttribute('aria-atomic', 'true');
  // Visually hidden without being hidden from assistive technology.
  created.style.cssText =
    'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0';
  document.body.appendChild(created);
  return created;
}

export function announce(message: string): void {
  const node = region();
  if (!node) return;
  // Clearing first forces re-announcement of an identical message.
  node.textContent = '';
  window.setTimeout(() => {
    node.textContent = message;
  }, 50);
}
