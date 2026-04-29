import type { FinalCtaData } from "@/lib/home-types";
import { TrackableLink } from "@/components/client/TrackableLink";
import styles from "./FinalCTA.module.css";

type Props = {
  data: FinalCtaData;
  email: string;
};

export function FinalCTA({ data, email }: Props) {
  const mailto = `mailto:${email}`;

  return (
    <section
      id="contact"
      className={styles.section}
      aria-labelledby="contact-heading"
    >
      <div className={`pageShell ${styles.inner}`}>
        <h2 id="contact-heading" className={styles.headline}>
          {data.headline}
        </h2>
        <p className={styles.body}>{data.body}</p>
        <TrackableLink
          href={mailto}
          className={`${styles.cta} focusRing`}
          eventName="final_cta_click"
        >
          {data.ctaLabel}
        </TrackableLink>
        <p className={styles.secondary}>
          {data.secondaryLine.includes(email) ? (
            <>
              {data.secondaryLine.split(email)[0]}
              <TrackableLink
                href={mailto}
                className={`${styles.emailLink} focusRing`}
                eventName="final_cta_email_click"
              >
                {email}
              </TrackableLink>
              {data.secondaryLine.split(email)[1] ?? ""}
            </>
          ) : (
            data.secondaryLine
          )}
        </p>
      </div>
    </section>
  );
}
