import type { HeroData } from "@/lib/home-types";
import { TrackableLink } from "@/components/client/TrackableLink";
import styles from "./Hero.module.css";

type Props = {
  data: HeroData;
  secondaryCtaUrl: string;
};

export function Hero({ data, secondaryCtaUrl }: Props) {
  return (
    <section className={styles.section} aria-labelledby="hero-heading">
      <div className={`pageShell ${styles.inner}`}>
        <h1 id="hero-heading" className={styles.headline}>
          {data.headline}
        </h1>
        <p className={styles.subhead}>{data.subhead}</p>
        <div className={styles.actions}>
          <TrackableLink
            href="#contact"
            className={`${styles.primary} focusRing`}
            eventName="hero_cta_primary"
          >
            {data.primaryCtaLabel}
          </TrackableLink>
          <TrackableLink
            href={secondaryCtaUrl}
            className={`${styles.secondary} focusRing`}
            eventName="hero_cta_secondary"
          >
            {data.secondaryCtaLabel}
          </TrackableLink>
        </div>
      </div>
    </section>
  );
}
