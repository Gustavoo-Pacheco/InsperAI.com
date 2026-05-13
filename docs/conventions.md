# Frontend Conventions

`design.md` says *what it looks like*. This doc says *how to build it cleanly*. **Read both before writing code.**

Anything not listed here is open to your judgment — but the rules below are not.

---

## 1. Folder Rules

```
src/
├── app/<route>/page.tsx          ← all routes live here, nowhere else
├── components/
│   ├── layout/                   ← Navbar, Footer, ScrollToTop, etc.
│   ├── ui/                       ← reusable design-system primitives
│   └── <route>/                  ← page-specific sections (e.g. components/home/Hero.tsx)
└── lib/                          ← non-React modules only (no JSX)
    ├── api.ts
    ├── types.ts
    └── utils.ts
```

- A component used by **≥2 pages** must move from `components/<route>/` up to `components/ui/` (or `components/layout/` if structural).
- No barrel `index.ts` files anywhere.
- No new top-level folders without updating this doc first.

---

## 2. File & Symbol Naming

| Kind | Pattern | Example |
|---|---|---|
| React component | `PascalCase.tsx`, default export same name as file | `GlassCard.tsx` → `export default function GlassCard` |
| Hook | `useThing.ts`, named export | `useScrollPosition.ts` |
| Utility module | `camelCase.ts`, named exports | `api.ts` → `export function getMembros()` |
| Route folder | lowercase, matches Django URL slug | `processo-seletivo/` (not `processoSeletivo`) |
| Type / interface | `PascalCase`, no `I` prefix | `Membro`, `SiteSettings` |

One component per file.

---

## 3. Server vs Client Components

- **Default = server component.** Only add `"use client"` when the file uses state, effects, browser APIs, or event handlers.
- Data-fetching pages (Home, Sobre, Membros, Eventos, Recursos) **must fetch in the server component** via `src/lib/api.ts`. No `useEffect` data-fetching.
- For interactive pages (Newsletter filter, Contato form), keep `page.tsx` as a server component and isolate `"use client"` to the smallest possible child component.

---

## 4. Styling

- **Tailwind utilities first.** Reach for `var(--color-accent)` only when expressing a value defined in the `@theme` token set in `globals.css`.
- **No raw hex colors in JSX.** All colors flow through tokens.
- **No inline `style={{}}`** except for genuinely dynamic numeric values (computed transforms, etc.).
- Compose classes with `cn()` from `src/lib/utils.ts`. Never string-concat `className`.
- Spacing comes from the `--spacing-*` scale. No one-off `mt-[37px]`.

---

## 5. Data & API

- **All network calls go through `src/lib/api.ts`.** Pages and components never call `fetch` directly.
- All API response shapes are typed in `src/lib/types.ts`. **No `any`. No `as unknown as Foo`.**
- Paginated endpoints: always read `.results`. Never assume the array is the body.
- Build image URLs with `mediaUrl(path)`. Use `next/image` with `width` + `height`.

---

## 6. Component Contract

- Props: explicit `interface XxxProps`. Inline-destructured types allowed only up to 3 fields.
- `children` is typed as `React.ReactNode`.
- Any visual component accepts an optional `className?: string` and merges it with `cn()`.
- No prop drilling more than 2 levels deep — lift state or compose differently.

---

## 7. Accessibility (Mandatory)

- Every `page.tsx` exports `metadata` with `title` and `description`.
- Use semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`. Not `<div>` soup.
- Icon-only buttons require `aria-label`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- All images need real `alt` text. Empty `alt=""` only for purely decorative elements (`DecorativeGlow`, background blurs).
- Focus styles must remain visible. Never remove the outline without replacing it.

---

## 8. Imports

- Use the `@/*` alias for anything in `src/`. **No `../../../`.**
- Order, with one blank line between groups:
  1. `react` / node stdlib
  2. third-party packages
  3. `@/lib/...`
  4. `@/components/...`
  5. relative imports (only sibling files within the same folder)

---

## 9. What NOT to Do

- No new top-level folders without updating this doc.
- No new design tokens without adding them to `globals.css` (`@theme` block).
- No client-side state libraries (Redux, Zustand, Jotai) until a real need is demonstrated.
- No CSS-in-JS libraries.
- No `console.log` in committed code.
- No `// TODO` without an owner or issue link.
- No `useEffect` to fetch data on a server-renderable page.

---

## 10. Adding a New Page — Checklist

1. Create `src/app/<route>/page.tsx`. Export `metadata`. Return `<main>...`.
2. Create `src/components/<route>/` and put page-specific sections there.
3. Reuse primitives from `src/components/ui/` and `src/components/layout/` — do not duplicate.
4. Fetch data only via helpers in `src/lib/api.ts`. If you need a new endpoint helper, add it there — not inline.
5. Verify before opening a PR:
   - Page renders at the route.
   - `npm run build` passes (types + bundle).
   - `npm run lint` passes.
   - Page is keyboard-navigable and has visible focus rings.
