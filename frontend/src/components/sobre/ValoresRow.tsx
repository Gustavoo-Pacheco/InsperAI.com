import type { Valor } from "@/lib/types";

interface ValoresRowProps {
  valores: Valor[];
}

export default function ValoresRow({ valores }: ValoresRowProps) {
  if (valores.length === 0) return null;

  return (
    <section
      aria-labelledby="valores-heading"
      style={{ background: "var(--color-surface)" }}
    >
      <div
        className="mx-auto max-w-6xl px-6"
        style={{
          paddingTop: "var(--spacing-xl)",
          paddingBottom: "var(--spacing-xl)",
        }}
      >
        <div style={{ marginBottom: "var(--spacing-xl)" }}>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
              display: "block",
              marginBottom: "var(--spacing-sm)",
            }}
          >
            Valores
          </span>
          <h2
            id="valores-heading"
            className="font-bold"
            style={{
              fontSize: "32px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-foreground)",
            }}
          >
            O que nos guia
          </h2>
        </div>

        <ol
          className="grid list-none gap-8 md:grid-cols-3"
          style={{
            gap: "var(--spacing-xl)",
          }}
        >
          {valores.map((v, idx) => (
            <li key={v.id}>
              <div
                className="font-mono"
                style={{
                  fontSize: "clamp(40px, 4.5vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "var(--color-accent)",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                  marginBottom: "var(--spacing-md)",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3
                className="font-bold"
                style={{
                  fontSize: "20px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "var(--color-foreground)",
                  marginBottom: "var(--spacing-sm)",
                  lineHeight: 1.25,
                }}
              >
                {v.titulo}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.55,
                  color: "var(--color-muted)",
                  textWrap: "pretty",
                }}
              >
                {v.descricao}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
