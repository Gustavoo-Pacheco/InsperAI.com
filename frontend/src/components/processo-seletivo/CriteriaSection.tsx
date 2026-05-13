import {
  BookOpen,
  Code2,
  Lightbulb,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Criterio } from "@/lib/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Lightbulb,
  Code2,
  Users,
  Sparkles,
  Target,
  BookOpen,
};

interface CriteriaSectionProps {
  criterios: Criterio[];
}

export default function CriteriaSection({ criterios }: CriteriaSectionProps) {
  if (criterios.length === 0) return null;

  return (
    <section
      aria-labelledby="criterios-heading"
      className="px-6"
      style={{
        backgroundColor: "var(--color-surface)",
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          Critérios
        </p>
        <h2
          id="criterios-heading"
          className="mt-3 text-center text-3xl font-bold tracking-tight text-[var(--color-foreground)] md:text-4xl"
        >
          O que buscamos
        </h2>
        <ul className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {criterios.map((c) => {
            const Icon = ICON_MAP[c.icon] ?? Lightbulb;
            return (
              <li key={c.id} className="flex flex-col">
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className="text-[var(--color-accent)]"
                    aria-hidden
                  />
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">
                    {c.titulo}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {c.descricao}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
