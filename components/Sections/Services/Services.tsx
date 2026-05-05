import type { AiAngleData, ServicesData } from "@/lib/home-types";
import { Card } from "@/components/ui";
import styles from "./Services.module.scss";

type Props = {
  data: ServicesData;
  aiAngle: AiAngleData;
};

export function Services({ data, aiAngle }: Props) {
  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-heading"
    >
      <div className="pageShell">
        <Card title="Services" titleId="services-heading" tag="What">
          <div className={styles.servicesList}>
            {data.services.map((s, index) => (
              <article key={s.title} className={styles.serviceBlock}>
                <div className={styles.pillRow}>
                  <span className={styles.pillSolid}>{s.title}</span>
                  {index === 0 ? (
                    <span className={styles.pillSoft}>Webflow partner</span>
                  ) : null}
                </div>
                <p className={styles.body}>{s.body}</p>
              </article>
            ))}
          </div>
          <div className={styles.aiNote}>
            <p className={styles.aiNoteText}>{aiAngle.body}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
