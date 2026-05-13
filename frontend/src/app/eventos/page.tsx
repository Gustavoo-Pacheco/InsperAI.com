import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Eventos em destaque e histórico de atividades organizadas pela InsperAI.",
};

export default function EventosPage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build /eventos sections */}
    </section>
  );
}
