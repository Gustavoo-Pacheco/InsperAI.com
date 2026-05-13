import DecorativeGlow from "@/components/ui/DecorativeGlow";

export function RecursosHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <DecorativeGlow
        className="left-1/2 top-0 -translate-x-1/2"
        size={560}
        opacity={0.2}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.12em]"
          style={{ color: "var(--color-accent)" }}
        >
          Recursos
        </p>
        <h1
          className="mt-4 text-5xl font-extrabold leading-[1.1] sm:text-6xl"
          style={{ letterSpacing: "-0.02em", color: "var(--color-foreground)" }}
        >
          Aprenda IA com profundidade
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg"
          style={{ color: "var(--color-muted)", lineHeight: 1.65 }}
        >
          Curadoria de cursos, material próprio e conteúdo do Jornal da Insper AI.
        </p>
      </div>
    </section>
  );
}
