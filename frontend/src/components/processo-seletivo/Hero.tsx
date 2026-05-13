import { ExternalLink } from "lucide-react";
import DecorativeGlow from "@/components/ui/DecorativeGlow";
import { cn } from "@/lib/utils";
import type { ProcessoStatus } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface HeroProps {
  status: ProcessoStatus;
  proximaEdicao: string;
  textoCta: string;
  urlInscricao: string;
}

export default function Hero({
  status,
  proximaEdicao,
  textoCta,
  urlInscricao,
}: HeroProps) {
  const isOpen = status === "aberto";
  const hasUrl = Boolean(urlInscricao);

  const ctaClasses = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 h-11 text-sm font-semibold transition-all duration-200",
    isOpen && hasUrl
      ? "bg-[var(--color-accent)] text-[var(--color-foreground)] hover:scale-[1.02] hover:bg-[var(--color-accent-end)]"
      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] cursor-not-allowed",
  );

  return (
    <section
      aria-labelledby="processo-seletivo-heading"
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-lg)",
      }}
    >
      <DecorativeGlow
        className="left-1/2 top-0 -translate-x-1/2"
        size={480}
        opacity={0.15}
      />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {textoCta}
        </p>
        <h1
          id="processo-seletivo-heading"
          className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-foreground)] md:text-5xl"
        >
          Processo Seletivo
        </h1>
        <div className="mt-5 flex flex-col items-center gap-2">
          <StatusBadge status={status} />
          <p className="text-sm text-[var(--color-muted)]">
            Próximo processo seletivo: {proximaEdicao}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          {isOpen && hasUrl ? (
            <a
              href={urlInscricao}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Inscrever-se no processo seletivo da InsperAI (abre em nova aba)"
              className={ctaClasses}
            >
              Inscrever-se
              <ExternalLink size={16} aria-hidden />
            </a>
          ) : (
            <span
              aria-disabled
              className={ctaClasses}
              title="Inscrições não estão abertas"
            >
              Inscrições em breve
              <ExternalLink size={16} aria-hidden />
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
