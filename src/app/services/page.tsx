import type { Metadata } from "next";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import Image from "next/image";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";

const content = getSiteContent(defaultLocale);

const serviceLayouts = [
  {
    className:
      "md:col-span-2 md:grid md:grid-cols-[0.95fr_1.6fr] md:items-start md:gap-8",
    imageClassName: "aspect-[4/3] md:aspect-[0.82/1]",
    textClassName: "md:max-w-xl",
  },
  {
    className: "md:col-start-1 md:mt-32",
    imageClassName: "aspect-[1/1.25]",
    textClassName: "mt-4",
  },
  {
    className: "md:col-start-2 md:mt-4 md:justify-self-end",
    imageClassName: "aspect-[0.82/1]",
    textClassName: "mt-4 text-right md:max-w-md",
  },
];

export const metadata: Metadata = createSiteMetadata({
  title: content.servicesPage.metadataTitle,
  description: content.servicesPage.metadataDescription,
  path: "/services",
});

export default function Services() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header theme="light" active="services" labels={content.nav} />

      <main id="services" className="overflow-hidden">
        <section className="mx-auto max-w-6xl px-5 pt-8 sm:px-10 lg:px-16">
          <div className="relative min-h-130 md:min-h-152.5">
            <h1 className="sticky top-24 z-20 mx-auto max-w-5xl text-center text-[clamp(2.15rem,5vw,4.75rem)] font-black leading-[1.08] tracking-normal md:top-28">
              {content.servicesPage.heroTitle}
            </h1>

            <div className="relative mx-auto -mt-4.5 max-w-5xl md:-mt-6">
              <Image
                src="/hero_services.png"
                alt=""
                width={360}
                height={474}
                className="mx-auto block aspect-[0.76/1] w-full max-w-72.5 object-cover grayscale md:max-w-90"
              />
              <p className="mx-auto mt-6 max-w-xs text-center text-base font-medium leading-tight text-(--muted) md:absolute md:bottom-10 md:right-0 md:mt-0 md:text-left md:text-lg">
                {content.servicesPage.heroBody}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-10 md:py-20 lg:px-16">
          <p className="mx-auto max-w-5xl text-[clamp(1.85rem,4vw,3.25rem)] font-black leading-[1.12] tracking-normal">
            {content.servicesPage.testimonial}
          </p>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-8 sm:px-10 md:py-12">
          <Image
            src="/diagram.png"
            alt={content.servicesPage.diagramAlt}
            width={620}
            height={620}
            className="mx-auto w-full max-w-155"
          />
        </section>

        <section className="mx-auto grid max-w-6xl gap-16 px-5 py-14 sm:px-10 md:grid-cols-2 md:gap-x-24 md:gap-y-10 lg:px-16">
          {content.services.map((service, index) => {
            const layout = serviceLayouts[index];

            return (
              <article key={service.slug} className={layout.className}>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={430}
                  height={524}
                  className={`w-full max-w-107.5 object-cover grayscale ${layout.imageClassName}`}
                />
                <div className={layout.textClassName}>
                  <h2 className="sr-only">{service.title}</h2>
                  <p className="text-base font-medium leading-tight text-(--muted) md:text-lg">
                    {service.text}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        <ContactCta contact={content.contact} />
      </main>
    </div>
  );
}
