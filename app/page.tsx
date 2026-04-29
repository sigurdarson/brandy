import { Footer } from "@/components/Footer";
import { AIAngle } from "@/components/sections/AIAngle";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { getHomePageData } from "@/lib/get-home-page";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomePageData();
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

export default async function Home() {
  const data = await getHomePageData();
  const secondaryCtaUrl =
    process.env.NEXT_PUBLIC_PORTFOLIO_URL?.trim() ||
    data.hero.secondaryCtaUrl;

  return (
    <>
      <main>
        <Hero data={data.hero} secondaryCtaUrl={secondaryCtaUrl} />
        <Services data={data.services} />
        <AIAngle data={data.aiAngle} />
        <Testimonials items={data.testimonials} />
        <Pricing data={data.pricing} />
        <FinalCTA data={data.finalCta} email={data.siteSettings.email} />
      </main>
      <Footer settings={data.siteSettings} />
    </>
  );
}
