import DecorativeGlow from "@/components/ui/DecorativeGlow";
import HeroSubscribeForm from "./HeroSubscribeForm";

export default function NewsletterHero() {
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
        size={600}
        opacity={0.2}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--color-accent)" }}
        >
          Newsletter
        </p>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          style={{ letterSpacing: "-0.02em", color: "var(--color-foreground)" }}
        >
          Newsletter Insper AI
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg"
          style={{ color: "var(--color-muted)" }}
        >
          IA por setor, toda semana. Engenharia, Direito e Finanças — uma curadoria
          contextualizada dos artigos que moldam o futuro da inteligência artificial.
        </p>

        <HeroSubscribeForm />
      </div>
    </section>
  );
}
