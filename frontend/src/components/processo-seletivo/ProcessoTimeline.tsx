import type { Etapa } from "@/lib/types";

interface ProcessoTimelineProps {
  etapas: Etapa[];
}

export default function ProcessoTimeline({ etapas }: ProcessoTimelineProps) {
  if (etapas.length === 0) return null;

  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-heading"
      className="px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Etapas
        </p>
        <h2
          id="como-funciona-heading"
          className="mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-foreground)] md:text-4xl"
        >
          Como funciona
        </h2>
        <div className="mt-12 overflow-x-auto">
          <ol className="relative flex min-w-[720px] items-start">
            <div
              aria-hidden
              className="absolute top-5 h-px"
              style={{
                left: `${50 / etapas.length}%`,
                right: `${50 / etapas.length}%`,
                background:
                  "linear-gradient(90deg, var(--color-accent), var(--color-accent-end))",
              }}
            />
            {etapas.map((etapa, idx) => (
              <li
                key={etapa.id}
                className="relative flex flex-1 flex-col items-center px-4 text-center"
              >
                <div
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-[var(--color-foreground)]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent), var(--color-accent-end))",
                  }}
                >
                  {idx + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-[var(--color-foreground)]">
                  {etapa.titulo}
                </h3>
                <p className="mt-1 max-w-[200px] text-sm leading-relaxed text-[var(--color-muted)]">
                  {etapa.descricao}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
