import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Material próprio e cursos recomendados pela comunidade InsperAI.",
};

export default function RecursosPage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build /recursos sections */}
    </section>
  );
}
