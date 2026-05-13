import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEdicaoDetail } from "@/lib/api";
import EditionHero from "@/components/newsletter/EditionHero";
import StoryCard from "@/components/newsletter/StoryCard";
import { isArtigoSetor, SETOR_LABEL } from "@/lib/newsletter";

interface PageProps {
  params: Promise<{ weekId: string; segment: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { weekId, segment } = await params;
  if (!isArtigoSetor(segment)) return { title: "Edição" };
  const edicao = await getEdicaoDetail(weekId, segment).catch(() => null);
  if (!edicao) return { title: "Edição não encontrada" };
  return {
    title: `${edicao.title} — ${weekId}`,
    description: edicao.description,
  };
}

export default async function EdicaoPage({ params }: PageProps) {
  const { weekId, segment } = await params;
  if (!isArtigoSetor(segment)) notFound();

  const edicao = await getEdicaoDetail(weekId, segment).catch(() => null);
  if (!edicao) notFound();

  return (
    <>
      <EditionHero edicao={edicao} />
      <section
        className="mx-auto max-w-4xl px-6"
        style={{ paddingBottom: "var(--spacing-2xl)" }}
      >
        {edicao.artigos.length === 0 ? (
          <p
            className="text-center text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            Nenhuma notícia nesta edição de {SETOR_LABEL[edicao.segment]}.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {edicao.artigos.map((artigo) => (
              <StoryCard key={artigo.id} article={artigo} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
