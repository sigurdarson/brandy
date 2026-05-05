import type { Metadata } from "next";
import Script from "next/script";
import "./globals.scss";

const umamiScript = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  title: {
    default: "Ciao Ciao",
    template: "%s · Ciao Ciao",
  },
  description:
    "European product studio building websites, digital products, and design systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {umamiScript && umamiWebsiteId ? (
          <Script
            src={umamiScript}
            data-website-id={umamiWebsiteId}
            strategy="lazyOnload"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
