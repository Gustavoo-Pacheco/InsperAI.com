import Image from "next/image";
import { mediaUrl } from "@/lib/api";
import type { Parceiro } from "@/lib/types";

interface ParceirosGridProps {
  parceiros: Parceiro[];
}

export default function ParceirosGrid({ parceiros }: ParceirosGridProps) {
  if (parceiros.length === 0) return null;

  const sorted = [...parceiros].sort((a, b) => a.ordem - b.ordem);

  return (
    <section
      aria-labelledby="parceiros-heading"
      style={{ background: "var(--color-background)" }}
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
            Parceiros
          </span>
          <h2
            id="parceiros-heading"
            className="font-bold"
            style={{
              fontSize: "32px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-foreground)",
            }}
          >
            Quem caminha com a gente
          </h2>
        </div>

        <ul
          className="grid list-none grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
          style={{ gap: "var(--spacing-lg)" }}
        >
          {sorted.map((p) => {
            const hasLogo = Boolean(p.logo);
            const card = (
              <div
                className="group relative flex items-center justify-center overflow-hidden rounded-xl"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  height: 160,
                  padding: "var(--spacing-md)",
                }}
              >
                <div
                  className="flex h-full w-full items-center justify-center transition-opacity duration-300 group-hover:opacity-0"
                >
                  {hasLogo ? (
                    <Image
                      src={mediaUrl(p.logo)}
                      alt={`Logo ${p.nome}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                      className="object-contain p-6"
                      style={{ opacity: 0.85 }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: "clamp(18px, 2vw, 24px)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: "var(--color-foreground)",
                        textAlign: "center",
                      }}
                    >
                      {p.nome}
                    </span>
                  )}
                </div>

                <div
                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "var(--color-surface)",
                    padding: "var(--spacing-md)",
                  }}
                >
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      color: "var(--color-accent)",
                      marginBottom: "var(--spacing-xs)",
                    }}
                  >
                    {p.nome}
                  </span>
                  {p.descricao ? (
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.45,
                        color: "var(--color-muted)",
                        display: "-webkit-box",
                        WebkitLineClamp: 5,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.descricao}
                    </p>
                  ) : null}
                </div>
              </div>
            );
            return (
              <li key={p.id}>
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={p.nome}
                    className="block"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
