import { ArrowUpRight } from "lucide-react";
import type { Recurso } from "../lib/recursos";
import { DifficultyBadge } from "./DifficultyBadge";

export function ResourceCard({ resource }: { resource: Recurso }) {
  return (
    <article
      className="glass card-interactive group flex flex-col rounded-xl"
      style={{
        padding: "var(--spacing-lg)",
        gap: "var(--spacing-md)",
        border: "1px solid var(--color-border)",
      }}
    >
      <DifficultyBadge difficulty={resource.difficulty} />
      <h3
        className="font-semibold"
        style={{ fontSize: "17px", lineHeight: 1.35, color: "var(--color-foreground)" }}
      >
        {resource.title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--color-muted)",
          flexGrow: 1,
        }}
      >
        {resource.description}
      </p>
      {resource.author ? (
        <p
          className="font-mono"
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            letterSpacing: "0.04em",
          }}
        >
          {resource.author}
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
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Acessar ${resource.title} (abre em nova aba)`}
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
