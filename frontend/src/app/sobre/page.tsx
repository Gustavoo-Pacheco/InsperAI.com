import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Missão, valores, história e depoimentos da comunidade InsperAI.",
};

export default function SobrePage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build /sobre sections */}
    </section>
  );
}
