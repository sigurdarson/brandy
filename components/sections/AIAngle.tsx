import type { AiAngleData } from "@/lib/home-types";
import styles from "./AIAngle.module.css";

type Props = {
  data: AiAngleData;
};

export function AIAngle({ data }: Props) {
  return (
    <section className={styles.section} aria-labelledby="ai-heading">
      <div className="pageShell">
        <div className={styles.layout}>
          <div>
            <h2 id="ai-heading" className={styles.headline}>
              {data.headline}
            </h2>
            <p className={styles.body}>{data.body}</p>
          </div>
          <div>
            <div className={styles.subGrid}>
              {data.subPoints.map((p) => (
                <article key={p.title} className={styles.subCard}>
                  <h3 className={styles.subTitle}>{p.title}</h3>
                  <p className={styles.subBody}>{p.body}</p>
                </article>
              ))}
            </div>
            <p className={styles.closing}>{data.closingLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
