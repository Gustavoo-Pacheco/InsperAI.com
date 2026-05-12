import type { Metadata } from "next";
import { getRecursosBySection } from "@/lib/data/recursos";
import { ResourceCard } from "@/components/recursos";
import { DecorativeGlow } from "@/components/layout/DecorativeGlow";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Curadoria de cursos, trilha de aulas Insper AI e conteúdo do Jornal — tudo em um só lugar.",
};

const SECTIONS = [
  {
    id: "material" as const,
    eyebrow: "MATERIAL PRÓPRIO",
    heading: "Material Próprio",
    subtext: "Papers e posts do Jornal da Insper AI escritos pelos membros.",
    bg: "background",
  },
  {
    id: "cursos" as const,
    eyebrow: "CURSOS RECOMENDADOS",
    heading: "Cursos Recomendados",
    subtext: "Links curados para os melhores cursos externos de IA, do nível iniciante ao avançado.",
    bg: "surface",
  },
];

export default function RecursosPage() {
  return (
    <main style={{ background: "var(--color-background)" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "var(--navbar-height)",
          paddingBottom: "var(--spacing-2xl)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
        }}
      >
        {/* Ambient radial glow — adds depth without a garish gradient */}
        <DecorativeGlow />

        {/* "RECURSOS" label floated above hero, overlapping navbar bottom */}
        <p
          className="font-mono font-semibold uppercase"
          style={{
            position: "absolute",
            top: "calc(var(--navbar-height) - var(--spacing-lg))",
            left: "var(--spacing-xl)",
            fontSize: "14px",
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            zIndex: 60,
          }}
        >
          RECURSOS
        </p>

        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <h1
            className="font-semibold"
            style={{
              fontSize: "48px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-foreground)",
              marginBottom: "var(--spacing-md)",
              textWrap: "balance",
            } as React.CSSProperties}
          >
            Aprenda IA com profundidade
          </h1>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.65,
              color: "var(--color-muted)",
              maxWidth: "560px",
            }}
          >
            Curadoria de cursos, material próprio e conteúdo do Jornal da Insper AI.
          </p>
        </div>
      </section>

      {/* Sticky anchor nav — stays visible as user scrolls through sections */}
      <nav
        aria-label="Navegação por seção"
        style={{
          position: "sticky",
          top: "var(--navbar-height)",
          zIndex: 40,
          background: "rgba(9,9,11,0.90)",
          backdropFilter: "blur(12px)",
          paddingTop: "var(--spacing-sm)",
          paddingBottom: "var(--spacing-sm)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <ul
          className="mx-auto flex flex-wrap items-center gap-x-1 gap-y-1"
          style={{ maxWidth: "1120px", listStyle: "none", padding: 0, margin: 0 }}
        >
          {[
            { href: "#material", label: "Material Próprio" },
            { href: "#cursos", label: "Cursos Recomendados" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono font-semibold transition-colors hover:text-foreground"
                style={{
                  display: "inline-block",
                  fontSize: "13px",
                  letterSpacing: "0.06em",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Two sections — alternate background between --color-background and --color-surface */}
      {SECTIONS.map((section) => {
        const items = getRecursosBySection(section.id);
        const bgColor =
          section.bg === "surface" ? "var(--color-surface)" : "var(--color-background)";
        return (
          <section
            key={section.id}
            id={section.id}
            style={{
              background: bgColor,
              paddingTop: "var(--spacing-3xl)",
              paddingBottom: "var(--spacing-3xl)",
              paddingLeft: "var(--spacing-xl)",
              paddingRight: "var(--spacing-xl)",
              /* offset for sticky navbar + sticky anchor nav (~108px total) */
              scrollMarginTop: "calc(var(--navbar-height) + 45px)",
            }}
          >
            <div className="mx-auto" style={{ maxWidth: "1120px" }}>
              <p
                className="font-mono font-semibold uppercase"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  color: "var(--color-accent)",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                {section.eyebrow}
              </p>
              <h2
                className="font-semibold"
                style={{
                  fontSize: "32px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "var(--color-foreground)",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--color-muted)",
                  marginBottom: "var(--spacing-2xl)",
                  maxWidth: "600px",
                }}
              >
                {section.subtext}
              </p>
              <div
                className="grid md:grid-cols-2 lg:grid-cols-3"
                style={{ gap: "var(--spacing-lg)" }}
              >
                {items.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
