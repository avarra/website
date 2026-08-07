import type { Metadata } from "next";
import { Inter, Mea_Culpa } from "next/font/google";
import { CustomCursor } from "@/components/visuals/custom-cursor";
import { ParticleField } from "@/components/visuals/particle-field-loader";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const meaCulpa = Mea_Culpa({
  variable: "--font-mea-culpa",
  weight: "400",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = createSiteMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${inter.variable} ${meaCulpa.variable} scroll-smooth motion-reduce:scroll-auto`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen overflow-x-hidden bg-[#fffaf7] font-[family-name:var(--font-inter)] font-light text-ink selection:bg-brand selection:text-white">
        <div
          className="site-backdrop fixed inset-0 z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ParticleField />
          <div className="site-signal-grid absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.06),rgba(255,250,247,0.28)_52%,rgba(255,250,247,0.58)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,247,0.02),rgba(255,250,247,0.22)_46%,rgba(255,250,247,0.5)_100%)]" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
        <CustomCursor />
      </body>
    </html>
  );
}
