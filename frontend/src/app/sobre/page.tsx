import type { Metadata } from "next";
import {
  getDepoimentos,
  getEventos,
  getParceiros,
  getSobreContent,
} from "@/lib/api";
import type {
  ContentBlock as ContentBlockData,
  ContentBlockPosicao,
} from "@/lib/types";
import QuemSomosSection from "@/components/sobre/QuemSomosSection";
import StatsSection from "@/components/sobre/StatsSection";
import EventosCarousel from "@/components/sobre/EventosCarousel";
import ParceirosGrid from "@/components/sobre/ParceirosGrid";
import DepoimentosGrid from "@/components/sobre/DepoimentosGrid";
import ValoresRow from "@/components/sobre/ValoresRow";
import HistoriaTimelineHorizontal from "@/components/sobre/HistoriaTimelineHorizontal";
import ContentBlock from "@/components/sobre/ContentBlock";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Quem somos, valores, estatísticas e história da comunidade InsperAI.",
};

function blocksAt(blocks: ContentBlockData[], posicao: ContentBlockPosicao) {
  return blocks
    .filter((b) => b.posicao === posicao)
    .sort((a, b) => a.ordem - b.ordem);
}

export default async function SobrePage() {
  const [sobre, eventos, parceiros, depoimentos] = await Promise.all([
    getSobreContent().catch(() => null),
    getEventos({ passado: true }).catch(() => []),
    getParceiros().catch(() => []),
    getDepoimentos().catch(() => []),
  ]);

  if (!sobre) {
    return (
      <main style={{ background: "var(--color-background)" }}>
        <section
          className="mx-auto max-w-5xl px-6"
          style={{
            paddingTop: "var(--spacing-2xl)",
            paddingBottom: "var(--spacing-2xl)",
          }}
        >
          <p style={{ color: "var(--color-muted)" }}>
            Conteúdo da página em breve.
          </p>
        </section>
      </main>
    );
  }

  const sortedEventos = [...eventos]
    .sort(
      (a, b) =>
        Number(b.destaque) - Number(a.destaque) || b.data.localeCompare(a.data),
    )
    .slice(0, 7);

  const blocks = sobre.content_blocks ?? [];
  const renderBlocks = (
    posicao: ContentBlockPosicao,
    surface: "background" | "surface",
  ) =>
    blocksAt(blocks, posicao).map((b) => (
      <ContentBlock key={b.id} block={b} surface={surface} />
    ));

  return (
    <main style={{ background: "var(--color-background)" }}>
      <QuemSomosSection data={sobre.quem_somos} />
      {renderBlocks("apos_quem_somos", "surface")}

      <StatsSection stats={sobre.stats} />
      {renderBlocks("apos_stats", "background")}

      <ParceirosGrid parceiros={parceiros} />
      {renderBlocks("apos_parceiros", "surface")}

      <DepoimentosGrid depoimentos={depoimentos} />
      {renderBlocks("apos_depoimentos", "background")}

      <EventosCarousel eventos={sortedEventos} />
      {renderBlocks("apos_eventos", "surface")}

      <ValoresRow valores={sobre.valores} />
      {renderBlocks("apos_valores", "surface")}

      <HistoriaTimelineHorizontal milestones={sobre.milestones} />
      {renderBlocks("apos_historia", "background")}
    </main>
  );
}
