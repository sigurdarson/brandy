import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "default" | "small";

export function buttonClassNames(opts: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  const variant = opts.variant ?? "primary";
  const size = opts.size ?? "default";
  return [
    styles.root,
    variant === "primary" ? styles.variantPrimary : styles.variantSecondary,
    size === "default" ? styles.sizeDefault : styles.sizeSmall,
    opts.className,
  ]
    .filter(Boolean)
    .join(" ");
}
