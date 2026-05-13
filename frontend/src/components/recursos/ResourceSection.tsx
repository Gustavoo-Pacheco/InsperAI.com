import type { Recurso } from "@/lib/types";
import { ResourceCard } from "./ResourceCard";

type Props = {
  id: string;
  eyebrow: string;
  heading: string;
  subtext: string;
  background: "background" | "surface";
  items: Recurso[];
};

export function ResourceSection({ id, eyebrow, heading, subtext, background, items }: Props) {
  const bg = background === "surface" ? "var(--color-surface)" : "var(--color-background)";

  return (
    <section
      id={id}
      style={{
        background: bg,
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <p
          className="font-mono uppercase"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: "var(--color-foreground)",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            color: "var(--color-muted)",
            marginBottom: "var(--spacing-xl)",
            maxWidth: "600px",
          }}
        >
          {subtext}
        </p>

        {items.length === 0 ? (
          <p
            style={{
              fontSize: "15px",
              color: "var(--color-muted)",
              fontStyle: "italic",
            }}
          >
            Em breve.
          </p>
        ) : (
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "var(--spacing-lg)" }}
          >
            {items.map((recurso) => (
              <ResourceCard key={recurso.id} recurso={recurso} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
