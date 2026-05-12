import type { Metadata } from "next";
import { FeaturedHero, PastEventsGrid } from "@/components/eventos";

export const metadata: Metadata = {
  title: "Eventos — Insper AI",
  description:
    "Eventos, palestras e workshops da Insper AI. Fique por dentro das próximas atividades e acesse gravações de edições anteriores.",
};

export default function EventosPage() {
  return (
    <main>
      <FeaturedHero />
      <PastEventsGrid />
    </main>
  );
}
