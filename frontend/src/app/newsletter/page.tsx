import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestEdicoesBySegment } from "@/lib/api";
import NewsletterHero from "@/components/newsletter/NewsletterHero";
import EdicaoPreviewCards from "@/components/newsletter/EdicaoPreviewCards";
import NewsletterHomeShell from "@/components/newsletter/NewsletterHomeShell";
import SectorPillsBar from "@/components/newsletter/SectorPillsBar";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Newsletter Insper AI: IA por setor — Engenharia, Direito e Finanças. Receba a próxima edição por email.",
};

export default async function NewsletterPage() {
  const edicoes = await getLatestEdicoesBySegment().catch(() => []);

  return (
    <NewsletterHomeShell>
      <NewsletterHero />
      <SectorPillsBar />
      <section
        className="mx-auto max-w-7xl"
        style={{
          paddingTop: "var(--spacing-xl)",
          paddingBottom: "var(--spacing-2xl)",
        }}
      >
        <EdicaoPreviewCards edicoes={edicoes} />
        <div className="mt-12 text-center">
          <Link
            href="/newsletter/arquivo"
            className="inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--color-accent)" }}
          >
            Ver todas as edições
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </section>
    </NewsletterHomeShell>
  );
}
