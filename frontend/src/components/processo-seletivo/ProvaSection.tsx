export default function ProvaSection() {
  return (
    <section
      aria-labelledby="prova-heading"
      className="px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="prova-heading"
          className="text-3xl font-bold tracking-tight text-[var(--color-foreground)] md:text-4xl"
        >
          Junte-se a 20+ membros construindo o futuro da IA
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
          A InsperAI reúne estudantes apaixonados por tecnologia, direito,
          finanças e ciências para explorar como a IA transforma o mundo.
        </p>
      </div>
    </section>
  );
}
