import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Evento } from "@/lib/types";
import { mediaUrl } from "@/lib/api";

interface FeaturedHeroProps {
  evento: Evento;
  fallbackUrl?: string;
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  })
    .format(d)
    .replace(/^\w/, (c) => c.toUpperCase());
}

export default function FeaturedHero({ evento, fallbackUrl }: FeaturedHeroProps) {
  const photoSrc = evento.imagem ? mediaUrl(evento.imagem) : null;
  const href = evento.link || fallbackUrl;
  const eyebrow = evento.passado ? "Último Evento" : "Próximo Evento";
  const ctaLabel = evento.passado ? "Ver no LinkedIn" : "Saiba mais";

  return (
    <section
      aria-labelledby="featured-evento-heading"
      className="px-6"
      style={{
        background: "var(--color-background)",
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "calc(var(--spacing-2xl) / 2)",
      }}
    >
      <div
        className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2"
        style={{ gap: "var(--spacing-xl)" }}
      >
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ aspectRatio: "4 / 3", background: "var(--color-surface)" }}
        >
          {photoSrc ? (
            <Image
              src={photoSrc}
              alt={`Registro do evento ${evento.titulo}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
            />
          ) : null}
        </div>

        <div>
          <span
            className="inline-block font-mono font-bold uppercase"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-foreground)",
              fontSize: "10px",
              letterSpacing: "0.16em",
              padding: "5px 12px",
              marginBottom: "var(--spacing-sm)",
            }}
          >
            {eyebrow}
          </span>

          <h1
            id="featured-evento-heading"
            className="font-semibold"
            style={{
              fontSize: "clamp(28px, 3.2vw, 40px)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--color-foreground)",
              textWrap: "balance",
            }}
          >
            {evento.titulo}
          </h1>

          {evento.subtitulo ? (
            <p
              className="italic"
              style={{
                marginTop: "var(--spacing-xs)",
                fontSize: "15px",
                lineHeight: 1.4,
                color: "rgba(250,250,250,0.8)",
              }}
            >
              {evento.subtitulo}
            </p>
          ) : null}

          <p
            className="font-mono uppercase"
            style={{
              marginTop: "var(--spacing-sm)",
              fontSize: "12px",
              letterSpacing: "0.08em",
              color: "var(--color-muted)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatDate(evento.data)}
            {evento.palestrante ? ` · ${evento.palestrante}` : ""}
          </p>

          <p
            style={{
              marginTop: "var(--spacing-md)",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--color-muted)",
            }}
          >
            {evento.descricao}
          </p>

          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${ctaLabel} sobre ${evento.titulo} (abre em nova aba)`}
              className="inline-flex items-center gap-1.5 rounded-lg text-sm font-bold transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{
                marginTop: "var(--spacing-lg)",
                padding: "10px 20px",
                color: "var(--color-foreground)",
                background:
                  "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-end) 100%)",
                textDecoration: "none",
              }}
            >
              {ctaLabel}
              <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
