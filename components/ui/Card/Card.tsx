import type { ReactNode } from "react";
import styles from "./Card.module.scss";

export type CardProps = {
  title?: ReactNode;
  /** Set when `title` is present so the section can use `aria-labelledby`. */
  titleId?: string;
  tag?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, titleId, tag, children, className }: CardProps) {
  const showHeader = title != null || tag != null;

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      {showHeader ? (
        <div className={styles.header}>
          {title != null ? (
            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
          ) : (
            <span className={styles.titlePlaceholder} aria-hidden />
          )}
          {tag ? (
            <span className={styles.tag} aria-hidden>
              {tag}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
