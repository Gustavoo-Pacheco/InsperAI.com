import Image from "next/image";
import { mediaUrl } from "@/lib/api";
import type { Milestone } from "@/lib/types";

interface HistoriaTimelineHorizontalProps {
  milestones: Milestone[];
}

export default function HistoriaTimelineHorizontal({
  milestones,
}: HistoriaTimelineHorizontalProps) {
  if (milestones.length === 0) return null;

  const sorted = [...milestones].sort(
    (a, b) => a.ano - b.ano || a.ordem - b.ordem,
  );
  const anyPhoto = sorted.some((m) => !!m.foto);

  return (
    <section
      aria-labelledby="historia-heading"
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
            História
          </span>
          <h2
            id="historia-heading"
            className="font-bold"
            style={{
              fontSize: "32px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-foreground)",
            }}
          >
            Nossa trajetória
          </h2>
        </div>

        <div
          className="relative overflow-x-auto"
          style={{
            scrollSnapType: "x mandatory",
            paddingBottom: "var(--spacing-md)",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 right-0"
            style={{
              top: anyPhoto ? 144 : 9,
              height: 1,
              background: "var(--color-border)",
            }}
          />

          <ol
            className="relative flex list-none"
            style={{
              gap: "var(--spacing-2xl)",
              minWidth: "max-content",
              paddingLeft: "var(--spacing-sm)",
              paddingRight: "var(--spacing-sm)",
            }}
          >
            {sorted.map((m) => {
              const photo = m.foto ? mediaUrl(m.foto) : null;
              return (
                <li
                  key={m.id}
                  className="flex flex-col"
                  style={{
                    width: 260,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                >
                  {anyPhoto ? (
                    <div
                      className="relative overflow-hidden rounded-lg"
                      style={{
                        width: 120,
                        height: 120,
                        marginBottom: "var(--spacing-md)",
                        background: photo ? "var(--color-border)" : "transparent",
                      }}
                    >
                      {photo ? (
                        <Image
                          src={photo}
                          alt={`Foto do marco ${m.titulo}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  ) : null}

                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute rounded-full"
                      style={{
                        left: 0,
                        top: 4,
                        width: 10,
                        height: 10,
                        background: "var(--color-accent)",
                        boxShadow: "0 0 0 4px var(--color-background)",
                      }}
                    />
                  </div>

                  <div
                    className="font-mono"
                    style={{
                      fontSize: "13px",
                      letterSpacing: "0.12em",
                      color: "var(--color-accent)",
                      fontVariantNumeric: "tabular-nums",
                      marginTop: "var(--spacing-md)",
                      marginBottom: "var(--spacing-xs)",
                    }}
                  >
                    {m.ano}
                  </div>
                  <h3
                    className="font-bold"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--color-foreground)",
                      marginBottom: "var(--spacing-sm)",
                      lineHeight: 1.3,
                    }}
                  >
                    {m.titulo}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.55,
                      color: "var(--color-muted)",
                    }}
                  >
                    {m.descricao}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
