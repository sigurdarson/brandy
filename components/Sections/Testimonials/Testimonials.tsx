import Image from "next/image";
import type { Testimonial } from "@/lib/home-types";
import { Card } from "@/components/ui";
import styles from "./Testimonials.module.scss";

type Props = {
  items: Testimonial[];
};

export function Testimonials({ items }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className="pageShell">
        <Card
          title="What our partners say."
          titleId="testimonials-heading"
          tag="Why"
        >
          <div className={styles.testimonialsList}>
            {items.map((t) => (
              <figure key={`${t.name}-${t.company}`} className={styles.row}>
                {t.avatarUrl ? (
                  <Image
                    className={styles.avatar}
                    src={t.avatarUrl}
                    alt=""
                    width={96}
                    height={96}
                    sizes="48px"
                  />
                ) : null}
                <blockquote className={styles.quote}>{t.quote}</blockquote>
                <figcaption className={styles.meta}>
                  <span className={styles.person}>
                    {t.name}
                    {t.role ? `, ${t.role}` : ""}
                  </span>
                  <span className={styles.companyPill}>{t.company}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
