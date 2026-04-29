import type { SiteSettings } from "@/lib/home-types";
import { TrackableLink } from "@/components/client/TrackableLink";
import styles from "./Footer.module.css";

type Props = {
  settings: SiteSettings;
};

export function Footer({ settings }: Props) {
  const year = new Date().getFullYear();
  const mailto = `mailto:${settings.email}`;

  return (
    <footer className={styles.footer}>
      <div className="pageShell">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.studio}>Ciao Ciao</span>
            <span className={styles.tagline}>{settings.tagline}</span>
            <TrackableLink
              href={mailto}
              className={`${styles.email} focusRing`}
              eventName="footer_email_click"
            >
              {settings.email}
            </TrackableLink>
          </div>
          <nav className={styles.links} aria-label="Social links">
            {settings.socialLinks.map((s) => (
              <TrackableLink
                key={`${s.platform}-${s.url}`}
                href={s.url}
                className={`${styles.social} focusRing`}
                eventName="footer_social_click"
                eventData={{ platform: s.platform }}
                aria-label={s.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                {s.label}
              </TrackableLink>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>{settings.location}</p>
          <p>© {year} Ciao Ciao</p>
          <p>{settings.footerSignoff}</p>
        </div>
      </div>
    </footer>
  );
}
