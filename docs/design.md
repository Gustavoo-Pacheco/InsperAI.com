# Design Choices — InsperAI Frontend

This document defines the design system and decisions for every page of the InsperAI frontend. All pages must follow these rules so the site looks and feels consistent.

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties (hybrid) |
| Icons | lucide-react |
| Fonts | Inter via `next/font/google` |
| Data | Django REST API via `NEXT_PUBLIC_API_URL` env var |

---

## 2. Color System

The site is **dark only** — no light mode, no toggle.

All colors are defined as CSS custom properties in `globals.css`:

| Variable | Value | Usage |
|---|---|---|
| `--color-background` | `#09090B` | Page background |
| `--color-surface` | `#18181B` | Card and alternate section backgrounds |
| `--color-accent` | `#8B5CF6` | Primary purple accent |
| `--color-accent-end` | `#7C3AED` | Gradient end color |
| `--color-foreground` | `#FAFAFA` | Primary text |
| `--color-muted` | `#A1A1AA` | Secondary / muted text |
| `--color-border` | `rgba(255,255,255,0.08)` | Subtle borders |

**Accent glass tints** — used for hover states, overlays, and interactive states:

| Name | Value |
|---|---|
| Ultra-light | `rgba(139,92,246,0.08)` |
| Light | `rgba(139,92,246,0.15)` |
| Medium | `rgba(139,92,246,0.25)` |

---

## 3. Typography

**Font**: Inter loaded via `next/font/google`. Applied to `<html>` via className.
**Monospace** (`font-mono`): used for eyebrow labels, captions, and code-like elements.

| Role | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Display / Hero | 48px+ | 800 | -0.02em | 1.1 |
| Section heading | 32px | 700 | -0.01em | 1.25 |
| Sub-heading | 24px | 600 | 0 | 1.3 |
| Body | 16–17px | 400–500 | 0 | 1.6–1.65 |
| Eyebrow label | 12–14px | 500 | 0.10–0.12em | — |
| Mono caption | 12–13px | 400 | 0.06–0.08em | — |

**Eyebrow labels** (section labels like "MEMBROS", "SOBRE NÓS"):
- Uppercase, `font-mono`, `--color-accent`, wide letter-spacing (0.10–0.12em)
- Always appear above the main heading of a section

**Gradient text** (hero headings):
```css
background: linear-gradient(135deg, var(--color-accent), var(--color-accent-end));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 4. Spacing Scale

```css
--spacing-xs:    4px
--spacing-sm:    8px
--spacing-md:    16px
--spacing-lg:    24px
--spacing-xl:    48px
--spacing-2xl:   80px
--spacing-3xl:   128px
--navbar-height: 64px
```

Use these variables (not arbitrary values) for vertical rhythm and section padding.

---

## 5. Visual Style

**Overall vibe**: Premium & Techy.

### Glassmorphism — `.glass` utility class

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

Used on: cards, navbar on scroll, quick-link buttons, input fields.

### Decorative Glow — `<DecorativeGlow>` component

Absolutely positioned div behind hero sections:
- Shape: circle (`border-radius: 50%`)
- Size: 400–600px
- Color: `var(--color-accent)`
- Filter: `blur(120px)`
- Opacity: 0.15–0.25
- `pointer-events: none`, `z-index: 0`

### Alternating section backgrounds

- Even sections (0, 2, 4…): `background: var(--color-background)`
- Odd sections (1, 3, 5…): `background: var(--color-surface)`

---

## 6. Navbar

- **Position**: `fixed`, `top: 0`, full width, `z-50`, height = `var(--navbar-height)` (64px)
- **At page top**: fully transparent, white text, no border — blends into the home hero
- **On scroll**: switches to glass style — `backdrop-filter: blur(12px)` + `background: rgba(9,9,11,0.90)` + `border-bottom: 1px solid var(--color-border)`
- **Transition**: `transition: background 200ms ease, border 200ms ease`
- **Implementation**: `"use client"` component with `scroll` event listener or `IntersectionObserver`
- All page content in root layout has `pt-[var(--navbar-height)]` to avoid overlap

---

## 7. Page Hero Pattern (inner pages)

Each inner page has its own unique hero — they share structural rules (padding, typography scale, DecorativeGlow) but must feel distinct from each other in layout, supporting elements, and mood.

**Shared rules across all inner-page heroes:**
- Top padding: `var(--spacing-xl)` (the root `<main>` already offsets by `var(--navbar-height)`, so the hero only needs the extra breathing room above the eyebrow)
- Bottom padding: `var(--spacing-2xl)`
- Always include a `<DecorativeGlow>` positioned behind content (`z-index: 0`)
- Eyebrow label: mono, accent, uppercase, wide letter-spacing
- Main heading: gradient text, 48px+, weight 800
- Subtitle: muted color, 16–17px

**Home page**: full-bleed hero with `-mt-[var(--navbar-height)]` so the hero sits behind the transparent navbar.

**Newsletter pages** (`/newsletter`, `/newsletter/<week_id>/<segment>`, `/newsletter/arquivo`): main heading uses **solid white (`var(--color-foreground)`) instead of gradient text**. The colored accent stays on the eyebrow and segment badges, keeping the headline editorial and high-contrast.


---

## 8. Animations (Subtle & purposeful)

No looping animations. No auto-playing motion.

| Interaction | Animation |
|---|---|
| Card hover | `hover:-translate-y-px` + `transition-transform duration-200` |
| Button hover | `hover:scale-[1.005]` + `transition-all duration-200` |
| Glass button hover | background → accent ultra-light tint |
| Scroll entrance | `opacity: 0 → 1` + `translateY(16px → 0)` via IntersectionObserver |
| Staggered grids | Each card delayed by `index * 60ms` |
| Navbar scroll | `transition: background 200ms, border 200ms` |

---

## 9. Component Architecture

```
src/
├── app/
│   ├── layout.tsx                    # Root: Navbar + Footer + ScrollToTop
│   ├── page.tsx                      # /
│   ├── sobre/page.tsx                # /sobre
│   ├── membros/page.tsx              # /membros
│   ├── eventos/page.tsx              # /eventos
│   ├── recursos/page.tsx             # /recursos
│   ├── newsletter/page.tsx           # /newsletter
│   ├── contato/page.tsx              # /contato
│   └── processo-seletivo/page.tsx    # /processo-seletivo
├── components/
│   ├── layout/                       # Navbar, Footer, ScrollToTop
│   ├── ui/                           # DecorativeGlow, GlassCard, GradientText, Badge
│   ├── home/
│   ├── sobre/
│   ├── membros/
│   ├── eventos/
│   ├── recursos/
│   ├── newsletter/
│   ├── contato/
│   └── processo-seletivo/
└── lib/
    ├── api.ts                        # fetch() helpers for all endpoints
    └── types.ts                      # TypeScript types mirroring Django models
