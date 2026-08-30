import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";

const content = getSiteContent(defaultLocale);

function getProject(slug: string) {
  return content.projects.find((project) => project.slug === slug);
}

export async function generateStaticParams() {
  return content.projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return createSiteMetadata({
      title: "Project | Avarra",
      description: "Selected work from the Avarra team.",
      path: `/work/${slug}`,
    });
  }

  return createSiteMetadata({
    title: `${project.title} | Avarra`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="editorial-grid min-h-screen text-ink">
      <Header theme="light" active="work" labels={content.nav} />

      <main className="overflow-hidden">
        <section className="px-5 pb-16 pt-8 sm:px-8 md:pt-16 lg:px-16">
          <div className="mx-auto max-w-[1280px]">
            <Link
              href="/work"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-brand underline"
              data-cursor-label="Back"
            >
              ← All work
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="border border-brand/65 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand backdrop-blur-sm">
                {project.category}
              </span>
              <span className="border border-brand/45 bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]">
                {project.status}
              </span>
              {"year" in project && project.year ? (
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  {project.year}
                </span>
              ) : null}
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,7vw,6.4rem)] font-bold leading-[0.86] tracking-tighter uppercase">
              {project.title}
            </h1>

            {"detail" in project && project.detail ? (
              <div className="glass-panel mt-12 max-w-3xl border border-brand/55 p-6 shadow-[0_24px_70px_rgba(97,38,18,0.08)] md:p-10">
                <div className="space-y-4 text-base font-normal leading-7 text-muted">
                  {project.detail.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="glass-panel mt-12 max-w-2xl border border-brand/55 p-6 shadow-[0_24px_70px_rgba(97,38,18,0.08)] md:p-10">
                <p className="script-accent text-[clamp(2rem,3.2vw,3rem)] leading-[0.9]">
                  Case study coming soon
                </p>
                <p className="mt-4 text-base font-normal leading-7 text-muted">
                  We&apos;re still writing up this build. Check back soon, or{" "}
                  <a
                    className="font-semibold text-ink underline"
                    href={`mailto:${content.contact.email}`}
                  >
                    get in touch
                  </a>{" "}
                  if you&apos;d like the details now.
                </p>
              </div>
            )}

            {"detail" in project && project.detail ? (
              <div className="mt-16 grid gap-6 sm:grid-cols-2">
                {project.detail.gallery.map((image) => (
                  <div key={image.src} className="image-frame flex items-center justify-center bg-paper-muted">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 760px) 100vw, 46vw"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-16 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-brand/25 bg-white/65 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm"
                >
                  {tag}
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
