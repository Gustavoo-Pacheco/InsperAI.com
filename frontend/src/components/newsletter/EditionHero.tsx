import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DecorativeGlow from "@/components/ui/DecorativeGlow";
import type { EdicaoDetail } from "@/lib/types";
import { formatEdicaoDate, formatWeekId, SETOR_LABEL } from "@/lib/newsletter";

interface EditionHeroProps {
  edicao: EdicaoDetail;
}

export default function EditionHero({ edicao }: EditionHeroProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-lg)",
      }}
    >
      <DecorativeGlow
        className="left-1/2 top-0 -translate-x-1/2"
        size={520}
        opacity={0.18}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "var(--color-muted)" }}
        >
          <ArrowLeft size={14} aria-hidden />
          Voltar para Newsletter
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span
            className="inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{
              borderColor: "var(--color-accent-light)",
              color: "var(--color-accent)",
            }}
          >
            {SETOR_LABEL[edicao.segment]}
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--color-muted)" }}
          >
            {formatWeekId(edicao.week_id)} · {formatEdicaoDate(edicao.date)}
          </span>
        </div>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl"
          style={{ letterSpacing: "-0.02em", color: "var(--color-foreground)" }}
        >
          {edicao.title}
        </h1>
        <p
          className="mt-5 max-w-2xl text-base sm:text-lg"
          style={{ color: "var(--color-muted)" }}
        >
          {edicao.description}
        </p>
        <p
          className="mt-3 text-xs"
          style={{ color: "var(--color-muted)" }}
        >
          {edicao.story_count} {edicao.story_count === 1 ? "notícia" : "notícias"} nesta edição
        </p>
      </div>
    </section>
  );
}
