import { ArrowUpRight, Star } from "lucide-react";
import type { Artigo } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  article: Artigo;
}

export default function StoryCard({ article }: StoryCardProps) {
  const isFeatured = article.destaque;

  return (
    <article
      className={cn(
        "glass relative flex flex-col rounded-2xl p-6 sm:p-8",
        isFeatured && "ring-1",
      )}
      style={{
        borderColor: "var(--color-border)",
        ...(isFeatured
          ? ({ "--tw-ring-color": "var(--color-accent-light)" } as React.CSSProperties)
          : {}),
      }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{
            borderColor: "var(--color-accent-light)",
            color: "var(--color-accent)",
          }}
        >
          <Star size={10} aria-hidden />
          {article.importancia}/10
        </span>
        {article.tema && (
          <span
            className="inline-flex rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em]"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-muted)",
            }}
          >
            {article.tema}
          </span>
        )}
        <span
          className="ml-auto text-xs"
          style={{ color: "var(--color-muted)" }}
        >
          {article.fonte}
        </span>
      </div>

      <h2
        className={cn(
          "mt-4 font-bold leading-tight",
          isFeatured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
        )}
        style={{ color: "var(--color-foreground)", letterSpacing: "-0.01em" }}
      >
        {article.titulo}
      </h2>

      <p
        className="mt-3 text-sm leading-relaxed sm:text-base"
        style={{ color: "var(--color-muted)" }}
      >
        {article.resumo}
      </p>

      {article.por_que_importa && (
        <div
          className="mt-5 rounded-xl border-l-2 pl-4"
          style={{ borderColor: "var(--color-accent)" }}
        >
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-accent)" }}
          >
            Por que importa
          </p>
          <p
            className="mt-1.5 text-sm leading-relaxed"
            style={{ color: "var(--color-foreground)" }}
          >
            {article.por_que_importa}
          </p>
        </div>
      )}

      {article.empresas && article.empresas.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {article.empresas.map((empresa) => (
            <span
              key={empresa}
              className="rounded-full border px-2.5 py-0.5 text-[11px]"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
              }}
            >
              {empresa}
            </span>
          ))}
        </div>
      )}

      {article.explicacao_jargao && (
        <p
          className="mt-4 border-t pt-3 text-xs italic leading-relaxed"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-muted)",
          }}
        >
          <span className="font-semibold not-italic">Jargão: </span>
          {article.explicacao_jargao}
        </p>
      )}

      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium transition-transform duration-200 hover:translate-x-0.5"
        style={{ color: "var(--color-accent)" }}
      >
        Ler na fonte
        <ArrowUpRight size={14} aria-hidden />
      </a>
    </article>
  );
}
