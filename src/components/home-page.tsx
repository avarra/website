"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { CalBookingLink } from "@/components/cal-booking-link";
import { defaultLocale, getSiteContent } from "@/content/site";

const featuredProjectSlugs = [
  "fundl",
  "go-to-market-toolkit",
  "glcharge",
  "yourflare",
] as const;
const featuredProjects = getSiteContent(defaultLocale).projects.filter(
  (project) => (featuredProjectSlugs as readonly string[]).includes(project.slug),
);

type Locale = "en" | "sl";

const translations = {
  en: {
    homeLabel: "Avarra home",
    booking: "Book a meeting",
    contact: "Contact us",
    hero: {
      prefix: "We shape",
      script: "digital products",
      suffix: "that leave a mark.",
      imageAlt: "Aiken and Matej working together",
      intro:
        "We are a close-knit team of strategic thinkers and hands-on builders. We create products that solve real problems, feel clear to use, and stay useful long after launch.",
    },
    services: {
      heading: "What do we do?",
      intro:
        "From first sketch to launch, we build thoughtful systems and products that help ambitious teams stand out and move forward.",
      ctaBody:
        "Have a project in mind? Tell us where it hurts and we’ll find the smartest way through.",
      items: [
        {
          title: "internal systems",
          body: "Custom platforms that simplify operations, automate repetitive work, and connect your team in one reliable system.",
        },
        {
          title: "web & mobile products",
          body: "Fast, thoughtful digital products designed around real users and built on foundations that are ready to scale.",
        },
        {
          title: "product design",
          body: "Clear interfaces and memorable visual systems that give complex ideas a confident, professional presence.",
        },
        {
          title: "hardware solutions",
          body: "Connected devices and embedded systems engineered to work cleanly with the software and people around them.",
        },
      ],
    },
    work: {
      heading: "Selected projects",
    },
    openSource: {
      heading: "Open source",
      intro:
        "Aiken builds and maintains open-source libraries used by other developers. This is a growing list — more projects will land here over time.",
      visitLabel: "Visit site",
      githubLabel: "GitHub",
      items: [
        {
          name: "Gigatable",
          tagline:
            "A source-installed React data grid for TanStack Table with editable cells, range selection, Excel-compatible copy & paste, fill handles, virtualization, and undo/redo.",
          url: "https://gigatable.dev",
          repo: "https://github.com/aikenahac/gigatable",
          tags: ["React", "TypeScript", "TanStack Table"],
        },
        {
          name: "mapcn-rn",
          tagline:
            "Beautiful, accessible, and customizable map components for React Native, built on MapLibre and Mapbox.",
          url: "https://mapcn-rn.dev",
          repo: "https://github.com/aikenahac/mapcn-react-native",
          tags: ["React Native", "MapLibre", "Mapbox"],
        },
      ],
    },
    footer: {
      teamAlt: "Aiken and Matej working together",
      navLabel: "Footer navigation",
      home: "Home",
      services: "Services",
      work: "Open source",
      contact: "Contact",
      language: "Language",
    },
  },
  sl: {
    homeLabel: "Domača stran Avarra",
    booking: "Rezerviraj sestanek",
    contact: "Kontaktiraj nas",
    hero: {
      prefix: "Oblikujemo",
      script: "digitalne produkte",
      suffix: "ki puščajo pečat.",
      imageAlt: "Aiken in Matej pri skupnem delu",
      intro:
        "Naša ekipa združuje strateško razmišljanje z vrhunskim sodobnim oblikovanjem ter ustvarja izkušnje, ki pritegnejo, navdušijo in ostanejo v spominu vašega občinstva.",
    },
    services: {
      heading: "S čim se ukvarjamo?",
      intro:
        "Od vizije do lansiranja ustvarjamo vrhunske spletne strani in spletne trgovine, zasnovane za izstopanje, rast in rezultate.",
      ctaBody:
        "Imaš projekt v mislih? Oglasi se nam in skupaj lahko ustvarimo nekaj izvrstnega.",
      items: [
        {
          title: "spletne strani",
          body: "Ustvarjamo dovršene, hitre in odzivne spletne strani, ki predstavljajo vašo znamko ter obiskovalce spreminjajo v stranke.",
        },
        {
          title: "spletne trgovine",
          body: "Razvijamo zmogljive spletne trgovine z brezhibno uporabniško izkušnjo, zasnovane za večjo prodajo in dolgoročno rast.",
        },
        {
          title: "oblikovanje",
          body: "Oblikujemo prepoznavne vizualne podobe in digitalne vmesnike, ki vaši znamki dajejo samozavesten in profesionalen nastop.",
        },
        {
          title: "seo optimizacija",
          body: "Izboljšamo vidnost vaše spletne strani v iskalnikih, povečamo organski obisk in vas povežemo s pravimi strankami.",
        },
      ],
    },
    work: {
      heading: "Izbrani projekti",
    },
    openSource: {
      heading: "Odprta koda",
      intro:
        "Aiken razvija in vzdržuje odprtokodne knjižnice, ki jih uporabljajo drugi razvijalci. Seznam se sproti širi — sčasoma bo tu več projektov.",
      visitLabel: "Obišči stran",
      githubLabel: "GitHub",
      items: [
        {
          name: "Gigatable",
          tagline:
            "Podatkovna tabela za React, zgrajena na TanStack Table, z urejanjem celic, izbiro obsegov, kopiranjem in lepljenjem, združljivim z Excelom, ročkami za polnjenje, virtualizacijo in razveljavitvijo.",
          url: "https://gigatable.dev",
          repo: "https://github.com/aikenahac/gigatable",
          tags: ["React", "TypeScript", "TanStack Table"],
        },
        {
          name: "mapcn/rn",
          tagline:
            "Lepe, dostopne in prilagodljive komponente zemljevidov za React Native, zgrajene na MapLibre in Mapbox.",
          url: "https://mapcn-rn.dev",
          repo: "https://github.com/aikenahac/mapcn-react-native",
          tags: ["React Native", "MapLibre", "Mapbox"],
        },
      ],
    },
    footer: {
      teamAlt: "Aiken in Matej pri skupnem delu",
      navLabel: "Navigacija v nogi strani",
      home: "Domov",
      services: "Storitve",
      work: "Odprta koda",
      contact: "Kontakt",
      language: "Jezik",
    },
  },
} as const;

