import Link from "next/link";
import Header from "@/components/header";
import { defaultLocale, getSiteContent } from "@/content/site";

const content = getSiteContent(defaultLocale);

export function DocumentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-brand/40 py-9 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold tracking-tight uppercase md:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base font-normal leading-7 text-muted">
        {children}
      </div>
    </section>
  );
}

export function DocumentPage({
  documentLabel,
  title,
  effectiveDate,
  children,
}: {
  documentLabel: string;
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <div className="editorial-grid min-h-screen text-ink">
      <Header theme="light" labels={content.nav} />

      <main className="mx-auto w-full max-w-[1408px] px-5 pb-24 sm:px-8 lg:px-16">
        <div className="py-8 md:py-16">
          <Link
            href="/documents"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-brand underline"
          >
            ← All app documents
          </Link>

          <article className="glass-panel mt-8 max-w-4xl border border-brand/55 p-6 shadow-[0_24px_70px_rgba(97,38,18,0.08)] md:p-10 lg:p-14">
            <header className="border-b border-brand/40 pb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                between us / {documentLabel}
              </p>
              <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.4rem)] font-bold leading-[0.86] tracking-tighter uppercase">
                {title}
              </h1>
              <p className="mt-5 text-sm font-normal text-muted">
                Effective {effectiveDate}
              </p>
            </header>

            <div className="pt-9">{children}</div>
          </article>
        </div>
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
