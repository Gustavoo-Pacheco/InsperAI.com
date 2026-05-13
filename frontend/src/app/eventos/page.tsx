import type { Metadata } from "next";
import { getEventos, getSettings } from "@/lib/api";
import FeaturedHero from "@/components/eventos/FeaturedHero";
import PastEventsGrid from "@/components/eventos/PastEventsGrid";

export const metadata: Metadata = {
  title: "Eventos",
  description:
    "Eventos, palestras e workshops da Insper AI. Acesse o evento em destaque e o histórico de atividades anteriores.",
};

export default async function EventosPage() {
  const [destaque, passado, settings] = await Promise.all([
    getEventos({ destaque: true }).catch(() => []),
    getEventos({ passado: true }).catch(() => []),
    getSettings().catch(() => null),
  ]);

  const featured = destaque[0] ?? null;
  const grid = passado
    .filter((e) => !featured || e.id !== featured.id)
    .sort((a, b) => b.data.localeCompare(a.data));

  const linkedin = settings?.linkedin_url;

  return (
    <main style={{ background: "var(--color-background)" }}>
      {featured ? <FeaturedHero evento={featured} fallbackUrl={linkedin} /> : null}
      <PastEventsGrid eventos={grid} fallbackUrl={linkedin} />
    </main>
  );
}
