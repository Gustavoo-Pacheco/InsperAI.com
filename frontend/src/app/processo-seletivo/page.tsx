import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processo Seletivo",
  description:
    "Status, etapas e critérios do processo seletivo da InsperAI.",
};

export default function ProcessoSeletivoPage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build /processo-seletivo sections */}
    </section>
  );
}
