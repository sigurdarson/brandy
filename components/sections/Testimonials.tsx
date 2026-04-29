import Image from "next/image";
import type { Testimonial } from "@/lib/home-types";
import styles from "./Testimonials.module.css";

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
        <h2 id="testimonials-heading" className={styles.headline}>
          What our clients say.
        </h2>
        <div className={styles.grid}>
          {items.map((t) => (
            <figure key={`${t.name}-${t.company}`} className={styles.card}>
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
                {t.name}
                {t.role ? `, ${t.role}` : ""}
                {t.company ? ` · ${t.company}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
