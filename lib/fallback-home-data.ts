import type { HomePagePayload } from "./home-types";

export const FALLBACK_HOME_PAGE: HomePagePayload = {
  seo: {
    title: "Ciao Ciao, European product studio",
    description:
      "European product studio building websites, digital products, and design systems for teams who want to move faster without losing craft.",
  },
  hero: {
    headline: "Craft, multiplied by AI.",
    subhead:
      "European product studio building websites, digital products, and design systems for teams who want to move faster without losing craft. We build in Webflow or in code, whichever fits, and pair AI-native workflows with real craft so what used to take months ships in weeks.",
    primaryCtaLabel: "Start a project",
    secondaryCtaLabel: "See our work",
    secondaryCtaUrl: "#services",
  },
  services: {
    intro:
      "Three things we do well, shaped to what each project actually needs.",
    services: [
      {
        title: "Websites",
        body:
          "Marketing sites, landing pages, and brand-led builds. Designed to convert and built to scale, in Webflow when speed and ownership matter, or in custom code when the project calls for it. We design and build, end to end.",
      },
      {
        title: "Digital products",
        body:
          "From early concept to launch-ready design. We handle product strategy, UX, interface design, and prototyping, then partner with your engineers to bring it to life. Think of us as your design team, working hand in hand with whoever builds it.",
      },
      {
        title: "Design systems",
        body:
          "Component libraries and design systems built for real teams. Tokens, documentation, and Figma to code workflows that hold up as you grow. Equally at home as a standalone engagement or paired with a product or website project.",
      },
    ],
    closingLine:
      "We adapt to the project. Webflow or custom code for websites, design partnership for product work, and AI woven throughout. The goal is always the same: ship the right thing, faster.",
  },
  aiAngle: {
    headline: "Where AI meets craft.",
    body:
      "AI is part of how we research, design, prototype, and ship. It's not a feature we bolt on or a buzzword we lean on. It's the reason a project that used to take a quarter can ship in a few weeks, with the same care and considered detail you'd expect from any good studio.",
    subPoints: [
      {
        title: "Faster research",
        body:
          "We use AI to synthesise interviews, audit competitors, and surface patterns in hours instead of days. You get sharper insight, sooner.",
      },
      {
        title: "Rapid prototyping",
        body:
          "Working prototypes in days, not weeks. We test ideas earlier, iterate more, and arrive at the right solution faster.",
      },
      {
        title: "Considered output",
        body:
          "AI handles the heavy lifting so we can spend our time on the parts that need human judgement: strategy, craft, and the thousand small decisions that make work feel right.",
      },
    ],
    closingLine:
      "Same craft, faster timelines, more iteration. That's the trade we offer.",
  },
  testimonials: [
    {
      quote:
        "Ciao Ciao shipped in three weeks what our last agency quoted three months for. The quality was better too.",
      name: "Alex Morgan",
      role: "Head of Marketing",
      company: "Northline",
    },
    {
      quote:
        "They felt like part of our team from week one. Sharp design instincts, easy to work with, and our developers actually enjoyed the handoff.",
      name: "Jordan Lee",
      role: "Product Lead",
      company: "Fieldstack",
    },
    {
      quote:
        "We came in needing a website. We left with a design system, a sharper brand, and a partner we still call when we're stuck.",
      name: "Sam Rivera",
      role: "Founder",
      company: "Brightwell",
    },
  ],
  pricing: {
    headline: "How we work together.",
    intro:
      "Three ways to engage, depending on what you need. All include AI-native workflows and a fixed point of contact throughout.",
    tiers: [
      {
        name: "Launchpad",
        price: "Starting from €4,500",
        description:
          "A focused website or landing page, designed and shipped in 2 to 4 weeks.",
        bestFor:
          "Best for startups and small businesses who need to move fast without compromising on craft.",
        isHighlighted: false,
      },
      {
        name: "Studio",
        price: "Starting from €12,000",
        description:
          "Custom websites, product design work, or design systems. 4 to 8 weeks, scoped to your needs.",
        bestFor:
          "Best for teams with bigger ambitions and more nuance to navigate.",
        isHighlighted: true,
      },
      {
        name: "Partner",
        price: "Custom pricing",
        description:
          "An ongoing partnership for organisations that need a studio on call. Design, iteration, and strategic support, month after month.",
        bestFor: "Best for larger organisations and scale-ups.",
        isHighlighted: false,
      },
    ],
    closingLine:
      "Not sure which fits? Get in touch and we'll figure it out together.",
  },
  finalCta: {
    headline: "Tell us about your project.",
    body:
      "Whether you've got a brief, a rough idea, or just a problem you can't quite name yet, we'd love to hear about it. We reply within a day, usually less.",
    ctaLabel: "Get in touch",
    secondaryLine: "Or email us directly at hello@ciaociao.studio",
  },
  siteSettings: {
    email: "hello@ciaociao.studio",
    tagline: "European product studio",
    location: "Made in Europe, working everywhere",
    socialLinks: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/",
      },
      {
        platform: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/",
      },
      {
        platform: "dribbble",
        label: "Dribbble",
        url: "https://dribbble.com/",
      },
    ],
    footerSignoff:
      "Designed and built by humans, with help from AI.",
  },
};
