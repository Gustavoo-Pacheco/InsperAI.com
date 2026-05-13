import type { Metadata } from "next";
import { getProcessoSeletivo } from "@/lib/api";
import CriteriaSection from "@/components/processo-seletivo/CriteriaSection";
import Hero from "@/components/processo-seletivo/Hero";
import ProcessoTimeline from "@/components/processo-seletivo/ProcessoTimeline";
import ProvaSection from "@/components/processo-seletivo/ProvaSection";

export const metadata: Metadata = {
  title: "Processo Seletivo",
  description:
    "Status, etapas e critérios do processo seletivo da InsperAI.",
};

export default async function ProcessoSeletivoPage() {
  const processo = await getProcessoSeletivo();
  const etapas = (processo.etapas ?? [])
    .filter((e) => e.ativa)
    .sort((a, b) => a.ordem - b.ordem);
  const criterios = (processo.criterios ?? [])
    .filter((c) => c.ativa)
    .sort((a, b) => a.ordem - b.ordem);

  return (
    <>
      <Hero
        status={processo.status}
        proximaEdicao={processo.proxima_edicao}
        textoCta={processo.texto_cta}
        urlInscricao={processo.url_inscricao}
      />
      <ProcessoTimeline etapas={etapas} />
      <CriteriaSection criterios={criterios} />
      <ProvaSection />
    </>
  );
}
