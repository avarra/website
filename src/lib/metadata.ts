import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://beta.avarra.dev";

const socialImage = {
  url: "/logo.png",
  width: 1024,
  height: 310,
  alt: "Avarra logo",
};

type SiteMetadataInput = {
  title: string;
  description: string;
  path?: `/${string}`;
};

export function createSiteMetadata({
  title,
  description,
  path = "/",
}: SiteMetadataInput): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Avarra",
      images: [socialImage],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
