import { ArrowUpRight } from "lucide-react";
import type { Recurso } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";

export function ResourceCard({ recurso }: { recurso: Recurso }) {
  return (
    <article
      className="glass flex flex-col rounded-2xl transition-transform duration-200 hover:-translate-y-px"
      style={{
        padding: "var(--spacing-lg)",
        gap: "var(--spacing-md)",
      }}
    >
      {recurso.nivel ? <DifficultyBadge nivel={recurso.nivel} /> : null}
      <h3
        className="font-semibold"
        style={{ fontSize: "17px", lineHeight: 1.35, color: "var(--color-foreground)" }}
      >
        {recurso.titulo}
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--color-muted)",
          flexGrow: 1,
        }}
      >
        {recurso.descricao}
      </p>
      {recurso.autor ? (
        <p
          className="font-mono"
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            letterSpacing: "0.06em",
          }}
        >
          {recurso.autor}
        </p>
      ) : null}
      <div
        className="flex items-center justify-between"
        style={{
          paddingTop: "var(--spacing-md)",
          borderTop: "1px solid var(--color-border)",
        }}
      >
        <a
          href={recurso.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Acessar ${recurso.titulo} (abre em nova aba)`}
          className="inline-flex items-center gap-1 font-semibold transition-colors hover:opacity-75"
          style={{ fontSize: "14px", color: "var(--color-accent)" }}
        >
          Acessar
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
