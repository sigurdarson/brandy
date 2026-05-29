"use client";

import { Button as BaseButton, type Button as BaseButtonTypes } from "@base-ui/react/button";
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { buttonClassNames, type ButtonSize, type ButtonVariant } from "./buttonClassNames";
import styles from "./Button.module.scss";

export type ButtonProps = Omit<BaseButtonTypes.Props, "className" | "render"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  /** When set, renders as a plain anchor link. */
  href?: string;
};

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "default",
    icon,
    className,
    children,
    type = "button",
    href,
    ...rest
  },
  ref,
) {
  const isLink = Boolean(href);

  return (
    <BaseButton
      ref={ref}
      nativeButton={!isLink}
      type={isLink ? undefined : type}
      render={
        isLink
          ? (anchorProps: ComponentPropsWithoutRef<"a">) => (
              <a {...anchorProps} href={href!} />
            )
          : undefined
      }
      className={() =>
        [buttonClassNames({ variant, size }), className].filter(Boolean).join(" ")
      }
      {...rest}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children}
    </BaseButton>
  );
});
