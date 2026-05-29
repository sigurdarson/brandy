# Ciao Ciao, one-pager build brief

Working notes for the Ciao Ciao studio marketing site.

## Project context

**Studio:** Ciao Ciao, a European product studio.

**Stack:** Next.js (App Router), TypeScript, Sass modules, Umami analytics.

**Content:** All copy and settings live in `lib/home-data.ts` (`HOME_PAGE_DATA`). Types are in `lib/home-types.ts`. Edit those files to change the page; no external CMS.

**Tone:** Confident but warm. Studio-grade, not agency-corporate. Plain language, a little soul.

## Page structure

Single page: header, hero, services (including AI note), testimonials, pricing, contact, minimal footer. Section components live under `components/Sections/` (barrel: `@/components/Sections`).

## Environment

See `.env.example` for optional `NEXT_PUBLIC_*` variables (portfolio URL, Umami).
