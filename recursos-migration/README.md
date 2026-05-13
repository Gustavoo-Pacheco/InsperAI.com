# Recursos — Migração de Frontend

Pacote autocontido com a página de Recursos do site institucional da Insper AI, pronto para colar em uma nova codebase Next.js (App Router) + Tailwind CSS v4.

## Estrutura

```
recursos-migration/
├── page.tsx                       # Página principal (Server Component)
├── components/
│   ├── ResourceCard.tsx           # Card de recurso (cursos / material)
│   ├── DifficultyBadge.tsx        # Badge de dificuldade colorido
│   └── DecorativeGlow.tsx         # Glow radial decorativo do hero
├── lib/
│   └── recursos.ts                # Tipos + dados curados (RECURSOS, getRecursosBySection)
├── styles/
│   └── recursos-tokens.css        # Design tokens (@theme) + .glass + .decorative-glow + .card-interactive
└── README.md
```

## Dependências

```bash
npm i lucide-react
```

Stack assumida:
- Next.js 15+ (App Router) — a página é Server Component (sem `"use client"`)
- React 19
- Tailwind CSS v4 (sintaxe `@theme` no CSS)
- TypeScript

## Passo a passo da migração

1. **Copie os arquivos** para a nova codebase. Sugestão de destino:
   - `page.tsx` → `src/app/recursos/page.tsx`
   - `components/*` → `src/components/recursos/`
   - `lib/recursos.ts` → `src/lib/data/recursos.ts`

2. **Ajuste os imports.** Os imports relativos (`./lib/...`, `../lib/...`) devem virar absolutos conforme o alias do projeto (ex.: `@/lib/data/recursos`, `@/components/recursos/...`).

3. **Importe os design tokens.** Cole o conteúdo de `styles/recursos-tokens.css` dentro do `globals.css` da nova codebase. A página depende de:
   - Variáveis: `--color-*`, `--spacing-*`, `--navbar-height`
   - Classes: `.glass`, `.decorative-glow`, `.card-interactive`
   - `font-mono` do Tailwind (mantenha o default ou configure uma mono customizada)

4. **Navbar height.** O hero e o sticky anchor nav dependem de `--navbar-height` (64px). Ajuste se o navbar da nova codebase tiver outra altura.

5. **Fonte.** A página usa `Geist Sans` via `--font-sans`. Se não estiver configurada, troque o fallback no token ou registre via `next/font`.

## Notas funcionais

- Página é **Server Component** — toda a renderização é estática. Sem `useState`, sem fetch.
- Dados de recursos estão **hardcoded** em `lib/recursos.ts` (6 itens: 3 cursos externos + 3 materiais próprios do Jornal). Para CMS-ificar (Sanity, etc.), substitua a função `getRecursosBySection` por uma query.
- Duas seções (`material` e `cursos`) alternam background entre `--color-background` e `--color-surface` para separação visual.
- Sticky anchor nav abaixo do navbar permite pular entre seções via `#material` / `#cursos`. `scrollMarginTop` já compensa o offset combinado.
- A11y: nav com `aria-label`, decorativos com `aria-hidden`, links externos com `aria-label` descritivo e `rel="noopener noreferrer"`.

## Conteúdo em pt-BR

Títulos, descrições, eyebrows e badges (`Iniciante` / `Intermediário` / `Avançado`) estão em português brasileiro.
