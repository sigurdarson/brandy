"use client";

import type { ComponentPropsWithoutRef } from "react";
import { track } from "@/lib/analytics";

type Props = ComponentPropsWithoutRef<"a"> & {
  eventName: string;
  eventData?: Record<string, unknown>;
};

export function TrackableLink({
  eventName,
  eventData,
  onClick,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(eventName, eventData);
        onClick?.(e);
      }}
    />
  );
}
