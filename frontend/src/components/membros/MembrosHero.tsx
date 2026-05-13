import DecorativeGlow from "@/components/ui/DecorativeGlow";

interface MembrosHeroProps {
  total: number;
  semestre: string;
}

export default function MembrosHero({ total, semestre }: MembrosHeroProps) {
  return (
    <section
      aria-labelledby="membros-heading"
      className="relative overflow-hidden px-6"
      style={{
        background: "var(--color-background)",
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "calc(var(--spacing-2xl) / 2)",
      }}
    >
      <DecorativeGlow
        className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/3"
        size={560}
        opacity={0.18}
      />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          Membros
        </span>

        <h1
          id="membros-heading"
          style={{
            fontSize: "clamp(48px, 5.2vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--color-foreground)",
            textWrap: "balance",
          }}
        >
          Conheça nossa equipe
        </h1>

        <div
          className="inline-flex items-center font-mono uppercase"
          style={{
            marginTop: "var(--spacing-lg)",
            fontSize: "13px",
            letterSpacing: "0.1em",
            color: "var(--color-muted)",
            fontVariantNumeric: "tabular-nums",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid var(--color-border)",
          }}
        >
          <span
            className="font-bold"
            style={{
              color: "var(--color-accent)",
              fontSize: "16px",
            }}
          >
            {total}
          </span>
          <span>{total === 1 ? "membro ativo" : "membros ativos"}</span>
          {semestre ? (
            <>
              <span style={{ opacity: 0.5 }}>·</span>
              <span style={{ color: "var(--color-accent)" }}>{semestre}</span>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
