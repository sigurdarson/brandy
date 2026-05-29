import type { HeroData } from "@/lib/home-types";
import { Button } from "@/components/ui";
import styles from "./Hero.module.scss";

function HeroTelegramIcon() {
  const clipId = "hero-telegram-clip";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="16" height="16" fill="#fff" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M16 8C16 10.122 15.157 12.157 13.657 13.657C12.157 15.157 10.122 16 8 16C5.878 16 3.843 15.157 2.343 13.657C0.843 12.157 0 10.122 0 8C0 5.878 0.843 3.843 2.343 2.343C3.843 0.843 5.878 0 8 0C10.122 0 12.157 0.843 13.657 2.343C15.157 3.843 16 5.878 16 8ZM8.287 5.906C7.508 6.23 5.953 6.9 3.621 7.916C3.243 8.066 3.045 8.213 3.026 8.358C2.996 8.601 3.301 8.697 3.716 8.828L3.891 8.883C4.299 9.016 4.849 9.171 5.134 9.177C5.394 9.184 5.683 9.077 6.002 8.857C8.181 7.386 9.306 6.643 9.376 6.627C9.426 6.615 9.496 6.601 9.542 6.643C9.588 6.685 9.584 6.763 9.579 6.784C9.549 6.913 8.352 8.025 7.733 8.601C7.54 8.781 7.403 8.908 7.375 8.937C7.313 9 7.251 9.062 7.187 9.123C6.807 9.489 6.523 9.763 7.202 10.211C7.529 10.427 7.791 10.604 8.052 10.782C8.336 10.976 8.62 11.169 8.988 11.411C9.081 11.472 9.171 11.535 9.258 11.598C9.589 11.834 9.888 12.046 10.255 12.012C10.469 11.992 10.69 11.792 10.802 11.192C11.067 9.775 11.588 6.706 11.708 5.441C11.716 5.336 11.711 5.23 11.695 5.126C11.685 5.042 11.645 4.965 11.581 4.909C11.49 4.846 11.382 4.814 11.271 4.816C10.971 4.821 10.508 4.982 8.287 5.906Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

type Props = {
  data: HeroData;
  secondaryCtaUrl: string;
};

export function Hero({ data, secondaryCtaUrl }: Props) {
  return (
    <section className={styles.band} aria-labelledby="hero-heading">
      <div className={styles.inner}>
        <div className={styles.card}>
          {/* Turbulence displacement field warps the blobs into organic,
              flowing silk. Defined once, referenced by the flow's CSS filter. */}
          <svg className={styles.defs} aria-hidden xmlns="http://www.w3.org/2000/svg">
            <filter id="hero-turbulence" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.006 0.013"
                numOctaves={3}
                seed={11}
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="36s"
                  values="0.006 0.013; 0.011 0.008; 0.006 0.013"
                  calcMode="spline"
                  keyTimes="0; 0.5; 1"
                  keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="150"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </svg>
          {/* Animated flowing gradient, painted in the studio's teal palette. */}
          <div className={styles.flow} aria-hidden>
            <span className={`${styles.blob} ${styles.blobA}`} />
            <span className={`${styles.blob} ${styles.blobB}`} />
            <span className={`${styles.blob} ${styles.blobC}`} />
          </div>
          <div className={styles.scrim} aria-hidden />
          <div className={styles.content}>
            <h1 id="hero-heading" className={styles.headline}>
              {data.headline}
            </h1>
            <div className={styles.actions}>
              <Button
                href="#contact"
                variant="primary"
                size="default"
                className="focusRing"
              >
                {data.primaryCtaLabel}
              </Button>
              <Button
                href={secondaryCtaUrl}
                variant="secondary"
                size="default"
                className="focusRing"
                icon={<HeroTelegramIcon />}
              >
                {data.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
