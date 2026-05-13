import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membros",
  description: "Time atual da InsperAI agrupado por nível de atuação.",
};

export default function MembrosPage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build /membros sections */}
    </section>
  );
}
