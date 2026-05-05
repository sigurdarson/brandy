import { Button } from "@/components/ui";
import Link from "next/link";
import { CiaoCiaoMark } from "./CiaoCiaoMark";
import styles from "./Header.module.scss";

type Props = {
  brandName?: string;
};

export function Header({ brandName = "CiaoCiao" }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logoRow} href="/" aria-label="CiaoCiao, home">
          <CiaoCiaoMark className={styles.logo} />
          <span className={styles.brand}>{brandName}</span>
        </Link>
        <div className={styles.actions}>
          <div className={styles.segment} role="group" aria-label="Focus">
            <a className={styles.segmentActive} href="#">
              Studio
            </a>
            <a className={styles.segmentInactive} href="#lab">
              Lab
            </a>
          </div>
          <Button
            href="#contact"
            variant="primary"
            size="default"
            className="focusRing"
          >
            Start a project
          </Button>
        </div>
      </div>
    </header>
  );
}
