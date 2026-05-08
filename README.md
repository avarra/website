# Avarra Website

The marketing website for Avarra, built as a light, technical studio surface with localized content, configurable project data, and a site-wide Three.js particle backdrop.

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Three.js with React Three Fiber
- pnpm

## Development

Install dependencies and start the local server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
pnpm lint
pnpm build
pnpm start
```

## Project Notes

Most editable site content lives in `src/content/site.ts`, including copy, theme colors, services, projects, partners, team members, and contact details. English is the only active locale for now, with the content structure ready for more locales later.

The global layout in `src/app/layout.tsx` owns the site-wide particle/grid backdrop. Page sections should stay mostly Tailwind-driven, with shared visual primitives in `src/app/globals.css` only where Tailwind would become awkward.
