import { createClient, type ContentfulClientApi } from "contentful";

const isPreview = process.env.NODE_ENV === "development";

export function isContentfulConfigured(): boolean {
  return Boolean(
    process.env.CONTENTFUL_SPACE_ID &&
      (process.env.CONTENTFUL_ACCESS_TOKEN ||
        process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN),
  );
}

function hasCredentials(): boolean {
  return isContentfulConfigured();
}

let client: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(): ContentfulClientApi<undefined> | null {
  if (!hasCredentials()) {
    return null;
  }
  if (!client) {
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: isPreview
        ? (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ??
            process.env.CONTENTFUL_ACCESS_TOKEN!)
        : process.env.CONTENTFUL_ACCESS_TOKEN!,
      environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
      host: isPreview ? "preview.contentful.com" : "cdn.contentful.com",
    });
  }
  return client;
}
