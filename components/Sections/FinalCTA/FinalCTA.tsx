import type { FinalCtaData } from "@/lib/home-types";
import { Card } from "@/components/ui";
import { ContactForm } from "./ContactForm";
import styles from "./FinalCTA.module.scss";

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
      <div className="pageShell">
        <Card title={data.headline} titleId="contact-heading" tag="Get started">
          <div className={styles.stack}>
            <p className={styles.body}>{data.body}</p>
            <ContactForm email={email} />
            <p className={styles.secondary}>
              {data.secondaryLine.includes(email) ? (
                <>
                  {data.secondaryLine.split(email)[0]}
                  <a
                    href={mailto}
                    className={`${styles.emailLink} focusRing`}
                  >
                    {email}
                  </a>
                  {data.secondaryLine.split(email)[1] ?? ""}
                </>
              ) : (
                data.secondaryLine
              )}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