const storageKey = "avarra-locale";
const localeChangeEvent = "avarra-locale-change";

const getLocaleSnapshot = (): Locale => {
  const savedLocale = window.localStorage.getItem(storageKey);
  return savedLocale === "sl" ? "sl" : "en";
};

const getServerLocaleSnapshot = (): Locale => "en";

const subscribeToLocale = (onStoreChange: () => void) => {
  const handleChange = () => onStoreChange();

  window.addEventListener("storage", handleChange);
  window.addEventListener(localeChangeEvent, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(localeChangeEvent, handleChange);
  };
};

const pageShell =
  "mx-auto w-full max-w-[1408px] px-16 max-[900px]:px-8 max-[680px]:px-5";

const orangeButton =
  "orange-button max-[680px]:min-h-9 max-[680px]:px-4 max-[680px]:text-[10px]";

const sectionHeading =
  "m-0 text-[clamp(18px,1.35vw,23px)] leading-none font-bold tracking-tighter uppercase";

const scriptFont =
  "font-[family-name:var(--font-mea-culpa)] font-normal text-brand";

const footerNavLink =
  "relative z-10 whitespace-nowrap text-[clamp(38px,4.3vw,70px)] leading-none font-bold tracking-tighter uppercase transition-[color,transform] duration-200 hover:-translate-x-2 hover:text-ink max-[680px]:whitespace-normal max-[680px]:text-[42px] motion-reduce:transition-none";

const localeButtonClass = (isActive: boolean) =>
  `relative cursor-pointer border-0 bg-transparent py-1 font-[inherit] transition-colors duration-200 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-center after:bg-current after:content-[''] after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-white motion-reduce:transition-none ${
    isActive
      ? "text-white after:scale-x-100"
      : "text-white/55 after:scale-x-0 hover:text-white"
  }`;

