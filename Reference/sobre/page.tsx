import type { Metadata } from "next";
import {
  MissaoSection,
  ValoresSection,
  HistoriaSection,
  DepoimentosSection,
} from "@/components/sobre";

export const metadata: Metadata = {
  title: "Sobre — Insper AI",
  description:
    "Conheça a Insper AI: nossa missão, valores e história. A entidade estudantil de IA do Insper.",
};

export default function SobrePage() {
  return (
    <>
      <MissaoSection id="missao" />
      <ValoresSection id="valores" />
      <HistoriaSection id="historia" />
      <DepoimentosSection id="depoimentos" />
    </>
  );
}
