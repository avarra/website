import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ParticleField } from "@/components/visuals/particle-field-loader";
import { defaultLocale, getSiteContent, theme } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col overflow-x-hidden"
        style={
          {
            "--background": theme.colors.paper,
            "--foreground": theme.colors.ink,
            "--paper": theme.colors.paper,
            "--paper-soft": theme.colors.paperSoft,
            "--paper-muted": theme.colors.paperMuted,
            "--line": theme.colors.line,
            "--muted": theme.colors.muted,
            "--signal": theme.colors.signal,
            "--pulse": theme.colors.pulse,
            "--steel": theme.colors.steel,
          } as React.CSSProperties
        }
      >
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
          <ParticleField />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,253,248,0.34),rgba(247,244,238,0.78)_58%,rgba(247,244,238,0.92)_100%)]" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
