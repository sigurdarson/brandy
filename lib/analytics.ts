"use client";

export function track(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}
