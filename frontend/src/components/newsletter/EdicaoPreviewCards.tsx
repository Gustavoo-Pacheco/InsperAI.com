import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Edicao } from "@/lib/types";
import { formatEdicaoDate, SETOR_LABEL, SETOR_ORDER } from "@/lib/newsletter";
import { cn } from "@/lib/utils";

interface EdicaoPreviewCardsProps {
  edicoes: Edicao[];
}

export default function EdicaoPreviewCards({ edicoes }: EdicaoPreviewCardsProps) {
  const bySegment = new Map(edicoes.map((e) => [e.segment, e]));
  const ordered = SETOR_ORDER
    .map((seg) => bySegment.get(seg))
    .filter((e): e is Edicao => Boolean(e));

  if (ordered.length === 0) {
    return (
      <p
        className="mx-auto max-w-xl text-center text-sm"
        style={{ color: "var(--color-muted)" }}
      >
        Nenhuma edição publicada ainda — volte em breve.
      </p>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
      {ordered.map((edicao) => (
        <Link
          key={edicao.id}
          href={edicao.url}
          className={cn(
            "glass group flex h-full flex-col rounded-2xl p-6",
            "transition-all duration-200 hover:-translate-y-px",
            "focus:outline-none",
          )}
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.25em]"
            style={{ color: "var(--color-accent)" }}
          >
            {SETOR_LABEL[edicao.segment]}
          </p>
          <h3
            className="mt-3 text-xl font-semibold leading-snug"
            style={{ color: "var(--color-foreground)", letterSpacing: "-0.01em" }}
          >
            {edicao.title}
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            {edicao.description}
          </p>
          <div
            className="mt-5 flex items-center justify-between text-xs"
            style={{ color: "var(--color-muted)" }}
          >
            <span>{formatEdicaoDate(edicao.date)}</span>
            <span>{edicao.story_count} {edicao.story_count === 1 ? "notícia" : "notícias"}</span>
          </div>
          <span
            className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color: "var(--color-accent)" }}
          >
            Ler edição
            <ArrowRight size={14} aria-hidden />
          </span>
        </Link>
      ))}
    </div>
  );
}
