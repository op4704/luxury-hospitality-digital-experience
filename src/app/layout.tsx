import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DevMenu } from "@/components/layout/DevMenu";
import { Cursor } from "@/components/ui/Cursor";
import { PageTransition } from "@/components/motion/PageTransition";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aranya.estate"),
  title: { default: "Aranya Estate — A forest retreat in the Western Ghats", template: "%s · Aranya Estate" },
  description:
    "Eighteen villas on a 120-acre forest estate in Kerala's Western Ghats. Explore the property, the rooms and the days here before you book.",
  openGraph: {
    title: "Aranya Estate",
    description: "A forest retreat in the Western Ghats. Where time slows down.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0D0B",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <a href="#main" className="skip-link eyebrow">Skip to content</a>
        <div className="grain" aria-hidden="true" />
        <Providers>
          <Cursor />
          <Navbar />
          <PageTransition>
            <div id="main">{children}</div>
            <Footer />
          </PageTransition>
          <DevMenu />
        </Providers>
      </body>
    </html>
  );
}
