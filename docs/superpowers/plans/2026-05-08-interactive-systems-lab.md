# Interactive Systems Lab Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Avarra landing and work pages into a localized, configurable, light-theme technical studio site with an interactive Three/R3F particle field.

**Architecture:** Keep routes as Server Components and isolate browser-only work into small Client Component islands. Store all copy, colors, and dynamic entities in `src/content/site.ts`, expose color tokens through CSS custom properties, and use Tailwind for almost all layout and styling. Load the particle scene through a client dynamic-import wrapper so static page content remains server-rendered.

**Tech Stack:** Next 16 App Router, React 19, Tailwind CSS 4, TypeScript, `three`, `@react-three/fiber`, `@react-three/drei`, `pnpm`.

---

## File Structure

- Create `src/content/site.ts`: supported locales, English messages, theme colors, nav, contact, services, process steps, metrics, projects, partners, team, and build-log data.
- Create `src/components/sections/contact-cta.tsx`: reusable localized contact band.
- Create `src/components/sections/team-statement.tsx`: small Client Component for team hover portraits.
- Create `src/components/visuals/particle-field-loader.tsx`: Client Component using `next/dynamic` with `ssr: false`.
- Create `src/components/visuals/particle-field-scene.tsx`: Client Component with R3F canvas and cursor-reactive particles.
- Modify `src/app/globals.css`: theme variables, body base, selection, texture utility classes, keyframes, and reduced-motion handling.
- Modify `src/components/header.tsx`: read localized nav labels from props and keep links accessible.
- Modify `src/app/layout.tsx`: use site metadata, theme variables, and correct HTML language.
- Modify `src/app/page.tsx`: landing page content from `siteContent.en`.
- Modify `src/app/work/page.tsx`: work page content from `siteContent.en`, with `TeamStatement`.
- Modify `src/app/services/page.tsx`: move page copy and service data to `siteContent.en` while preserving the existing service page structure.

---

### Task 1: Content, Theme, And Locale Source

**Files:**
- Create: `src/content/site.ts`

- [ ] **Step 1: Create the content module**

Create `src/content/site.ts` with this shape and initial content:

