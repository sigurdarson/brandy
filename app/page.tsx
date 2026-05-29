import {
  FinalCTA,
  Footer,
  Hero,
  Pricing,
  Services,
  Testimonials,
} from "@/components/Sections";
import { HOME_PAGE_DATA } from "@/lib/home-data";
import type { Metadata } from "next";

const data = HOME_PAGE_DATA;

export function generateMetadata(): Metadata {
  const { seo } = data;
  const title = seo.title?.trim() || "Ciao Ciao, European product studio";
  const description =
    seo.description?.trim() ||
    "European product studio building websites, digital products, and design systems.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: seo.ogImageUrl ? [{ url: seo.ogImageUrl }] : [],
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero data={data.hero} secondaryCtaUrl={data.hero.secondaryCtaUrl} />
      <div className="contentColumn">
        <main>
          <Services data={data.services} aiAngle={data.aiAngle} />
          <Testimonials items={data.testimonials} />
          <Pricing data={data.pricing} />
          <FinalCTA data={data.finalCta} email={data.siteSettings.email} />
        </main>
        <Footer settings={data.siteSettings} />
      </div>
    </>
  );
}
