import type { SiteSettings } from "@/lib/home-types";
import styles from "./Footer.module.scss";

type Props = {
  settings: SiteSettings;
};

export function Footer({ settings }: Props) {
  return (
    <footer className={styles.footer}>
      <div className="pageShell">
        <p className={styles.line}>{settings.location}</p>
        <p className={styles.line}>{settings.footerSignoff}</p>
      </div>
    </footer>
  );
}
