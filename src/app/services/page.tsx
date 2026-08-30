import type { Metadata } from "next";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import Image from "next/image";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = createSiteMetadata({
  title: content.servicesPage.metadataTitle,
  description: content.servicesPage.metadataDescription,
  path: "/services",
});

export default function Services() {
  return (
    <div className="editorial-grid min-h-screen text-ink">
      <Header theme="light" active="services" labels={content.nav} />

      <main id="services" className="overflow-hidden">
        <section className="mx-auto max-w-[1408px] px-5 pt-10 sm:px-8 md:pt-16 lg:px-16">
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="relative z-10 pb-4 lg:pb-20">
              <p className="section-kicker text-index">/01 Services</p>
              <h1 className="mt-8 max-w-4xl text-[clamp(3.4rem,7vw,7.8rem)] font-bold leading-[0.86] tracking-tighter uppercase">
                {content.servicesPage.heroTitle}
              </h1>
              <p className="glass-panel mt-10 max-w-xl border-l border-brand px-5 py-4 text-lg leading-tight tracking-tight text-muted">
                {content.servicesPage.heroBody}
              </p>
            </div>

            <div className="image-frame group relative mx-auto w-full max-w-xl lg:mx-0 lg:ml-auto">
              <Image
                src="/hero_services.png"
                alt=""
                width={720}
                height={900}
                loading="eager"
                className="block aspect-[0.82/1] w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.015] group-hover:grayscale-0 motion-reduce:transition-none"
              />
              <span className="absolute right-4 top-4 bg-brand px-3 py-2 text-[10px] font-semibold uppercase tracking-tight text-white">
                Avarra / Build studio
              </span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1408px] px-5 py-24 sm:px-8 md:py-36 lg:px-16">
          <blockquote className="relative m-0 border border-brand bg-brand px-7 py-10 text-white shadow-[0_28px_80px_rgba(97,38,18,0.13)] md:px-14 md:py-16" data-cursor-tone="light">
            <span className="block text-6xl leading-none text-white/55">“</span>
            <p className="mt-5 max-w-5xl text-[clamp(1.9rem,4vw,4.2rem)] font-bold leading-[0.98] tracking-tighter uppercase">
              {content.servicesPage.testimonial}
            </p>
          </blockquote>
        </section>

        <section className="mx-auto grid max-w-[1408px] items-center gap-12 px-5 py-12 sm:px-8 md:grid-cols-2 md:py-20 lg:px-16">
          <div>
            <p className="section-kicker text-index">/02 System map</p>
            <h2 className="mt-8 max-w-xl text-[clamp(2.7rem,5vw,5.8rem)] font-bold leading-[0.9] tracking-tighter uppercase">
              Strategy meets <span className="script-accent normal-case">execution</span>.
            </h2>
          </div>
          <div className="glass-panel border border-brand/60 p-5 shadow-[0_24px_70px_rgba(97,38,18,0.08)] md:p-10">
            <Image
              src="/diagram.png"
              alt={content.servicesPage.diagramAlt}
              width={620}
              height={620}
              className="mx-auto w-full max-w-155"
            />
          </div>
        </section>

        <section className="mx-auto max-w-[1408px] px-5 pb-10 pt-24 sm:px-8 md:pt-36 lg:px-16">
          <p className="section-kicker text-index">/03 Capabilities</p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {content.services.map((service, index) => (
              <article
                key={service.slug}
                className="glass-panel group flex flex-col border border-brand/70 p-4 shadow-[0_18px_50px_rgba(97,38,18,0.05)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
              >
                <div className="image-frame">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    width={600}
                    height={720}
                    className="aspect-[1.05/1] w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.025] group-hover:grayscale-0 motion-reduce:transition-none"
                  />
                  <span className="absolute left-4 top-4 text-xs font-semibold text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.45)]">
                    /0{index + 1}
                  </span>
                </div>
                <h2 className="script-accent mt-8 text-[clamp(2.2rem,3.3vw,3.7rem)] leading-[0.82]">
                  {service.title}
                </h2>
                <p className="mt-8 text-sm leading-tight tracking-tight text-muted md:text-base">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <ContactCta contact={content.contact} />
      </main>
    </div>
  );
}
