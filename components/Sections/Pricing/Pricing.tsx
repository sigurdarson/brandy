import type { PricingData } from "@/lib/home-types";
import { Card } from "@/components/ui";
import styles from "./Pricing.module.scss";

type Props = {
  data: PricingData;
};

export function Pricing({ data }: Props) {
  return (
    <section className={styles.section} aria-labelledby="pricing-heading">
      <div className="pageShell">
        <Card title={data.headline} titleId="pricing-heading" tag="How">
          <p className={styles.intro}>{data.intro}</p>
          <div className={styles.tiers}>
            {data.tiers.map((tier) => (
              <article key={tier.name} className={styles.tier}>
                <div className={styles.tierNameWrap}>
                  <span className={styles.tierName}>{tier.name}</span>
                </div>
                <p className={styles.price}>{tier.price}</p>
                <p className={styles.description}>{tier.description}</p>
                <p className={styles.bestFor}>{tier.bestFor}</p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
