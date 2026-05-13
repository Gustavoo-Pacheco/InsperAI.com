import Image from "next/image";
import { mediaUrl } from "@/lib/api";
import type { Depoimento } from "@/lib/types";

interface DepoimentosGridProps {
  depoimentos: Depoimento[];
}

function initials(nome: string): string {
  const parts = nome.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export default function DepoimentosGrid({ depoimentos }: DepoimentosGridProps) {
  if (depoimentos.length === 0) return null;

  return (
    <section
      aria-labelledby="depoimentos-heading"
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
            Depoimentos
          </span>
          <h2
            id="depoimentos-heading"
            className="font-bold"
            style={{
              fontSize: "32px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-foreground)",
            }}
          >
            O que dizem sobre nós
          </h2>
        </div>

        <ul
          className="grid list-none grid-cols-1 md:grid-cols-3"
          style={{ gap: "var(--spacing-xl)" }}
        >
          {depoimentos.map((d) => {
            const foto = d.foto ? mediaUrl(d.foto) : null;
            return (
              <li
                key={d.id}
                className="flex flex-col rounded-xl"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  padding: "var(--spacing-lg)",
                }}
              >
                <span
                  aria-hidden="true"
                  className="font-mono"
                  style={{
                    fontSize: "48px",
                    lineHeight: 0.8,
                    color: "var(--color-accent)",
                    display: "block",
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.55,
                    color: "var(--color-foreground)",
                    flex: 1,
                    marginTop: "var(--spacing-md)",
                    marginBottom: "var(--spacing-lg)",
                    textWrap: "pretty",
                  }}
                >
                  {d.texto}
                </p>
                <div
                  className="flex items-center"
                  style={{ gap: "var(--spacing-md)" }}
                >
                  <div
                    className="relative overflow-hidden rounded-full flex items-center justify-center"
                    style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      background: foto
                        ? "var(--color-border)"
                        : "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {foto ? (
                      <Image
                        src={foto}
                        alt={`Foto de ${d.autor}`}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          color: "var(--color-accent)",
                        }}
                      >
                        {initials(d.autor)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col" style={{ minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--color-foreground)",
                        lineHeight: 1.3,
                      }}
                    >
                      {d.autor}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "var(--color-muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {d.cargo}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
