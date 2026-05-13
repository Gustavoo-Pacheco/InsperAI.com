import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Edicao } from "@/lib/types";
import { formatEdicaoDate, formatWeekId, SETOR_LABEL } from "@/lib/newsletter";
import { cn } from "@/lib/utils";

interface ArquivoListProps {
  edicoes: Edicao[];
}

export default function ArquivoList({ edicoes }: ArquivoListProps) {
  if (edicoes.length === 0) {
    return (
      <p
        className="mx-auto max-w-xl text-center text-sm"
        style={{ color: "var(--color-muted)" }}
      >
        Nenhuma edição publicada ainda.
      </p>
    );
  }

  // Agrupa por week_id mantendo a ordem do array (já vem -date)
  const groups = new Map<string, Edicao[]>();
  for (const edicao of edicoes) {
    const list = groups.get(edicao.week_id) ?? [];
    list.push(edicao);
    groups.set(edicao.week_id, list);
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
      {Array.from(groups.entries()).map(([weekId, items]) => (
        <section key={weekId}>
          <div className="mb-4 flex items-baseline justify-between">
            <h2
              className="font-mono text-xs uppercase tracking-[0.25em]"
              style={{ color: "var(--color-accent)" }}
            >
              {formatWeekId(weekId)}
            </h2>
            <span
              className="text-xs"
              style={{ color: "var(--color-muted)" }}
            >
              {formatEdicaoDate(items[0].date)}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((edicao) => (
              <Link
                key={edicao.id}
                href={edicao.url}
                className={cn(
                  "glass group flex h-full flex-col rounded-xl p-5",
                  "transition-all duration-200 hover:-translate-y-px",
                )}
                style={{ borderColor: "var(--color-border)" }}
              >
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-accent)" }}
                >
                  {SETOR_LABEL[edicao.segment]}
                </span>
                <h3
                  className="mt-2 text-base font-semibold leading-snug"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {edicao.title}
                </h3>
                <span
                  className="mt-2 text-xs"
                  style={{ color: "var(--color-muted)" }}
                >
                  {edicao.story_count} {edicao.story_count === 1 ? "notícia" : "notícias"}
                </span>
                <span
                  className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-medium transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ color: "var(--color-accent)" }}
                >
                  Abrir
                  <ArrowRight size={12} aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
