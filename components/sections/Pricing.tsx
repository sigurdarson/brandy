import type { PricingData } from "@/lib/home-types";
import styles from "./Pricing.module.css";

type Props = {
  data: PricingData;
};

export function Pricing({ data }: Props) {
  return (
    <section className={styles.section} aria-labelledby="pricing-heading">
      <div className="pageShell">
        <h2 id="pricing-heading" className={styles.headline}>
          {data.headline}
        </h2>
        <p className={styles.intro}>{data.intro}</p>
        <div className={styles.grid}>
          {data.tiers.map((tier) => (
            <article
              key={tier.name}
              className={`${styles.tier} ${tier.isHighlighted ? styles.highlight : ""}`}
            >
              <h3 className={styles.name}>{tier.name}</h3>
              <p className={styles.price}>{tier.price}</p>
              <p className={styles.description}>{tier.description}</p>
              <p className={styles.bestFor}>{tier.bestFor}</p>
            </article>
          ))}
        </div>
        <p className={styles.closing}>{data.closingLine}</p>
      </div>
    </section>
  );
}
