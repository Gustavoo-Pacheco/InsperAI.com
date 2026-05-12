import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import {
  StatusBadge,
  ProcessoTimeline,
  CriteriaSection,
  ProvaSection,
} from "@/components/processo-seletivo";
import { STATUS_PS, EXTERNAL_APPLICATION_URL } from "@/lib/data/processo-seletivo";
import { DecorativeGlow } from "@/components/layout/DecorativeGlow";

export const metadata: Metadata = {
  title: "Processo Seletivo — Insper AI",
  description:
    "Conheça as etapas do processo seletivo da Insper AI, os critérios de avaliação e candidate-se para fazer parte da equipe.",
};

export default function ProcessoSeletivoPage() {
  return (
    <>
      <section className="relative overflow-hidden" aria-labelledby="processo-seletivo-heading">
        <DecorativeGlow />
        <div className="mx-auto max-w-4xl py-[var(--spacing-xl)] px-[var(--spacing-3xl)] text-center">
          <h1
            id="processo-seletivo-heading"
            className="text-[48px] font-bold leading-display"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #FAFAFA 0%, rgba(250,250,250,0.85) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Processo Seletivo
          </h1>
          <div className="flex flex-col items-center gap-[var(--spacing-xs)] mt-[var(--spacing-sm)]">
            <StatusBadge status={STATUS_PS} />
            <p
              className="text-label font-medium"
              style={{ color: "var(--color-muted)" }}
            >
              Próximo processo seletivo: 2026.2
            </p>
          </div>
          <p
            className="mt-[var(--spacing-sm)] text-label leading-body"
            style={{ color: "var(--color-muted)" }}
          >
            Faça parte de uma equipe que constrói o futuro da Inteligência Artificial no Brasil.
          </p>
          <div className="mt-[var(--spacing-md)] flex justify-center">
            <a
              href={EXTERNAL_APPLICATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inscrever-se no processo seletivo da Insper AI (abre em nova aba)"
              className="inline-flex items-center justify-center gap-[var(--spacing-sm)] h-10 px-[var(--spacing-lg)] rounded-lg text-label font-bold hover:opacity-90 hover:-translate-y-px transition-all duration-200"
              style={{ background: "var(--color-surface)", color: "var(--color-foreground)", border: "1px solid var(--color-border)" }}
            >
              Inscrever-se
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <ProcessoTimeline />
      <CriteriaSection />
      <ProvaSection />
    </>
  );
}
