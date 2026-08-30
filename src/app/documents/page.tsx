import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import { defaultLocale, getSiteContent } from "@/content/site";
import { createSiteMetadata } from "@/lib/metadata";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = createSiteMetadata({
  title: "App documents | Avarra",
  description: "Privacy policies and terms for apps published by Avarra.",
  path: "/documents",
  index: true,
});

const documents = [
  {
    href: "/documents/between-us/privacy-policy",
    label: "Privacy Policy",
    description: "How between us handles local data, analytics, and purchases.",
  },
  {
    href: "/documents/between-us/tos",
    label: "Terms of Service",
    description: "The terms that apply when you download or use between us.",
  },
] as const;

export default function DocumentsPage() {
  return (
    <div className="editorial-grid min-h-screen text-ink">
      <Header theme="light" labels={content.nav} />

      <main className="mx-auto w-full max-w-[1408px] px-5 pb-24 sm:px-8 lg:px-16">
        <header className="max-w-5xl border-b border-brand/60 pb-14 pt-8 md:pb-20 md:pt-16">
          <p className="section-kicker text-index">App documents</p>
          <h1 className="mt-8 text-[clamp(3.3rem,8vw,8rem)] font-bold leading-[0.84] tracking-tighter uppercase">
            Clear terms,
            <br />
            <span className="script-accent normal-case">app by app.</span>
          </h1>
          <p className="glass-panel mt-10 max-w-2xl border-l border-brand px-5 py-4 text-lg font-normal leading-7 text-muted">
            Privacy policies and terms for products published by Avarra. Choose
            an app, then open the document you need.
          </p>
        </header>

        <section className="py-16 lg:py-24" aria-labelledby="between-us-title">
          <article className="glass-panel grid gap-10 border border-brand/55 p-6 shadow-[0_24px_70px_rgba(97,38,18,0.08)] md:p-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Apps / 01
              </p>
              <h2
                id="between-us-title"
                className="mt-4 text-4xl font-bold tracking-tighter uppercase md:text-5xl"
              >
                between us
              </h2>
              <p className="mt-4 max-w-sm text-sm font-normal leading-6 text-muted">
                A conversation game for two people, intended for people aged 13
                and over.
              </p>
            </div>

            <nav aria-label="between us documents" className="grid gap-3">
              {documents.map((document) => (
                <Link
                  key={document.href}
                  href={document.href}
                  className="group border border-brand/45 bg-white/70 px-5 py-5 transition-colors hover:bg-brand hover:text-white"
                >
                  <span className="flex items-center justify-between gap-4 text-lg font-bold uppercase tracking-tight">
                    {document.label}
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="mt-2 block text-sm font-normal leading-6 text-muted transition-colors group-hover:text-white/80">
                    {document.description}
                  </span>
                </Link>
              ))}
            </nav>
          </article>
        </section>
      </main>

      <footer className="border-t border-brand/45 px-5 py-8 text-sm font-normal text-muted sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3">
          <p>© 2026 Aerio, Aiken Tine Ahac s.p.</p>
          <a className="font-semibold text-ink underline" href="mailto:hello@avarra.dev">
            hello@avarra.dev
          </a>
        </div>
      </footer>
    </div>
  );
}
