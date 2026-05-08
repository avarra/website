# Avarra Interactive Systems Lab Design

## Goal

Make the Avarra website feel more appealing, technical, and premium while keeping the current light-theme direction. The new experience should feel like an interactive systems lab: off-white surfaces, off-black typography, technical grids and textures, and a refined particle/cursor visual inspired by the current Remix website without copying its implementation.

## Visual Direction

Use direction B, "Interactive Systems Lab", with a touch of premium restraint from direction A.

- Keep the site light, using off-white backgrounds and off-black text as the dominant palette.
- Add subtle technical textures: grid lines, measurement marks, fine dot fields, scan-line accents, and framed system panels.
- Use a limited accent set for signal moments, not as a dominant palette.
- Add fancy particles with cursor-based disturbance in the hero and possibly section backgrounds.
- Keep idle animation quiet and intentional so the website feels premium rather than noisy.
- Respect reduced-motion preferences and provide static texture fallbacks.

## Landing Page Content

Expand the landing page from a single hero into a fuller conversion surface:

- Hero with a strong positioning headline, short support copy, service pills, proposal CTA, and interactive particle/circuit field.
- Signal strip with configurable metrics or status labels.
- Capability modules for internal systems, web/mobile products, and hardware.
- Process section covering diagnose, prototype, integrate, and scale.
- Featured work preview with two to three project cards.
- Partner and team placeholders.
- Final contact band.

## Work Page Content

Turn `/work` into a configurable portfolio surface rather than an image-only page:

- Opening statement with localized copy and the existing team hover portrait idea.
- Featured project grid driven by a project configuration object.
- Placeholder project entries with title, category, year, status, tags, image, and link fields.
- Partner/client placeholder index or marquee.
- Build-log or upcoming case-study cards for work that is not ready for a full case study yet.
- Reusable contact CTA.

## Content And Localization

All display text must be localized, even though only English is supported in the first pass.

- Add an English message object as the single source for copy.
- Structure messages so Slovenian can be added later without changing component APIs.
- Keep current URLs unprefixed for now: `/`, `/work`, and `/services`.
- Add minimal locale helpers with `en` as the only supported locale.
- Move dynamic content into easy-to-edit objects: services, projects, partners, team members, process steps, metrics, nav, and contact.
- Centralize colors in a configurable theme object and expose them through CSS custom properties.

## Architecture

Use the current Next App Router structure and follow the local Next 16 docs.

- Keep pages as Server Components by default.
- Replace `next/head` usage with App Router metadata exports where practical.
- Put heavy interactivity in small Client Component islands.
- Isolate Three/R3F in a dedicated particle component and dynamically load it from a client wrapper.
- Pass only the required visual configuration into client components.
- Prefer reusable section components under `src/components/sections`.
- Prefer shared content and config under `src/content`.

## Styling Rules

Use Tailwind CSS as the primary styling layer.

- Use Tailwind for layout, spacing, typography, responsive behavior, borders, and most visual styling.
- Use `globals.css` only for base styles, theme CSS variables, selection color, small reusable texture primitives, canvas fallback states, and keyframes that would be unreadable as Tailwind arbitrary classes.
- Avoid one-note palettes and keep the technical look restrained.
- Avoid nested cards and marketing-style decorative card stacks.
- Ensure text does not overflow buttons, cards, or compact panels on mobile or desktop.

## Particle System

The particle system should be fancy but contained.

- Use `three`, `@react-three/fiber`, and `@react-three/drei`.
- Keep the component client-only.
- Make cursor movement affect nearby particles or the field distortion.
- Keep performance predictable with a modest point count and efficient frame updates.
- Use a static fallback texture before hydration, on reduced motion, or if WebGL is unavailable.
- Ensure the canvas does not block content interaction.

## Verification

Before claiming completion:

- Run `pnpm lint`.
- Run `pnpm build`.
- Run the local dev server with `pnpm dev`.
- Visually inspect `/` and `/work` at desktop and mobile widths.
- Confirm the particle field renders, has a fallback, and does not create layout overlap.