```ts
export const locales = ["en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);

export const theme = {
  colors: {
    ink: "#171514",
    paper: "#f7f4ee",
    paperSoft: "#fffdf8",
    paperMuted: "#ebe5da",
    line: "#d7cec0",
    muted: "#756f66",
    signal: "#6f8d78",
    pulse: "#b96a53",
    steel: "#65737e",
  },
};

export const siteContent = {
  en: {
    metadata: {
      title: "Avarra",
      description:
        "Avarra builds technical systems, products, and hardware for ambitious operators.",
    },
    nav: {
      home: "Avarra home",
      services: "Services",
      work: "Work",
      proposal: "Request proposal",
    },
    contact: {
      label: "Start a build",
      heading: "Bring us the messy system.",
      body: "We turn rough operations, product ideas, and hardware concepts into software that holds together under real use.",
      email: "hello@avarra.dev",
    },
    home: {
      hero: {
        eyebrow: "Technical systems studio",
        title: "Interfaces for ambitious operators.",
        body: "Avarra designs and builds internal systems, web and mobile products, and connected hardware workflows for teams that need momentum without mess.",
        primaryCta: "Request proposal",
        secondaryCta: "See work",
        pills: ["Internal systems", "Web and mobile", "Hardware workflows"],
      },
      ticker: "Only 2 spots left",
      metrics: [
        { value: "03", label: "Core build tracks" },
        { value: "24h", label: "Signal response window" },
        { value: "01", label: "Focused team per build" },
      ],
      process: [
        {
          title: "Diagnose",
          text: "Map the real workflow, the bottlenecks, and the constraints before the interface gets polished.",
        },
        {
          title: "Prototype",
          text: "Shape the first working model quickly, then test the riskiest assumptions in the open.",
        },
        {
          title: "Integrate",
          text: "Connect the product to the tools, devices, data, and teams it needs to serve.",
        },
        {
          title: "Scale",
          text: "Harden the system, refine the operating loops, and leave room for the next release.",
        },
      ],
      featuredWorkHeading: "Selected systems in motion",
      partnersHeading: "Built with operators, founders, and product teams",
    },
    servicesPage: {
      metadataTitle: "Services | Avarra",
      metadataDescription:
        "Avarra builds product-led systems, web platforms, apps, and hardware solutions that scale.",
      heroTitle: "We build tools and apps people actually use and love.",
      heroBody:
        "Product-led systems, elegant mobile apps, and web platforms that scale. We help teams ship faster, reduce operational cost, and turn work into outcomes.",
      testimonial:
        "Avarra is the best agency I have worked with for software and hardware development. They took my idea and turned it into a clean, high-performing product that exceeded expectations.",
      diagramAlt:
        "Avarra service diagram covering hardware solutions, internal systems, and web and mobile products",
    },
    workPage: {
      metadataTitle: "Work | Avarra",
      metadataDescription:
        "Selected work, collaborations, and build logs from the Avarra team.",
      introPrefix: "Our team members",
      introSuffix:
        "have collectively and individually collaborated with a wide range of clients and partners.",
      projectsHeading: "Project index",
      buildLogHeading: "Build log",
      partnerHeading: "Partner signals",
    },
    services: [
      {
        title: "Internal systems",
        slug: "internal-systems",
        image: "/services1.png",
        imageAlt: "A team celebrating around a planning table",
        text: "Custom platforms that streamline operations, automate repetitive tasks, and connect workflows into one smooth ecosystem.",
      },
      {
        title: "Hardware solutions",
        slug: "hardware-solutions",
        image: "/services2.png",
        imageAlt: "An engineer working on a circuit board",
        text: "Devices, embedded systems, and smart technology designed for real-world reliability and seamless software integration.",
      },
      {
        title: "Mobile and web products",
        slug: "mobile-web-products",
        image: "/services3.png",
        imageAlt: "A person using a mobile app",
        text: "Fast, modern, scalable apps with clean functionality and strong long-term product foundations.",
      },
    ],
    projects: [
      {
        title: "Fundl",
        category: "Growth platform",
        year: "2026",
        status: "Live system",
        image: "/work1.png",
        imageAlt: "Selected Fundl campaign work",
        href: "/fundl",
        tags: ["Web product", "Go-to-market", "Automation"],
        summary:
          "A launch-ready product surface and growth workflow for a focused fintech offer.",
      },
      {
        title: "Operator Console",
        category: "Internal system",
        year: "2026",
        status: "Draft case study",
        image: "/work2.png",
        imageAlt: "Selected go-to-market toolkit work",
        href: "/work",
        tags: ["Dashboards", "Workflow", "Reporting"],
        summary:
          "A configurable control surface for teams that need operational clarity without spreadsheet sprawl.",
      },
      {
        title: "Connected Device Loop",
        category: "Hardware workflow",
        year: "2026",
        status: "Concept",
        image: "/diagram.png",
        imageAlt: "Technical diagram for connected device workflow",
        href: "/work",
        tags: ["Hardware", "Telemetry", "Interface"],
        summary:
          "A device-to-dashboard workflow for prototyping connected products and service operations.",
      },
    ],
    partners: ["Fundl", "Early-stage founders", "Operations teams", "Hardware labs"],
    team: [
      { name: "Aiken", image: "/aiken.png" },
      { name: "Matej", image: "/matej.png" },
      { name: "Tim", image: "/tim.png" },
    ],
    buildLog: [
      {
        title: "Case study shell",
        text: "A structured format for future project pages with challenge, system, release, and outcome sections.",
      },
      {
        title: "Partner index",
        text: "A compact surface for trusted collaborators, client categories, and future logos.",
      },
      {
        title: "Signal graphics",
        text: "Reusable technical textures and particles that can support future campaign pages.",
      },
    ],
  },
} as const;

export const getSiteContent = (locale: Locale = defaultLocale) =>
  siteContent[locale];
```

- [ ] **Step 2: Run TypeScript through lint**

Run: `pnpm lint`

Expected: PASS or only existing lint findings unrelated to `src/content/site.ts`.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/content/site.ts
git commit -m "feat: add localized site content"
```

Expected: commit succeeds with only `src/content/site.ts`.

---

### Task 2: Global Theme, Header, Layout, And Contact CTA

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/header.tsx`
- Create: `src/components/sections/contact-cta.tsx`

