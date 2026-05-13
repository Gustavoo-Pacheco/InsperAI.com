import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InsperAI",
  description:
    "Organização estudantil do Insper dedicada à Inteligência Artificial.",
};

export default function HomePage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build home page sections */}
    </section>
  );
}
