# Ciao Ciao, one-pager build brief

A build-ready brief for the Ciao Ciao studio website. Hand this to your coding agent or use it as a working document yourself.

---

## Project context

**Studio:** Ciao Ciao, a European product studio.
**Goal:** Build a single-page marketing site that positions Ciao Ciao as an AI-native studio offering websites, digital product design, and design systems. Audience is mixed: small businesses, mid-market, and enterprise.

**Stack (existing project):**
- Next.js (App Router assumed unless project uses Pages Router)
- TypeScript
- CSS Modules
- Base UI components (`@base-ui-components/react`)
- Contentful as CMS
- Umami for analytics

**Tone of voice:** Confident but warm. Studio-grade, not agency-corporate. Avoid AI buzzwords ("revolutionary", "cutting-edge", "synergy"). Plain language, a little soul.

**Visual direction:** Not specified yet, but content is written assuming a clean, editorial layout with strong typography and generous whitespace. Defer visual decisions to design pass; structural decisions below should hold either way.

---

## Page structure

Single page, eight sections, in this order:

1. Hero
2. Services
3. The AI angle
4. Testimonials
5. Pricing and engagement
6. Final CTA
7. Footer

Each section should be its own React component under `components/sections/`, composed in a single page route (e.g. `app/page.tsx`). Content for each section should be fetched from Contentful (see Contentful section below).

---

## Contentful setup

All editorial content (copy, testimonials, pricing, social links, email) lives in Contentful so it can be updated without a redeploy. Code holds structure, Contentful holds content.

**Recommended content models:**

### `pageHome` (single entry, type: single instance)
The top-level entry that aggregates everything on the page. Think of this as the "page" record.

| Field | Type | Notes |
|---|---|---|
| `internalName` | Short text | For editor reference only |
| `hero` | Reference (1) → `heroSection` | |
| `services` | Reference (1) → `servicesSection` | |
| `aiAngle` | Reference (1) → `aiAngleSection` | |
| `testimonials` | Reference (many) → `testimonial` | Order matters |
| `pricing` | Reference (1) → `pricingSection` | |
| `finalCta` | Reference (1) → `finalCtaSection` | |
| `seo` | Reference (1) → `seoMetadata` | |

### `heroSection`
| Field | Type |
|---|---|
| `headline` | Short text |
| `subhead` | Long text |
| `primaryCtaLabel` | Short text |
| `secondaryCtaLabel` | Short text |
| `secondaryCtaUrl` | Short text |

### `servicesSection`
| Field | Type | Notes |
|---|---|---|
| `intro` | Short text | |
| `services` | Reference (many) → `service` | Order matters |
| `closingLine` | Long text | |

### `service`
| Field | Type |
|---|---|
| `title` | Short text |
| `body` | Long text |

### `aiAngleSection`
| Field | Type | Notes |
|---|---|---|
| `headline` | Short text | |
| `body` | Long text | |
| `subPoints` | Reference (many) → `aiSubPoint` | Order matters |
| `closingLine` | Short text | |

### `aiSubPoint`
| Field | Type |
|---|---|
| `title` | Short text |
| `body` | Long text |

### `testimonial`
| Field | Type | Notes |
|---|---|---|
| `quote` | Long text | |
| `name` | Short text | |
| `role` | Short text | |
| `company` | Short text | |
| `avatar` | Media (image) | Optional |

### `pricingSection`
| Field | Type | Notes |
|---|---|---|
| `headline` | Short text | |
| `intro` | Long text | |
| `tiers` | Reference (many) → `pricingTier` | Order matters |
| `closingLine` | Short text | |

### `pricingTier`
| Field | Type | Notes |
|---|---|---|
| `name` | Short text | |
| `price` | Short text | e.g. "Starting from €5,000" or "Custom pricing" |
| `description` | Long text | |
| `bestFor` | Long text | |
| `isHighlighted` | Boolean | True for the recommended tier |

### `finalCtaSection`
| Field | Type |
|---|---|
| `headline` | Short text |
| `body` | Long text |
| `ctaLabel` | Short text |
| `secondaryLine` | Short text |

### `seoMetadata`
| Field | Type | Notes |
|---|---|---|
| `title` | Short text | |
| `description` | Long text | |
| `ogImage` | Media (image) | Optional |

### `siteSettings` (single entry, separate from `pageHome`)
Global settings reused across the site, currently mainly the footer.

