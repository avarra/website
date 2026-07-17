import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = createSiteMetadata({
  title: content.metadata.title,
  description: content.metadata.description,
});

export default function Page() {
  return <HomePage />;
}
