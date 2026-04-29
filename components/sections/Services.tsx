import type { ServicesData } from "@/lib/home-types";
import styles from "./Services.module.css";

type Props = {
  data: ServicesData;
};

export function Services({ data }: Props) {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-heading"
    >
      <div className="pageShell">
        <h2 id="services-heading" className={styles.heading}>
          Services
        </h2>
        <p className={styles.intro}>{data.intro}</p>
        <div className={styles.grid}>
          {data.services.map((s) => (
            <article key={s.title} className={styles.card}>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </article>
          ))}
        </div>
        <p className={styles.closing}>{data.closingLine}</p>
      </div>
    </section>
  );
}
