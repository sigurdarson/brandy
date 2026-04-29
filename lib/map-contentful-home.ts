import type {
  AiAngleData,
  AiSubPoint,
  FinalCtaData,
  HeroData,
  HomePagePayload,
  PricingData,
  PricingTier,
  SeoData,
  ServiceItem,
  ServicesData,
  SiteSettings,
  SocialLink,
  Testimonial,
} from "./home-types";

export type UnknownEntry = {
  fields: Record<string, unknown>;
};

function entryFields(e: unknown): Record<string, unknown> | null {
  if (e && typeof e === "object" && "fields" in e) {
    return (e as UnknownEntry).fields;
  }
  return null;
}

function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function bool(v: unknown): boolean {
  return v === true;
}

function mapAssetUrl(asset: unknown): string | undefined {
  const f = entryFields(asset);
  const file = f?.file as Record<string, unknown> | undefined;
  const url = file?.url;
  if (typeof url !== "string") return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function mapLinkedEntry<T>(
  ref: unknown,
  map: (fields: Record<string, unknown>) => T | null,
): T | null {
  const fields = entryFields(ref);
  if (!fields) return null;
  return map(fields);
}

function mapLinkedEntries<T>(
  refs: unknown,
  map: (fields: Record<string, unknown>) => T | null,
): T[] {
  if (!Array.isArray(refs)) return [];
  const out: T[] = [];
  for (const ref of refs) {
    const item = mapLinkedEntry(ref, map);
    if (item) out.push(item);
  }
  return out;
}

function mapHero(fields: Record<string, unknown>): HeroData {
  return {
    headline: str(fields.headline),
    subhead: str(fields.subhead),
    primaryCtaLabel: str(fields.primaryCtaLabel),
    secondaryCtaLabel: str(fields.secondaryCtaLabel),
    secondaryCtaUrl: str(fields.secondaryCtaUrl),
  };
}

function mapService(fields: Record<string, unknown>): ServiceItem | null {
  const title = str(fields.title);
  const body = str(fields.body);
  if (!title && !body) return null;
  return { title, body };
}

function mapServices(fields: Record<string, unknown>): ServicesData | null {
  const services = mapLinkedEntries(fields.services, mapService);
  return {
    intro: str(fields.intro),
    services,
    closingLine: str(fields.closingLine),
  };
}

function mapAiSubPoint(fields: Record<string, unknown>): AiSubPoint | null {
  const title = str(fields.title);
  const body = str(fields.body);
  if (!title && !body) return null;
  return { title, body };
}

function mapAiAngle(fields: Record<string, unknown>): AiAngleData | null {
  return {
    headline: str(fields.headline),
    body: str(fields.body),
    subPoints: mapLinkedEntries(fields.subPoints, mapAiSubPoint),
    closingLine: str(fields.closingLine),
  };
}

function mapTestimonial(fields: Record<string, unknown>): Testimonial | null {
  const quote = str(fields.quote);
  if (!quote) return null;
  return {
    quote,
    name: str(fields.name),
    role: str(fields.role),
    company: str(fields.company),
    avatarUrl: mapAssetUrl(fields.avatar),
  };
}

function mapPricingTier(fields: Record<string, unknown>): PricingTier | null {
  const name = str(fields.name);
  if (!name) return null;
  return {
    name,
    price: str(fields.price),
    description: str(fields.description),
    bestFor: str(fields.bestFor),
    isHighlighted: bool(fields.isHighlighted),
  };
}

function mapPricing(fields: Record<string, unknown>): PricingData | null {
  return {
    headline: str(fields.headline),
    intro: str(fields.intro),
    tiers: mapLinkedEntries(fields.tiers, mapPricingTier),
    closingLine: str(fields.closingLine),
  };
}

function mapFinalCta(fields: Record<string, unknown>): FinalCtaData | null {
  return {
    headline: str(fields.headline),
    body: str(fields.body),
    ctaLabel: str(fields.ctaLabel),
    secondaryLine: str(fields.secondaryLine),
  };
}

function mapSeo(fields: Record<string, unknown>): SeoData {
  return {
    title: str(fields.title),
    description: str(fields.description),
    ogImageUrl: mapAssetUrl(fields.ogImage),
  };
}

function mapSocialLink(fields: Record<string, unknown>): SocialLink | null {
  const url = str(fields.url);
  if (!url) return null;
  return {
    platform: str(fields.platform),
    label: str(fields.label),
    url,
  };
}

function mapSiteSettings(fields: Record<string, unknown>): SiteSettings {
  return {
    email: str(fields.email),
    tagline: str(fields.tagline),
    location: str(fields.location),
    socialLinks: mapLinkedEntries(fields.socialLinks, mapSocialLink),
    footerSignoff: str(fields.footerSignoff),
  };
}

export function mapPageHomeEntry(
  page: UnknownEntry,
  siteSettingsEntry: UnknownEntry | null,
  fallback: HomePagePayload,
): HomePagePayload {
  const f = page.fields as Record<string, unknown>;

  const hero = mapLinkedEntry(f.hero, mapHero);
  const services = mapLinkedEntry(f.services, mapServices);
  const aiAngle = mapLinkedEntry(f.aiAngle, mapAiAngle);
  const testimonials = mapLinkedEntries(f.testimonials, mapTestimonial);
  const pricing = mapLinkedEntry(f.pricing, mapPricing);
  const finalCta = mapLinkedEntry(f.finalCta, mapFinalCta);
  const seoFromCms = mapLinkedEntry(f.seo, mapSeo);

  const siteFields = siteSettingsEntry
    ? mapSiteSettings(siteSettingsEntry.fields as Record<string, unknown>)
    : null;

  const seo: SeoData = seoFromCms
    ? {
        title: seoFromCms.title || fallback.seo.title,
        description: seoFromCms.description || fallback.seo.description,
        ogImageUrl: seoFromCms.ogImageUrl ?? fallback.seo.ogImageUrl,
      }
    : fallback.seo;

  const siteSettings: SiteSettings = siteFields
    ? {
        ...fallback.siteSettings,
        ...siteFields,
        email: siteFields.email || fallback.siteSettings.email,
      }
    : fallback.siteSettings;

  return {
    seo,
    hero: hero ?? fallback.hero,
    services: services ?? fallback.services,
    aiAngle: aiAngle ?? fallback.aiAngle,
    testimonials,
    pricing: pricing ?? fallback.pricing,
    finalCta: finalCta ?? fallback.finalCta,
    siteSettings,
  };
}
