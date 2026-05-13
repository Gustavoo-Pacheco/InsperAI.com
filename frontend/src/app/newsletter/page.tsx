import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Artigos da newsletter da InsperAI por setor — engenharia, direito e finanças.",
};

export default function NewsletterPage() {
  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      {/* TODO: build /newsletter sections (filter + form is client-only child) */}
    </section>
  );
}
