import DecorativeGlow from "@/components/ui/DecorativeGlow";
import type { QuemSomos } from "@/lib/types";

interface QuemSomosSectionProps {
  data: QuemSomos;
}

export default function QuemSomosSection({ data }: QuemSomosSectionProps) {
  return (
    <section
      aria-labelledby="quem-somos-heading"
      className="relative overflow-hidden px-6"
      style={{
        background: "var(--color-background)",
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-xl)",
      }}
    >
      <DecorativeGlow
        className="right-[-12%] top-[10%]"
        size={560}
        opacity={0.16}
      />
      <DecorativeGlow
        className="left-[-10%] bottom-[-20%]"
        size={420}
        opacity={0.1}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <span
          className="font-mono uppercase"
          style={{
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            display: "block",
            marginBottom: "var(--spacing-lg)",
          }}
        >
          Quem Somos
        </span>

        <div
          className="grid gap-x-12 gap-y-6 md:grid-cols-12"
          style={{ alignItems: "start" }}
        >
          <h1
            id="quem-somos-heading"
            className="font-bold md:col-span-6"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--color-foreground)",
              textWrap: "balance",
            }}
          >
            {data.headline}
          </h1>

          <p
            className="md:col-span-6"
            style={{
              fontSize: "clamp(17px, 1.4vw, 19px)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--color-muted)",
              textWrap: "pretty",
              marginTop: "var(--spacing-sm)",
            }}
          >
            {data.body}
          </p>
        </div>
      </div>
    </section>
  );
}
