import type { Metadata } from "next";
import { Inter, Mea_Culpa } from "next/font/google";
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
    >
      <body className="min-h-screen bg-white font-[family-name:var(--font-inter)] font-light text-ink selection:bg-brand selection:text-white">
        {children}
      </body>
    </html>
  );
}
