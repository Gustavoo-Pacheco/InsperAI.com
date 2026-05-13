import type { ContentBlock as ContentBlockData } from "@/lib/types";

interface ContentBlockProps {
  block: ContentBlockData;
  surface?: "background" | "surface";
}

export default function ContentBlock({ block, surface = "background" }: ContentBlockProps) {
  return (
    <section
      aria-labelledby={`block-${block.slug}-heading`}
      style={{
        background:
          surface === "surface" ? "var(--color-surface)" : "var(--color-background)",
      }}
    >
      <div
        className="mx-auto max-w-4xl px-6"
        style={{
          paddingTop: "var(--spacing-xl)",
          paddingBottom: "var(--spacing-xl)",
        }}
      >
        <h2
          id={`block-${block.slug}-heading`}
          className="font-bold"
          style={{
            fontSize: "24px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "var(--color-foreground)",
            marginBottom: "var(--spacing-md)",
            lineHeight: 1.25,
          }}
        >
          {block.titulo}
        </h2>
        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.65,
            color: "var(--color-muted)",
            maxWidth: "62ch",
            whiteSpace: "pre-wrap",
          }}
        >
          {block.texto}
        </div>
      </div>
    </section>
  );
}