- [ ] **Step 1: Update global CSS**

Modify `src/app/globals.css` so it contains:

```css
@import "tailwindcss";

:root {
  --background: #f7f4ee;
  --foreground: #171514;
  --paper: #f7f4ee;
  --paper-soft: #fffdf8;
  --paper-muted: #ebe5da;
  --line: #d7cec0;
  --muted: #756f66;
  --signal: #6f8d78;
  --pulse: #b96a53;
  --steel: #65737e;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

::selection {
  background: var(--foreground);
  color: var(--paper);
}

.technical-grid {
  background-image:
    linear-gradient(rgba(23, 21, 20, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 21, 20, 0.08) 1px, transparent 1px);
  background-size: 36px 36px;
}

.fine-dots {
  background-image: radial-gradient(rgba(23, 21, 20, 0.28) 1px, transparent 1px);
  background-size: 18px 18px;
}

.signal-scan {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(23, 21, 20, 0.08) 0 1px,
    transparent 1px 8px
  );
}

.ticker-track {
  animation: ticker 22s linear infinite;
}

@keyframes ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Update layout metadata and theme variables**

Modify `src/app/layout.tsx` to import `getSiteContent`, `theme`, and `defaultLocale`. Export metadata from content and set CSS variables on the body:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { defaultLocale, getSiteContent, theme } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col"
        style={
          {
            "--background": theme.colors.paper,
            "--foreground": theme.colors.ink,
            "--paper": theme.colors.paper,
            "--paper-soft": theme.colors.paperSoft,
            "--paper-muted": theme.colors.paperMuted,
            "--line": theme.colors.line,
            "--muted": theme.colors.muted,
            "--signal": theme.colors.signal,
            "--pulse": theme.colors.pulse,
            "--steel": theme.colors.steel,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Update the header API**

Modify `src/components/header.tsx` to accept labels and keep its existing theme behavior:

```tsx
import Image from "next/image";
import Link from "next/link";

type HeaderLabels = {
  home: string;
  services: string;
  work: string;
  proposal: string;
};

type Props = {
  theme?: "dark" | "light";
  active?: "services" | "work";
  overlay?: boolean;
  labels: HeaderLabels;
};

