import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import { defaultLocale, getSiteContent } from "@/content/site";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function Home() {
  const tickerItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className="min-h-screen overflow-hidden bg-transparent text-foreground">
      <Header theme="light" overlay labels={content.nav} />

      <main>
        <section className="relative min-h-screen overflow-hidden px-5 pb-12 pt-28 sm:px-10 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_44%,rgba(255,253,248,0.01),rgba(247,244,238,0.1)_58%,rgba(247,244,238,0.34)_100%)]" />
          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-end gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="pb-10 lg:pb-20">
              <h1 className="mt-5 max-w-4xl text-[clamp(4rem,10vw,7rem)] font-black leading-[0.82] tracking-normal">
                {content.home.hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-tight text-(--muted) sm:text-xl">
                {content.home.hero.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {content.home.hero.pills.map((pill) => (
                  <span
                    key={pill}
                    className="border border-(--line) bg-(--paper-soft) px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em]"
                  >
                    {pill}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#proposal"
                  className="border border-foreground bg-foreground px-5 py-3 text-sm font-black uppercase text-(--paper) transition hover:bg-transparent hover:text-foreground"
                >
                  {content.home.hero.primaryCta}
                </a>
                <Link
                  href="/work"
                  className="border border-(--line) px-5 py-3 text-sm font-black uppercase transition hover:border-foreground"
                >
                  {content.home.hero.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="mb-24 border border-(--line) bg-(--paper-soft)/80 p-3 shadow-[0_30px_90px_rgba(23,21,20,0.12)] sm:p-4 lg:mb-20">
              <Image
                src="/hero.png"
                alt=""
                width={823}
                height={649}
                className="aspect-[1.2/1] w-full object-cover object-[33%_28%] grayscale"
                priority
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-20 w-full border-y border-foreground bg-foreground py-4 text-(--paper)">
            <div className="ticker-track flex w-max items-center gap-9 whitespace-nowrap text-lg font-extrabold uppercase tracking-normal sm:text-xl">
              {[...tickerItems, ...tickerItems].map((_, index) => (
                <span key={index}>{content.home.ticker}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl border-y border-(--line) md:grid-cols-3">
            {content.home.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-(--line) py-8 md:border-r md:px-8 md:last:border-r-0"
              >
                <div className="text-5xl font-black">{metric.value}</div>
                <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-(--muted)">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {content.services.map((service, index) => (
              <article
                key={service.slug}
                className="group border border-(--line) bg-(--paper-soft) p-5 transition hover:-translate-y-1 hover:border-foreground"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="max-w-xs text-3xl font-black leading-none">
                    {service.title}
                  </h2>
                  <span className="font-mono text-xs font-bold text-(--muted)">
                    0{index + 1}
                  </span>
                </div>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={430}
                  height={524}
                  className="mt-8 aspect-[1.05/1] w-full object-cover grayscale transition group-hover:grayscale-0"
                />
                <p className="mt-5 text-base font-medium leading-tight text-(--muted)">
                  {service.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-3 md:grid-cols-4">
              {content.home.process.map((step, index) => (
                <article
                  key={step.title}
                  className="technical-grid border border-(--line) bg-(--paper-soft) p-5"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-(--pulse)">
                    0{index + 1}
                  </p>
                  <h2 className="mt-10 text-3xl font-black leading-none">
                    {step.title}
                  </h2>
                  <p className="mt-4 text-sm font-medium leading-tight text-(--muted)">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="max-w-3xl text-[clamp(2.3rem,5vw,5.5rem)] font-black leading-[0.9]">
              {content.home.featuredWorkHeading}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {content.projects.map((project) => (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group border border-(--line) bg-(--paper-soft) p-4 transition hover:border-foreground"
                >
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    width={500}
                    height={500}
                    className="aspect-[1.15/1] w-full object-cover grayscale transition group-hover:grayscale-0"
                  />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black">{project.title}</h3>
                      <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-(--muted)">
                        {project.category} / {project.year}
                      </p>
                    </div>
                    <span className="text-sm font-black text-(--pulse)">
                      {project.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl border-y border-(--line) py-10">
            <h2 className="max-w-2xl text-4xl font-black leading-none">
              {content.home.partnersHeading}
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {content.partners.map((partner) => (
                <span
                  key={partner}
                  className="border border-(--line) bg-(--paper-soft) px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em]"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ContactCta contact={content.contact} />
      </main>
    </div>
  );
}
