import Link from 'next/link';
import { primaryNav, secondaryNav } from '@/config/routes';
import { site } from '@/config/site';
import { Apparatus, Label } from '@/components/ui';
import { LANDMARK } from '@/lib/a11y/ids';
import { buildInfo } from '@/config/build';
import { cn } from '@/lib/cn';

/**
 * Site footer.
 *
 * Minimal and editorial: navigation, contact, and the build record. A Server
 * Component — nothing here needs interaction.
 *
 * ### The build record
 * Version and build date are published rather than hidden. On a site whose
 * argument is that everything can be checked, stating which version of itself
 * a reader is looking at is consistent — and it is genuinely useful when
 * someone reports a problem.
 *
 * ### Social links
 * Rendered only when configured. An empty social row is worse than none: it
 * advertises absence. `config/site.ts` currently holds one real link.
 */
export function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url.length > 0);
  const hasContact = site.contact.email.length > 0 || site.contact.whatsapp.length > 0;

  return (
    <footer
      id={LANDMARK.footer}
      data-print="hide"
      className="mt-[var(--space-silence)] border-t border-[color:var(--rule-color)]"
    >
      <div className="mx-auto w-full max-w-[var(--content-max)] px-[var(--container-margin)] py-[var(--space-beat)]">
        <div className="grid gap-[var(--space-distinct)] md:grid-cols-3">
          <FooterColumn label="Pages">
            {primaryNav.map((route) => (
              <FooterLink key={route.path} href={route.path}>
                {route.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn label="More">
            {secondaryNav.map((route) => (
              <FooterLink key={route.path} href={route.path}>
                {route.label}
              </FooterLink>
            ))}
            <FooterLink href="/rss.xml">RSS</FooterLink>
          </FooterColumn>

          <FooterColumn label="Elsewhere">
            {hasContact ? (
              <>
                {site.contact.email.length > 0 ? (
                  <FooterLink href={`mailto:${site.contact.email}`} external>
                    Email
                  </FooterLink>
                ) : null}
                {site.contact.whatsapp.length > 0 ? (
                  <FooterLink href={site.contact.whatsapp} external>
                    WhatsApp
                  </FooterLink>
                ) : null}
              </>
            ) : null}

            {socials.map(([name, url]) => (
              <FooterLink key={name} href={url} external>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-[var(--space-beat)] border-t border-[color:var(--rule-color)] pt-[var(--space-related)]">
          <Apparatus as="p" data-numeric="tabular">
            {site.name} · {site.region}
            <span aria-hidden="true"> · </span>
            <span>
              v{buildInfo.version} · built{' '}
              <time dateTime={buildInfo.builtAt}>{buildInfo.builtAtLabel}</time>
            </span>
          </Apparatus>
          <Apparatus as="p" className="mt-[var(--rhythm-apparatus)]">
            © {buildInfo.year} {site.name}. You own everything I build for you — domain, code,
            analytics and data.
          </Apparatus>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <Label as="div">{label}</Label>
      <ul className="mt-[var(--rhythm-apparatus)]">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  readonly href: string;
  readonly external?: boolean;
  readonly children: React.ReactNode;
}) {
  const className = cn('flex min-h-[var(--touch-min)] items-center');

  return (
    <li>
      {external ? (
        <a href={href} rel="noreferrer noopener" className={className}>
          {children}
        </a>
      ) : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    </li>
  );
}
