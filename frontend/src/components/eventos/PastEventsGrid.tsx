import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Evento } from "@/lib/types";
import { mediaUrl } from "@/lib/api";

interface PastEventsGridProps {
  eventos: Evento[];
  fallbackUrl?: string;
}

export default function PastEventsGrid({ eventos, fallbackUrl }: PastEventsGridProps) {
  if (eventos.length === 0) return null;

  return (
    <section
      aria-labelledby="past-eventos-heading"
      style={{ background: "var(--color-background)" }}
    >
      <div
        className="mx-auto max-w-5xl px-6"
        style={{
          paddingTop: "calc(var(--spacing-2xl) / 2)",
          paddingBottom: "var(--spacing-3xl)",
        }}
      >
        <h2
          id="past-eventos-heading"
          className="font-bold"
          style={{
            fontSize: "24px",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            color: "var(--color-foreground)",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          Eventos Anteriores
        </h2>

        <ul
          className="grid list-none"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--spacing-md)",
          }}
        >
          {eventos.map((evento) => {
            const photoSrc = evento.imagem ? mediaUrl(evento.imagem) : null;
            const href = evento.link || fallbackUrl;
            return (
              <li key={evento.id}>
                <article
                  aria-labelledby={`past-${evento.id}-title`}
                  className="group flex flex-col overflow-hidden rounded-xl"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    transition:
                      "border-color 250ms ease, transform 250ms cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: "4 / 3",
                      background: "var(--color-border)",
                    }}
                  >
                    {photoSrc ? (
                      <Image
                        src={photoSrc}
                        alt={`Imagem do evento ${evento.titulo}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    ) : null}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{
                        background: "rgba(9,9,11,0.72)",
                        backdropFilter: "blur(2px)",
                        padding: "var(--spacing-md)",
                      }}
                    >
                      <p
                        className="text-center"
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.55,
                          color: "rgba(250,250,250,0.92)",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {evento.descricao}
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex flex-col"
                    style={{
                      padding: "var(--spacing-md)",
                      gap: "var(--spacing-xs)",
                    }}
                  >
                    <h3
                      id={`past-${evento.id}-title`}
                      className="font-bold"
                      style={{
                        fontSize: "14px",
                        color: "var(--color-foreground)",
                        lineHeight: 1.3,
                      }}
                    >
                      {evento.titulo}
                    </h3>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Saiba mais sobre ${evento.titulo} (abre em nova aba)`}
                        className="inline-flex items-center gap-1 font-semibold transition-colors hover:text-[color:var(--color-foreground)]"
                        style={{
                          fontSize: "12px",
                          color: "var(--color-accent)",
                          textDecoration: "none",
                        }}
                      >
                        Saiba mais no LinkedIn
                        <ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