```

### Server vs Client components

- **Server component (default)**: all data-fetching pages — Membros, Eventos, Recursos, Sobre, Home
- **`"use client"`**: pages/components with interactive state — Newsletter (filter + form), Contato (contact form), Navbar (scroll state)

---


## 11. API Integration

- **Base URL**: `process.env.NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8000` in dev)
- **Fetching**: `fetch(NEXT_PUBLIC_API_URL + '/api/...')` inside server components — no `useEffect`
- **Images**: `NEXT_PUBLIC_API_URL + '/media/' + item.foto`
- **Config**: Add `images.remotePatterns` in `next.config.ts` for the API domain
- **Pagination**: responses return `{ count, results: [...] }` — always consume `results`

**Endpoint → page mapping**:

| Page | Endpoints |
|---|---|
| `/` | `GET /api/core/settings/`, `GET /api/membros/?ativo=true` (first 12), `GET /api/core/parceiros/` |
| `/sobre` | `GET /api/core/depoimentos/` |
| `/membros` | `GET /api/membros/?ativo=true` |
| `/eventos` | `GET /api/eventos/?destaque=true`, `GET /api/eventos/?passado=true` |
| `/recursos` | `GET /api/recursos/?secao=material`, `GET /api/recursos/?secao=cursos` |
| `/newsletter` | `GET /api/newsletter/artigos/`, `POST /api/newsletter/inscricoes/` |
| `/contato` | `GET /api/core/settings/`, `GET /api/core/faq/`, `POST /api/contato/enviar/` |
| `/processo-seletivo` | `GET /api/processo-seletivo/` (includes etapas inline) |

---

## 12. Page Inventory

The sections listed below are starting-point suggestions — not a fixed spec. Each page's design plan is free to add, remove, reorder, split, or merge sections based on what serves that page best. The "Primary sections" column is a reference for intent, not a checklist.

| Route | Purpose | Suggested sections |
|---|---|---|
| `/` | Landing page | Hero (full-bleed), Missão, Quem Somos (member preview grid), Atividades, Parceiros carousel, Secondary CTA |
| `/sobre` | About the org | Missão (text + values), Valores (cards), História, Depoimentos (testimonials) |
| `/membros` | Full team | Hero, member grid grouped by nivel |
| `/eventos` | Events | Featured event hero (destaque=true), Past events grid |
| `/recursos` | Learning resources | Hero, sticky sub-nav (Material Próprio / Cursos Recomendados), two anchor-linked resource card sections |
| `/newsletter` | Articles + subscribe | Hero, sector filter pills (Engenharia / Direito / Finanças), featured article, article grid, subscribe form |
| `/contato` | Contact hub | Hero, quick-link cards (email / Instagram / LinkedIn), contact form, org info + Google Maps embed, FAQ accordion |
| `/processo-seletivo` | Recruitment | Status badge (aberto / fechado / em breve), process timeline (etapas), criteria, apply CTA |

---

## 13. Accessibility & SEO

- Every `page.tsx` exports a `metadata` object (`Metadata` from `next`)
- Semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`
- All icon-only buttons have `aria-label`
- External links: `target="_blank" rel="noopener noreferrer"` + `aria-label`
- Focus styles: visible ring using accent color
- Images: always include `alt` text