export function HomePage() {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const copy = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(storageKey, nextLocale);
    window.dispatchEvent(new Event(localeChangeEvent));
  };

  return (
    <div className="editorial-grid overflow-hidden font-extralight text-ink">
      <header
        className={`${pageShell} flex min-h-40 items-center justify-between max-[900px]:min-h-28 max-[680px]:min-h-24`}
      >
        <Link
          href="/"
          aria-label={copy.homeLabel}
          className="inline-flex transition-opacity duration-200 hover:opacity-60 motion-reduce:transition-none"
          data-cursor-label="Home"
        >
          <Image
            src="/logo_black.svg"
            alt="Avarra"
            width={118}
            height={30}
            loading="eager"
            className="h-auto w-36 max-[680px]:w-24"
          />
        </Link>
        <CalBookingLink className={orangeButton} cursorLabel="Book">
          {copy.booking}
        </CalBookingLink>
      </header>

      <main>
        <section
          className={`${pageShell} pt-20 max-[900px]:pt-12 max-[680px]:pt-14`}
          aria-labelledby="hero-title"
        >
          <h1
            id="hero-title"
            className="m-0 max-w-6xl text-[clamp(44px,5.1vw,80px)] leading-lg font-bold tracking-tighter uppercase max-[480px]:text-[clamp(34px,9.6vw,48px)] max-[680px]:leading-[1.12]"
          >
            {copy.hero.prefix}{" "}
            <span
              className={`${scriptFont} ml-[0.08em] inline-block text-[1.28em] leading-[0.58] tracking-tight normal-case [transform:translateY(0.08em)] max-[680px]:ml-0 max-[680px]:text-[1.18em]`}
            >
              {copy.hero.script}
            </span>
            <br />
            {copy.hero.suffix}
          </h1>

          <div className="image-frame group relative mt-8 aspect-[2.66/1] shadow-[0_28px_80px_rgba(97,38,18,0.12)] max-[900px]:aspect-[1.8/1] max-[680px]:mt-6 max-[680px]:aspect-[1.18/1]">
            <Image
              src="/aiken_matej.png"
              alt={copy.hero.imageAlt}
              fill
              loading="eager"
              sizes="(max-width: 760px) 100vw, 92vw"
              className="object-cover [object-position:center_43%] transition-transform duration-700 group-hover:scale-[1.015] motion-reduce:transition-none"
            />
          </div>

          <p className="glass-panel mt-9 max-w-2xl border-l border-brand px-5 py-4 text-[clamp(18px,1.55vw,25px)] leading-[1.12] font-light tracking-tight max-[680px]:mt-6 max-[680px]:max-w-[92%] max-[680px]:text-lg">
            {copy.hero.intro}
          </p>
        </section>

        <section
          id="services"
          className={`${pageShell} grid grid-cols-2 gap-7 pt-40 pb-24 max-[900px]:pt-28 max-[680px]:grid-cols-1 max-[680px]:pt-24 max-[680px]:pb-5`}
        >
          <div className="flex min-h-256 flex-col items-start pr-[14%] max-[900px]:min-h-208 max-[680px]:min-h-0 max-[680px]:pr-0">
            <h2 className={sectionHeading}>
              <span className="mr-2 font-extralight text-index">/01</span>{" "}
              {copy.services.heading}
            </h2>
            <p className="mt-10 max-w-xl text-base leading-tight tracking-tight max-[680px]:mt-6 max-[680px]:text-sm">
              {copy.services.intro}
            </p>
            <div className="mt-auto max-w-sm max-[680px]:mt-11">
              <a className={orangeButton} href="#contact" data-cursor-label="Contact">
                {copy.contact}
              </a>
              <p className="mt-4 text-sm leading-tight text-subtle">
                {copy.services.ctaBody}
              </p>
            </div>
          </div>

          <div className="grid gap-6 max-[680px]:mt-14 max-[680px]:gap-3.5">
            {copy.services.items.map((service) => (
              <article
                className="glass-panel flex flex-col justify-center border border-brand p-6 shadow-[0_18px_50px_rgba(97,38,18,0.05)] transition-transform duration-300 hover:-translate-y-1 max-[680px]:p-5 motion-reduce:transition-none"
                key={service.title}
              >
                <h3
                  className={`${scriptFont} m-0 text-[clamp(36px,3vw,50px)] leading-[0.9]`}
                >
                  {service.title}
                </h3>
                <p className="mt-10 max-w-xl text-base leading-tight tracking-tight max-[680px]:mt-7 max-[680px]:text-sm">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="work"
          className={`${pageShell} pt-40 pb-14 max-[900px]:pt-28 max-[680px]:pt-24`}
        >
          <h2 className={sectionHeading}>
            <span className="mr-2 font-extralight text-index">/02</span>{" "}
            {copy.work.heading}
          </h2>

          <div className="mt-18 grid grid-cols-2 gap-x-7 gap-y-18 max-[680px]:mt-12 max-[680px]:grid-cols-1 max-[680px]:gap-14">
            {featuredProjects.map((project) => (
              <article className="group" key={project.slug}>
                <Link
                  href={project.href}
                  aria-label={`Open ${project.title}`}
                  className="block"
                  data-cursor-label="View"
                >
                  <div className="image-frame relative aspect-[1.72/1]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 760px) 100vw, 46vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none"
                    />
                    {"year" in project && project.year ? (
                      <span className="absolute top-5 left-6 z-2 text-xs font-semibold tracking-tight text-white uppercase [text-shadow:0_1px_16px_rgba(0,0,0,0.4)] max-[680px]:top-3.5 max-[680px]:left-3.5 max-[680px]:text-[10px]">
                        {project.year}
                      </span>
                    ) : null}
                    <span className="absolute top-5 right-5 z-2 bg-white px-3 py-2 text-xs font-semibold tracking-tight text-brand uppercase max-[680px]:top-3.5 max-[680px]:right-3.5 max-[680px]:text-[10px]">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="mt-7 text-[clamp(20px,1.7vw,28px)] leading-none font-bold tracking-tighter uppercase max-[680px]:mt-5">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-tight tracking-tight">
                    {project.summary}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          id="open-source"
          className={`${pageShell} pt-40 pb-40 max-[900px]:pt-28 max-[680px]:pt-24 max-[680px]:pb-24`}
          aria-labelledby="open-source-title"
        >
          <h2 id="open-source-title" className={sectionHeading}>
            <span className="mr-2 font-extralight text-index">/03</span>{" "}
            {copy.openSource.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-tight tracking-tight max-[680px]:text-sm">
            {copy.openSource.intro}
          </p>

          <div className="mt-14 grid grid-cols-2 gap-6 max-[680px]:mt-9 max-[680px]:grid-cols-1 max-[680px]:gap-3.5">
            {copy.openSource.items.map((project) => (
              <article
                key={project.name}
                className="glass-panel flex flex-col justify-between border border-brand p-6 shadow-[0_18px_50px_rgba(97,38,18,0.05)] transition-transform duration-300 hover:-translate-y-1 max-[680px]:p-5 motion-reduce:transition-none"
              >
                <div>
                  <h3
                    className={`${scriptFont} m-0 text-[clamp(28px,2.4vw,40px)] leading-[0.9]`}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-6 max-w-xl text-base leading-tight tracking-tight max-[680px]:mt-4 max-[680px]:text-sm">
                    {project.tagline}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-brand/35 bg-brand-soft/60 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-brand uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex items-center gap-5">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={orangeButton}
                    data-cursor-label="Visit"
                  >
                    {copy.openSource.visitLabel}
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold tracking-tight text-ink underline decoration-brand/40 underline-offset-4 transition-colors duration-200 hover:text-brand"
                    data-cursor-label="GitHub"
                  >
                    {copy.openSource.githubLabel} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="bg-brand py-16 text-white max-[680px]:py-10"
        data-cursor-tone="light"
      >
        <div
          className={`${pageShell} grid grid-cols-2 items-start gap-10 max-[680px]:grid-cols-1 max-[680px]:gap-8`}
        >
          <Link
            href="#open-source-title"
            className="group relative block max-w-xl overflow-hidden max-[680px]:max-w-none"
            data-cursor-label="Projects"
          >
            <div className="relative aspect-[2.02/1] overflow-hidden bg-brand-deep">
              <Image
                src="/aiken_matej.png"
                alt={copy.footer.teamAlt}
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
                loading="eager"
                className="object-cover [object-position:center_43%]"
              />
            </div>
          </Link>

          <div className="flex min-h-full flex-col items-end max-[680px]:items-start">
            <nav
              className="flex flex-col items-end max-[680px]:items-start"
              aria-label={copy.footer.navLabel}
            >
              <Link href="/" className={footerNavLink} data-cursor-label="Home">
                {copy.footer.home}
              </Link>
              <Link href="/services" className={footerNavLink} data-cursor-label="View">
                {copy.footer.services}
              </Link>
              <Link href="#open-source-title" className={footerNavLink} data-cursor-label="Explore">
                {copy.footer.work}
              </Link>
              <a href="mailto:hello@avarra.dev" className={footerNavLink} data-cursor-label="Email">
                {copy.footer.contact}
              </a>
            </nav>

            <div
              className="mt-auto pt-8 text-xs font-medium tracking-wide uppercase max-[680px]:mt-8 max-[680px]:pt-0"
              aria-label={copy.footer.language}
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-pressed={locale === "sl"}
                  className={localeButtonClass(locale === "sl")}
                  onClick={() => changeLocale("sl")}
                  data-cursor-label="SL"
                >
                  SL
                </button>
                <span aria-hidden="true">/</span>
                <button
                  type="button"
                  aria-pressed={locale === "en"}
                  className={localeButtonClass(locale === "en")}
                  onClick={() => changeLocale("en")}
                  data-cursor-label="EN"
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${pageShell} mt-12 flex justify-center max-[680px]:mt-10`}
          aria-label="Avarra"
        >
          <Image
            src="/logo.svg"
            alt="Avarra"
            width={970}
            height={244}
            className="h-auto w-11/12 max-w-6xl"
          />
        </div>
      </footer>
    </div>
  );
}
