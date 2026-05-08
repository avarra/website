import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import { TeamStatement } from "@/components/sections/team-statement";
import { defaultLocale, getSiteContent } from "@/content/site";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = {
  title: content.workPage.metadataTitle,
  description: content.workPage.metadataDescription,
};

export default function Work() {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header theme="light" active="work" labels={content.nav} />

      <main className="overflow-hidden">
        <TeamStatement
          members={content.team}
          prefix={content.workPage.introPrefix}
          suffix={content.workPage.introSuffix}
        />

        <section className="px-5 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6 border-b border-(--line) pb-6">
              <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.85]">
                {content.workPage.projectsHeading}
              </h1>
              <p className="hidden max-w-xs text-right font-mono text-xs font-bold uppercase tracking-[0.2em] text-(--muted) md:block">
                Systems / products / hardware
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {content.projects.map((project) => (
                <article
                  key={project.title}
                  className="group border border-(--line) bg-(--paper-soft) p-4"
                >
                  <Link href={project.href} aria-label={`Open ${project.title}`}>
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      width={700}
                      height={520}
                      className="aspect-[1.08/1] w-full object-cover grayscale transition group-hover:grayscale-0"
                    />
                  </Link>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black leading-none">
                        {project.title}
                      </h2>
                      <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-(--muted)">
                        {project.category} / {project.year}
                      </p>
                    </div>
                    <span className="border border-(--line) px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-(--pulse)">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-medium leading-tight text-(--muted)">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-(--paper-muted) px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
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

        <section className="px-5 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-6 border-y border-(--line) py-10 md:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-4xl font-black leading-none">
              {content.workPage.partnerHeading}
            </h2>
            <div className="flex flex-wrap gap-2 md:justify-end">
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

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-[clamp(2.7rem,6vw,6rem)] font-black leading-[0.9]">
              {content.workPage.buildLogHeading}
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {content.buildLog.map((item, index) => (
                <article
                  key={item.title}
                  className="signal-scan border border-(--line) bg-(--paper-soft) p-5"
                >
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-(--pulse)">
                    0{index + 1}
                  </p>
                  <h3 className="mt-12 text-3xl font-black leading-none">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-tight text-(--muted)">
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
