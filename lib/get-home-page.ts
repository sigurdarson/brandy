import { cache } from "react";
import { getContentfulClient } from "./contentful";
import { FALLBACK_HOME_PAGE } from "./fallback-home-data";
import type { HomePagePayload } from "./home-types";
import { mapPageHomeEntry, type UnknownEntry } from "./map-contentful-home";

async function fetchHomePageUncached(): Promise<HomePagePayload> {
  const client = getContentfulClient();
  if (!client) {
    return FALLBACK_HOME_PAGE;
  }

  try {
    const [homeRes, settingsRes] = await Promise.all([
      client.getEntries({
        content_type: "pageHome",
        limit: 1,
        include: 10,
      }),
      client.getEntries({
        content_type: "siteSettings",
        limit: 1,
        include: 3,
      }),
    ]);

    const page = homeRes.items[0] as UnknownEntry | undefined;
    if (!page?.fields) {
      return FALLBACK_HOME_PAGE;
    }

    const settings = settingsRes.items[0] as UnknownEntry | undefined;

    return mapPageHomeEntry(page, settings ?? null, FALLBACK_HOME_PAGE);
  } catch {
    return FALLBACK_HOME_PAGE;
  }
}

export const getHomePageData = cache(fetchHomePageUncached);
