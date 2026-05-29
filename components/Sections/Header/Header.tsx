"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiaoCiaoMark } from "./CiaoCiaoMark";
import styles from "./Header.module.scss";

type Props = {
  brandName?: string;
};

export function Header({ brandName = "CiaoCiao" }: Props) {
  const pathname = usePathname();
  const studioCurrent = pathname === "/" ? "page" : undefined;
  const labsCurrent = pathname === "/labs" ? "page" : undefined;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logoRow} href="/" aria-label="CiaoCiao, home">
          <CiaoCiaoMark className={styles.logo} />
          <span className={styles.brand}>{brandName}</span>
        </Link>
        <div className={styles.actions}>
          <nav className={styles.segment} aria-label="Site sections">
            <ul className={styles.segmentTrack}>
              <li className={styles.segmentItem}>
                <Link
                  className={styles.segmentLink}
                  href="/"
                  aria-current={studioCurrent}
                >
                  Studio
                </Link>
              </li>
              <li className={styles.segmentItem}>
                <Link
                  className={styles.segmentLink}
                  href="/labs"
                  aria-current={labsCurrent}
                >
                  Lab
                </Link>
              </li>
            </ul>
          </nav>
          <Button
            href="/#contact"
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