export default function Header({
  theme = "dark",
  active,
  overlay = false,
  labels,
}: Props) {
  const isLight = theme === "light";
  const textClass = isLight ? "text-[var(--foreground)]" : "text-white";
  const hoverClass = isLight ? "hover:text-black/60" : "hover:text-white/75";
  const proposalClass = isLight
    ? "border-black/55 hover:border-black hover:bg-black hover:text-white"
    : "border-white/75 hover:border-white hover:bg-white hover:text-black";
  const logoSrc = isLight ? "/logo_black.svg" : "/logo.svg";
  const positionClass = overlay ? "absolute left-0 top-0" : "relative";

  return (
    <header className={`${positionClass} z-30 w-full px-5 py-7 ${textClass} sm:px-10 lg:px-16`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="block transition-opacity hover:opacity-75" aria-label={labels.home}>
          <Image src={logoSrc} alt="Avarra" width={78} height={20} className="h-5 w-auto sm:h-6" priority />
        </Link>

        <nav className="hidden items-center gap-7 text-[15px] font-extrabold md:flex lg:gap-8">
          <Link className={`transition ${hoverClass} ${active === "services" ? "underline underline-offset-4" : ""}`} href="/services">
            {labels.services}
          </Link>
          <Link className={`transition ${hoverClass} ${active === "work" ? "underline underline-offset-4" : ""}`} href="/work">
            {labels.work}
          </Link>
        </nav>

        <a className={`border border-dashed px-3 py-2 text-[14px] font-extrabold transition sm:px-4 sm:text-[15px] ${proposalClass}`} href="#proposal">
          {labels.proposal}
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Add the reusable contact CTA**

Create `src/components/sections/contact-cta.tsx`:

```tsx
type Contact = {
  label: string;
  heading: string;
  body: string;
  email: string;
};

type Props = {
  contact: Contact;
};

export function ContactCta({ contact }: Props) {
  return (
    <section id="proposal" className="px-5 py-24 sm:px-10 md:py-32 lg:px-16">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[var(--line)] pt-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
            {contact.label}
          </p>
          <h2 className="mt-4 max-w-xl text-[clamp(2.25rem,5vw,5.7rem)] font-black leading-[0.95] tracking-normal">
            {contact.heading}
          </h2>
        </div>
        <div className="md:text-right">
          <p className="ml-auto max-w-xl text-lg font-medium leading-tight text-[var(--muted)] md:text-xl">
            {contact.body}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="mt-7 inline-block break-all text-[clamp(2.4rem,6vw,6rem)] font-black leading-none tracking-normal transition hover:text-[var(--pulse)]"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/app/globals.css src/app/layout.tsx src/components/header.tsx src/components/sections/contact-cta.tsx
git commit -m "feat: add shared theme and shell"
```

Expected: commit succeeds.

---

### Task 3: Cursor-Reactive Particle Field

**Files:**
- Create: `src/components/visuals/particle-field-loader.tsx`
- Create: `src/components/visuals/particle-field-scene.tsx`

- [ ] **Step 1: Add the dynamic loader**

Create `src/components/visuals/particle-field-loader.tsx`:

```tsx
"use client";

import dynamic from "next/dynamic";

const ParticleFieldScene = dynamic(
  () => import("./particle-field-scene").then((module) => module.ParticleFieldScene),
  {
    ssr: false,
    loading: () => <ParticleFieldFallback />,
  },
);

export function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <ParticleFieldFallback />
      <ParticleFieldScene />
    </div>
  );
}

function ParticleFieldFallback() {
  return (
    <div className="absolute inset-0 technical-grid opacity-70">
      <div className="absolute inset-0 fine-dots opacity-35" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line)] opacity-50" />
    </div>
  );
}
```

- [ ] **Step 2: Add the R3F scene**

Create `src/components/visuals/particle-field-scene.tsx`:

```tsx
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1450;

export function ParticleFieldScene() {
  return (
    <Canvas
      className="!absolute inset-0 opacity-90"
      camera={{ position: [0, 0, 7], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <Particles />
    </Canvas>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const { positions, basePositions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const palette = [
      new THREE.Color("#171514"),
      new THREE.Color("#6f8d78"),
      new THREE.Color("#b96a53"),
      new THREE.Color("#65737e"),
    ];

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const i = index * 3;
      const radius = 1.2 + Math.random() * 2.8;
      const angle = index * 0.17;
      const drift = (Math.random() - 0.5) * 1.4;
      positions[i] = Math.cos(angle) * radius + drift;
      positions[i + 1] = Math.sin(angle) * radius * 0.62 + (Math.random() - 0.5) * 1.3;
      positions[i + 2] = (Math.random() - 0.5) * 2.4;
      basePositions[i] = positions[i];
      basePositions[i + 1] = positions[i + 1];
      basePositions[i + 2] = positions[i + 2];

      const color = palette[index % palette.length];
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    return { positions, basePositions, colors };
  }, []);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * viewport.width;
      pointer.current.y = -(event.clientY / window.innerHeight - 0.5) * viewport.height;
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [viewport.height, viewport.width]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;

    const position = points.geometry.attributes.position as THREE.BufferAttribute;
    const elapsed = clock.getElapsedTime();

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const i = index * 3;
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const dx = bx - pointer.current.x;
      const dy = by - pointer.current.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
      const force = Math.min(0.55 / (distance * distance), 0.5);
      const wave = Math.sin(elapsed * 0.7 + index * 0.031) * 0.04;

      positions[i] = bx + dx * force + wave;
      positions[i + 1] = by + dy * force + Math.cos(elapsed * 0.5 + index * 0.019) * 0.035;
      positions[i + 2] = basePositions[i + 2] + Math.sin(elapsed + index * 0.013) * 0.08;
    }

    position.needsUpdate = true;
    points.rotation.z = Math.sin(elapsed * 0.12) * 0.045;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.024} vertexColors transparent opacity={0.78} sizeAttenuation />
    </points>
  );
}
```

- [ ] **Step 3: Run lint**

Run: `pnpm lint`

Expected: PASS. If React Three Fiber intrinsic type errors appear, adjust JSX to the installed R3F 9 syntax while keeping the same component boundaries.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/visuals/particle-field-loader.tsx src/components/visuals/particle-field-scene.tsx
git commit -m "feat: add interactive particle field"
```

Expected: commit succeeds.

---

### Task 4: Landing Page Rebuild

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace the landing page**

Modify `src/app/page.tsx` to be a Server Component that uses content, metadata, header labels, the particle field, and contact CTA:

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import { ParticleField } from "@/components/visuals/particle-field-loader";
import { defaultLocale, getSiteContent } from "@/content/site";

const content = getSiteContent(defaultLocale);

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
};

export default function Home() {
  const tickerItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--paper)] text-[var(--foreground)]">
      <Header theme="light" overlay labels={content.nav} />

      <main>
        <section className="relative min-h-screen overflow-hidden px-5 pb-12 pt-28 sm:px-10 lg:px-16">
          <ParticleField />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(255,253,248,0.15),rgba(247,244,238,0.96)_62%)]" />
          <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="pb-20">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[var(--muted)]">
                {content.home.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-4xl text-[clamp(4rem,10vw,10.5rem)] font-black leading-[0.82] tracking-normal">
                {content.home.hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-tight text-[var(--muted)] sm:text-xl">
                {content.home.hero.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {content.home.hero.pills.map((pill) => (
                  <span key={pill} className="border border-[var(--line)] bg-[var(--paper-soft)] px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em]">
                    {pill}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#proposal" className="border border-[var(--foreground)] bg-[var(--foreground)] px-5 py-3 text-sm font-black uppercase text-[var(--paper)] transition hover:bg-transparent hover:text-[var(--foreground)]">
                  {content.home.hero.primaryCta}
                </a>
                <Link href="/work" className="border border-[var(--line)] px-5 py-3 text-sm font-black uppercase transition hover:border-[var(--foreground)]">
                  {content.home.hero.secondaryCta}
                </Link>
              </div>
            </div>

            <div className="mb-20 hidden border border-[var(--line)] bg-[var(--paper-soft)]/80 p-4 shadow-[0_30px_90px_rgba(23,21,20,0.12)] lg:block">
              <Image src="/hero.png" alt="" width={823} height={649} className="aspect-[1.2/1] w-full object-cover object-[33%_28%] grayscale" priority />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-20 w-full border-y border-[var(--foreground)] bg-[var(--foreground)] py-4 text-[var(--paper)]">
            <div className="ticker-track flex w-max items-center gap-9 whitespace-nowrap text-lg font-extrabold uppercase tracking-normal sm:text-xl">
              {[...tickerItems, ...tickerItems].map((_, index) => (
                <span key={index}>{content.home.ticker}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl border-y border-[var(--line)] md:grid-cols-3">
            {content.home.metrics.map((metric) => (
              <div key={metric.label} className="border-[var(--line)] py-8 md:border-r md:px-8 md:last:border-r-0">
                <div className="text-5xl font-black">{metric.value}</div>
                <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
            {content.services.map((service, index) => (
              <article key={service.slug} className="group border border-[var(--line)] bg-[var(--paper-soft)] p-5 transition hover:-translate-y-1 hover:border-[var(--foreground)]">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="max-w-xs text-3xl font-black leading-none">{service.title}</h2>
                  <span className="font-mono text-xs font-bold text-[var(--muted)]">0{index + 1}</span>
                </div>
                <Image src={service.image} alt={service.imageAlt} width={430} height={524} className="mt-8 aspect-[1.05/1] w-full object-cover grayscale transition group-hover:grayscale-0" />
                <p className="mt-5 text-base font-medium leading-tight text-[var(--muted)]">{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-3 md:grid-cols-4">
              {content.home.process.map((step, index) => (
                <article key={step.title} className="technical-grid border border-[var(--line)] bg-[var(--paper-soft)] p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--pulse)]">0{index + 1}</p>
                  <h2 className="mt-10 text-3xl font-black leading-none">{step.title}</h2>
                  <p className="mt-4 text-sm font-medium leading-tight text-[var(--muted)]">{step.text}</p>
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
                <Link key={project.title} href={project.href} className="group border border-[var(--line)] bg-[var(--paper-soft)] p-4 transition hover:border-[var(--foreground)]">
                  <Image src={project.image} alt={project.imageAlt} width={500} height={500} className="aspect-[1.15/1] w-full object-cover grayscale transition group-hover:grayscale-0" />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black">{project.title}</h3>
                      <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">{project.category} / {project.year}</p>
                    </div>
                    <span className="text-sm font-black text-[var(--pulse)]">{project.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl border-y border-[var(--line)] py-10">
            <h2 className="max-w-2xl text-4xl font-black leading-none">{content.home.partnersHeading}</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {content.partners.map((partner) => (
                <span key={partner} className="border border-[var(--line)] bg-[var(--paper-soft)] px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em]">
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
```

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/app/page.tsx
git commit -m "feat: rebuild landing page"
```

Expected: commit succeeds.

---

### Task 5: Work Page Rebuild

**Files:**
- Create: `src/components/sections/team-statement.tsx`
- Modify: `src/app/work/page.tsx`

- [ ] **Step 1: Add the team hover component**

Create `src/components/sections/team-statement.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";

type TeamMember = {
  name: string;
  image: string;
};

type Props = {
  members: readonly TeamMember[];
  prefix: string;
  suffix: string;
};

export function TeamStatement({ members, prefix, suffix }: Props) {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);

  return (
    <section className="relative mx-auto max-w-6xl px-5 pt-28 text-center sm:px-10 md:pt-36 lg:px-16">
      <p className="mx-auto max-w-5xl text-[clamp(2.1rem,5.2vw,4.4rem)] font-black leading-[1.05] tracking-normal">
        {prefix} (
        {members.map((member, index) => (
          <span key={member.name}>
            <button
              type="button"
              className="align-baseline underline underline-offset-[0.14em] transition hover:text-[var(--pulse)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)]"
              onMouseEnter={() => setActiveMember(member)}
              onMouseLeave={() => setActiveMember(null)}
              onFocus={() => setActiveMember(member)}
              onBlur={() => setActiveMember(null)}
            >
              {member.name}
            </button>
            {index < members.length - 2 ? ", " : index === members.length - 2 ? ", and " : ""}
          </span>
        ))}
        ), {suffix}
      </p>

      <div
        className={`pointer-events-none absolute left-1/2 top-10 hidden w-52 -translate-x-1/2 transition duration-200 md:block ${
          activeMember ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        aria-hidden="true"
      >
        {activeMember && (
          <Image
            src={activeMember.image}
            alt=""
            width={208}
            height={260}
            className="aspect-4/5 w-full object-cover shadow-[0_18px_45px_rgba(23,21,20,0.2)]"
          />
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace the work page**

Modify `src/app/work/page.tsx`:

```tsx
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
    <div className="min-h-screen bg-[var(--paper)] text-[var(--foreground)]">
      <Header theme="light" active="work" labels={content.nav} />

      <main className="overflow-hidden">
        <TeamStatement members={content.team} prefix={content.workPage.introPrefix} suffix={content.workPage.introSuffix} />

        <section className="px-5 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
              <h1 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.85]">
                {content.workPage.projectsHeading}
              </h1>
              <p className="hidden max-w-xs text-right font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted)] md:block">
                Systems / products / hardware
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {content.projects.map((project) => (
                <article key={project.title} className="group border border-[var(--line)] bg-[var(--paper-soft)] p-4">
                  <Link href={project.href} aria-label={`Open ${project.title}`}>
                    <Image src={project.image} alt={project.imageAlt} width={700} height={520} className="aspect-[1.08/1] w-full object-cover grayscale transition group-hover:grayscale-0" />
                  </Link>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-3xl font-black leading-none">{project.title}</h2>
                      <p className="mt-2 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">
                        {project.category} / {project.year}
                      </p>
                    </div>
                    <span className="border border-[var(--line)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--pulse)]">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-medium leading-tight text-[var(--muted)]">{project.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-[var(--paper-muted)] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
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
          <div className="mx-auto grid max-w-7xl gap-6 border-y border-[var(--line)] py-10 md:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-4xl font-black leading-none">{content.workPage.partnerHeading}</h2>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {content.partners.map((partner) => (
                <span key={partner} className="border border-[var(--line)] bg-[var(--paper-soft)] px-3 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em]">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-[clamp(2.7rem,6vw,6rem)] font-black leading-[0.9]">{content.workPage.buildLogHeading}</h2>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {content.buildLog.map((item, index) => (
                <article key={item.title} className="signal-scan border border-[var(--line)] bg-[var(--paper-soft)] p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--pulse)]">0{index + 1}</p>
                  <h3 className="mt-12 text-3xl font-black leading-none">{item.title}</h3>
                  <p className="mt-4 text-sm font-medium leading-tight text-[var(--muted)]">{item.text}</p>
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
```

- [ ] **Step 3: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 4: Commit**

Run:

```bash
git add src/components/sections/team-statement.tsx src/app/work/page.tsx
git commit -m "feat: rebuild work page"
```

Expected: commit succeeds.

---

### Task 6: Services Page Localization Pass

**Files:**
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1: Replace local service data with content imports**

Modify `src/app/services/page.tsx` to remove `next/head`, import `Metadata`, `Header`, `ContactCta`, and `getSiteContent`, and render from `content.services` plus `content.servicesPage`. Preserve the existing asymmetrical service layout classes in a local `serviceLayouts` array keyed by index.

Use this page structure:

```tsx
import type { Metadata } from "next";
import Header from "@/components/header";
import { ContactCta } from "@/components/sections/contact-cta";
import Image from "next/image";
import { defaultLocale, getSiteContent } from "@/content/site";

const content = getSiteContent(defaultLocale);

const serviceLayouts = [
  {
    className: "md:col-span-2 md:grid md:grid-cols-[0.95fr_1.6fr] md:items-start md:gap-8",
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

export const metadata: Metadata = {
  title: content.servicesPage.metadataTitle,
  description: content.servicesPage.metadataDescription,
};

export default function Services() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--foreground)]">
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
              <p className="mx-auto mt-6 max-w-xs text-center text-base font-medium leading-tight text-[var(--muted)] md:absolute md:bottom-10 md:right-0 md:mt-0 md:text-left md:text-lg">
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
                  <p className="text-base font-medium leading-tight text-[var(--muted)] md:text-lg">
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
```

- [ ] **Step 2: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 3: Commit**

Run:

```bash
git add src/app/services/page.tsx
git commit -m "feat: localize services page"
```

Expected: commit succeeds.

---

### Task 7: Build And Visual Verification

**Files:**
- Modify only files required to fix verification failures.

- [ ] **Step 1: Run lint**

Run: `pnpm lint`

Expected: PASS.

- [ ] **Step 2: Run production build**

Run: `pnpm build`

Expected: PASS. If R3F causes SSR issues, confirm `particle-field-scene.tsx` is imported only through `particle-field-loader.tsx` and `ssr: false`.

- [ ] **Step 3: Start the dev server**

Run: `pnpm dev`

Expected: server starts and prints a local URL, usually `http://localhost:3000`.

- [ ] **Step 4: Inspect desktop and mobile**

Open `/` and `/work` at desktop and mobile widths.

Expected:

- Landing hero shows localized copy, proposal CTA, service pills, particle fallback, and particle canvas after hydration.
- `/work` shows localized team statement, project grid, partner signals, build-log cards, and contact CTA.
- No text overlaps or button overflow at mobile width.
- Canvas does not block links or buttons.
- Reduced-motion fallback does not leave blank visual space.

- [ ] **Step 5: Commit final fixes**

If verification required fixes, run:

```bash
git add src
git commit -m "fix: polish responsive verification issues"
```

Expected: commit succeeds only if fixes were made.

---

## Self-Review

- Spec coverage: Tasks cover localized content, centralized colors, Tailwind-first styling, landing additions, `/work` additions, services localization, Three/R3F particles, metadata, and verification.
- Placeholder scan: The plan intentionally creates configurable draft project/build-log entries for unfinished work and avoids incomplete implementation instructions.
- Type consistency: `Locale`, `theme`, `siteContent`, `getSiteContent`, `Header` labels, `ContactCta`, `TeamStatement`, and `ParticleField` names are consistent across tasks.
