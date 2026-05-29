export type SeoData = {
  title: string;
  description: string;
  ogImageUrl?: string;
};

export type HeroData = {
  headline: string;
  subhead?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
};

export type ServiceItem = {
  title: string;
  body: string;
};

export type ServicesData = {
  intro: string;
  services: ServiceItem[];
  closingLine: string;
};

export type AiSubPoint = {
  title: string;
  body: string;
};

export type AiAngleData = {
  headline: string;
  body: string;
  subPoints: AiSubPoint[];
  closingLine: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
};

export type PricingTier = {
  name: string;
  price: string;
  description: string;
  bestFor: string;
};

export type PricingData = {
  headline: string;
  intro: string;
  tiers: PricingTier[];
  closingLine: string;
};

export type FinalCtaData = {
  headline: string;
  body: string;
  ctaLabel: string;
  secondaryLine: string;
};

export type SiteSettings = {
  email: string;
  location: string;
  footerSignoff: string;
};

export type HomePagePayload = {
  seo: SeoData;
  hero: HeroData;
  services: ServicesData;
  aiAngle: AiAngleData;
  testimonials: Testimonial[];
  pricing: PricingData;
  finalCta: FinalCtaData;
  siteSettings: SiteSettings;
};
