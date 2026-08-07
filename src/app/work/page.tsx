import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import { TeamStatement } from "@/components/sections/team-statement";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = createSiteMetadata({
  title: content.workPage.metadataTitle,
  description: content.workPage.metadataDescription,
  path: "/work",
});

export default function Work() {
  return (
    <div className="editorial-grid min-h-screen text-ink">
      <Header theme="light" active="work" labels={content.nav} />

      <main className="overflow-hidden">
        <TeamStatement
          members={content.team}
          prefix={content.workPage.introPrefix}
          suffix={content.workPage.introSuffix}
        />

        <section className="px-5 py-24 sm:px-8 md:py-36 lg:px-16">
          <div className="mx-auto max-w-[1280px]">
            <div className="flex items-end justify-between gap-6 border-b border-brand/60 pb-8">
              <div>
                <p className="section-kicker text-index">/01 Selected work</p>
                <h1 className="mt-8 text-[clamp(3.4rem,8vw,8rem)] font-bold leading-[0.84] tracking-tighter uppercase">
                {content.workPage.projectsHeading}
                </h1>
              </div>
              <p className="hidden max-w-xs text-right text-xs font-semibold uppercase tracking-[0.12em] text-muted md:block">
                Systems / products / hardware
              </p>
            </div>

            <div className="mt-12 grid gap-x-7 gap-y-16 md:grid-cols-2">
              {content.projects.map((project) => (
                <article
                  key={project.title}
                  className="group"
                >
                  <Link
                    href={project.href}
                    aria-label={`Open ${project.title}`}
                    className="image-frame block"
                    data-cursor-label="View"
                  >
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={700}
                      height={520}
                      className="aspect-[1.55/1] w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.025] group-hover:grayscale-0 motion-reduce:transition-none"
                    />
                    <span className="absolute left-4 top-4 text-xs font-semibold uppercase text-white [text-shadow:0_1px_16px_rgba(0,0,0,0.45)]">
                      {project.year}
                    </span>
                    <span className="absolute right-4 top-4 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-tight text-brand">
                      {project.category}
                    </span>
                  </Link>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-[clamp(1.5rem,2.4vw,2.6rem)] font-bold leading-none tracking-tighter uppercase">
                        {project.title}
                      </h2>
                    </div>
                    <span className="border border-brand/65 bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand backdrop-blur-sm">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-normal leading-tight text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                      className="border border-brand/25 bg-white/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:px-16">
          <div className="glass-panel mx-auto grid max-w-[1280px] gap-8 border-y border-brand/55 px-6 py-12 md:grid-cols-[0.8fr_1.2fr] md:px-10">
            <h2 className="text-[clamp(2.2rem,4vw,4.3rem)] font-bold leading-[0.9] tracking-tighter uppercase">
              {content.workPage.partnerHeading}
            </h2>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {content.partners.map((partner) => (
                <span
                  key={partner}
                  className="border border-brand/45 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8 md:py-36 lg:px-16">
          <div className="mx-auto max-w-[1280px]">
            <p className="section-kicker text-index">/02 Process notes</p>
            <h2 className="mt-8 text-[clamp(2.7rem,6vw,6rem)] font-bold leading-[0.88] tracking-tighter uppercase">
              {content.workPage.buildLogHeading}
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {content.buildLog.map((item, index) => (
                <article
                  key={item.title}
                  className="signal-scan glass-panel border border-brand/60 p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    0{index + 1}
                  </p>
                  <h3 className="script-accent mt-16 text-[clamp(2.2rem,3.3vw,3.5rem)] leading-[0.8]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm font-normal leading-tight text-muted">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactCta contact={content.contact} />
      </main>
    </div>
  );
}