| Field | Type | Notes |
|---|---|---|
| `email` | Short text | |
| `tagline` | Short text | Footer tagline |
| `location` | Short text | "Made in [city], working everywhere" |
| `socialLinks` | Reference (many) → `socialLink` | |
| `footerSignoff` | Short text | "Designed and built by humans, with help from AI." |

### `socialLink`
| Field | Type | Notes |
|---|---|---|
| `platform` | Short text | "linkedin", "instagram", "dribbble" |
| `label` | Short text | Display label |
| `url` | Short text | |

---

## Contentful integration

**Install:**
```bash
npm install contentful
```

**Environment variables** (add to `.env.local` and project's secret manager):
```
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...
CONTENTFUL_ENVIRONMENT=master
```

**Client setup** (`lib/contentful.ts`):
```ts
import { createClient } from "contentful";

const isPreview = process.env.NODE_ENV === "development";

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: isPreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
    : process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
  host: isPreview ? "preview.contentful.com" : "cdn.contentful.com",
});
```

**Typed fetcher pattern:**
Define TypeScript types for each content model (or use `contentful-typescript-codegen` to generate them). Fetch the `pageHome` entry once in the page component with `include: 10` (or sufficient depth) so all references resolve in a single request.

```ts
// app/page.tsx (sketch)
import { contentfulClient } from "@/lib/contentful";

export default async function HomePage() {
  const entries = await contentfulClient.getEntries({
    content_type: "pageHome",
    limit: 1,
    include: 10,
  });

  const page = entries.items[0];
  // pass relevant fields into each section component
}
```

**Revalidation:**
Use Next.js's `revalidate` option (ISR) or set up a Contentful webhook hitting a revalidation route handler so editor changes appear without a redeploy.

```ts
export const revalidate = 60; // or rely on webhook-driven on-demand revalidation
```

**Image handling:**
Contentful images come with a URL and dimensions. Use `next/image` with the Contentful URL as `src`, and add `images.contentful.com` (or your specific Contentful image domain) to `next.config.js` `images.remotePatterns`.

---

## Section 1: Hero

**Component:** `components/sections/Hero.tsx`

**Headline (h1):**
Craft, multiplied by AI.

**Subhead (p):**
European product studio building websites, digital products, and design systems for teams who want to move faster without losing craft. We build in Webflow or in code, whichever fits, and pair AI-native workflows with real craft so what used to take months ships in weeks.

**CTAs:**
- Primary button: "Start a project" → scrolls to `#contact` (final CTA section)
- Secondary link: "See our work" → placeholder anchor or external portfolio link, configurable via prop or env var

**Notes:**
- Use Base UI's button primitives if available, otherwise a styled `<button>` and `<a>`.
- Both CTAs should fire Umami events (see Analytics section).
- Content sourced from `pageHome.hero` (`heroSection` content type).

---

## Section 2: Services

**Component:** `components/sections/Services.tsx`

**Section intro (small text above the cards):**
Three things we do well, shaped to what each project actually needs.

**Three service cards:**

### Websites
Marketing sites, landing pages, and brand-led builds. Designed to convert and built to scale, in Webflow when speed and ownership matter, or in custom code when the project calls for it. We design and build, end to end.

### Digital products
From early concept to launch-ready design. We handle product strategy, UX, interface design, and prototyping, then partner with your engineers to bring it to life. Think of us as your design team, working hand in hand with whoever builds it.

### Design systems
Component libraries and design systems built for real teams. Tokens, documentation, and Figma to code workflows that hold up as you grow. Equally at home as a standalone engagement or paired with a product or website project.

**Closing line below the cards:**
We adapt to the project. Webflow or custom code for websites, design partnership for product work, and AI woven throughout. The goal is always the same: ship the right thing, faster.

**Notes:**
- Content sourced from `pageHome.services` (`servicesSection`), with each service from the `service` content type.
- Cards should be presentational only, no interaction. Optional: subtle hover state.

---

## Section 3: The AI angle

**Component:** `components/sections/AIAngle.tsx`

**Headline (h2):**
Where AI meets craft.

**Body paragraph:**
AI is part of how we research, design, prototype, and ship. It's not a feature we bolt on or a buzzword we lean on. It's the reason a project that used to take a quarter can ship in a few weeks, with the same care and considered detail you'd expect from any good studio.

**Three sub-points (rendered as a small grid or vertical list):**

**Faster research**
We use AI to synthesise interviews, audit competitors, and surface patterns in hours instead of days. You get sharper insight, sooner.

**Rapid prototyping**
Working prototypes in days, not weeks. We test ideas earlier, iterate more, and arrive at the right solution faster.

**Considered output**
AI handles the heavy lifting so we can spend our time on the parts that need human judgement: strategy, craft, and the thousand small decisions that make work feel right.

**Closing line:**
Same craft, faster timelines, more iteration. That's the trade we offer.

**Notes:**
- Content sourced from `pageHome.aiAngle` (`aiAngleSection`), sub-points from `aiSubPoint`.
- This section is the positioning anchor. Visually it should feel distinct from Services, e.g. different background tone or layout shift.

---

## Section 4: Testimonials

**Component:** `components/sections/Testimonials.tsx`

**Headline (h2):**
What our clients say.

**Three testimonials (placeholder copy, replace with real quotes when available):**

> "Ciao Ciao shipped in three weeks what our last agency quoted three months for. The quality was better too."
> Name, Role, Company

> "They felt like part of our team from week one. Sharp design instincts, easy to work with, and our developers actually enjoyed the handoff."
> Name, Role, Company

> "We came in needing a website. We left with a design system, a sharper brand, and a partner we still call when we're stuck."
> Name, Role, Company

**Notes:**
- Content sourced from `pageHome.testimonials` (array of `testimonial` entries, order preserved from CMS).
- Layout: three columns on desktop, stacked on mobile. Optionally a carousel later, but static is fine for v1.
- Avatar images optional. If absent, render quote and attribution only. Use `next/image` for avatars when present.
- If the testimonials array is empty, render nothing (don't show an empty section).

---

## Section 5: Pricing and engagement

**Component:** `components/sections/Pricing.tsx`

**Headline (h2):**
How we work together.

**Intro line:**
Three ways to engage, depending on what you need. All include AI-native workflows and a fixed point of contact throughout.

**Three tiers:**

### Launchpad
*Starting from €X*
A focused website or landing page, designed and shipped in 2 to 4 weeks. Best for startups and small businesses who need to move fast without compromising on craft.

### Studio
*Starting from €X*
Custom websites, product design work, or design systems. 4 to 8 weeks, scoped to your needs. Best for teams with bigger ambitions and more nuance to navigate.

### Partner
*Custom pricing*
An ongoing partnership for organisations that need a studio on call. Design, iteration, and strategic support, month after month. Best for larger organisations and scale-ups.

**Closing line below the tiers:**
Not sure which fits? Get in touch and we'll figure it out together.

**Notes:**
- Content sourced from `pageHome.pricing` (`pricingSection`), tiers from `pricingTier` entries.
- Pricing strings (e.g. "Starting from €5,000") are managed entirely in Contentful, no code changes needed to update prices.
- Tiers with `isHighlighted: true` should be visually emphasised (subtle border or background lift). Studio tier should be flagged in CMS.

---

## Section 6: Final CTA

**Component:** `components/sections/FinalCTA.tsx`

**Anchor id:** `contact` (the hero's primary CTA scrolls here)

**Headline (h2):**
Tell us about your project.

**Body:**
Whether you've got a brief, a rough idea, or just a problem you can't quite name yet, we'd love to hear about it. We reply within a day, usually less.

**Primary CTA:** "Get in touch" button → opens `mailto:hello@ciaociao.studio` (or links to a contact form route if one exists)

**Secondary line:**
Or email us directly at hello@ciaociao.studio

**Notes:**
- Content sourced from `pageHome.finalCta` (`finalCtaSection`).
- Email address pulled from `siteSettings.email` so it stays consistent with the footer.
- CTA fires Umami event.

---

## Section 7: Footer

**Component:** `components/Footer.tsx`

**Contents:**
- Studio name "Ciao Ciao" with one-line tagline ("European product studio")
- Contact email: hello@ciaociao.studio
- Social links: LinkedIn, Instagram, Dribbble (configurable, omit any that don't apply)
- Location line: "Made in [city], working everywhere" (replace [city] with the actual city)
- Copyright line: `© ${new Date().getFullYear()} Ciao Ciao`
- Small line at the very bottom: "Designed and built by humans, with help from AI."

**Notes:**
- All content sourced from the `siteSettings` entry (separate from `pageHome` so the footer is reusable across any future pages).
- Social links rendered from the `socialLinks` array; omit any that don't apply by simply removing them in Contentful.
- Copyright year computed at runtime, not stored in CMS.
- No nav menu needed for a one-pager.

---

## Analytics (Umami)

Fire events on key interactions. Use Umami's `window.umami.track()` API. Wrap in a small helper to keep components clean:

```ts
// lib/analytics.ts
export function track(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, data);
  }
}
```

**Events to fire:**

| Event name | Trigger |
|---|---|
| `hero_cta_primary` | Hero "Start a project" clicked |
| `hero_cta_secondary` | Hero "See our work" clicked |
| `pricing_tier_view` | (optional) Pricing tier card hovered or viewed |
| `final_cta_click` | Final CTA "Get in touch" clicked |
| `footer_email_click` | Footer email link clicked |
| `footer_social_click` | Any footer social link clicked, with `{ platform: "linkedin" | "instagram" | ... }` |

Add a TypeScript declaration for `window.umami` if not already present:

```ts
// types/umami.d.ts
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}
export {};
```

---

## Styling guidance

- Use CSS Modules per component (e.g. `Hero.module.css` next to `Hero.tsx`).
- Define a small set of design tokens (colours, spacing, type scale) in a global CSS file or a tokens module. Don't reach for a CSS-in-JS library or Tailwind, the project's already opinionated.
- Use semantic HTML: one `<h1>` (in Hero), `<h2>` for each subsequent section, `<section>` wrappers with `aria-labelledby` pointing to each section heading.
- Mobile-first. Breakpoints can stay simple, e.g. one mid breakpoint around 768px and one larger around 1080px.
- Respect `prefers-reduced-motion` for any animations.

---

## Accessibility checklist

- All interactive elements (buttons, links) have visible focus states.
- Colour contrast meets WCAG AA at minimum.
- Email and social links have descriptive `aria-label`s where the visible text isn't self-explanatory (e.g. icon-only socials).
- Heading hierarchy is correct: h1 in hero, h2s for each section, h3s for cards within sections.
- All images (if any added later) have meaningful `alt` text or `alt=""` if decorative.

---

## SEO and metadata

Use Next.js's `generateMetadata` to pull SEO fields from the `seoMetadata` reference on `pageHome`:

```ts
// app/page.tsx
export async function generateMetadata() {
  const entries = await contentfulClient.getEntries({
    content_type: "pageHome",
    limit: 1,
    include: 2,
  });
  const seo = entries.items[0]?.fields.seo?.fields;

  return {
    title: seo?.title ?? "Ciao Ciao, European product studio",
    description: seo?.description,
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      type: "website",
      images: seo?.ogImage ? [`https:${seo.ogImage.fields.file.url}`] : [],
    },
  };
}
```

Fall back to sensible defaults if Contentful fields are empty.

---

## File structure (suggested)

```
app/
  page.tsx                    // composes all sections, fetches pageHome from Contentful
  layout.tsx                  // metadata, Umami script
  api/
    revalidate/route.ts       // optional: webhook target for Contentful
components/
  sections/
    Hero.tsx
    Hero.module.css
    Services.tsx
    Services.module.css
    AIAngle.tsx
    AIAngle.module.css
    Testimonials.tsx
    Testimonials.module.css
    Pricing.tsx
    Pricing.module.css
    FinalCTA.tsx
    FinalCTA.module.css
  Footer.tsx
  Footer.module.css
lib/
  contentful.ts               // Contentful client
  analytics.ts                // Umami helper
types/
  contentful.ts               // generated or hand-written content model types
  umami.d.ts
```

---

## Build order suggestion

1. Set up Contentful content models in the space, populate with placeholder copy from this brief.
2. Set up Contentful client and types in code, verify a basic fetch works.
3. Set up shared tokens and global styles.
4. Build Footer first (smallest, exercises styling system and Contentful integration).
5. Build Hero (sets the visual tone).
6. Build remaining sections top to bottom.
7. Wire up analytics events.
8. Set up revalidation (ISR or webhook).
9. Pass: accessibility audit, mobile review, metadata.
10. Editor pass in Contentful: real testimonials, real pricing, real social links.

---

## Pre-launch checklist

- [ ] All Contentful content models created and populated
- [ ] Real testimonials entered in Contentful (or section left empty if none yet)
- [ ] Real pricing entered in Contentful
- [ ] Email address verified, reachable, and set in `siteSettings`
- [ ] Social links populated in `siteSettings`
- [ ] Contentful production access token used in production environment
- [ ] Revalidation (ISR or webhook) tested end to end
- [ ] Umami tracking ID configured
- [ ] OG image uploaded to Contentful and showing correctly
- [ ] Favicon set
- [ ] Lighthouse pass (performance, accessibility, SEO all 90+)
- [ ] Tested on mobile, tablet, desktop
- [ ] Tested with keyboard navigation only
- [ ] Tested with reduced motion enabled
