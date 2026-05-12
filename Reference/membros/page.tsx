import { sanityFetch } from "@/lib/sanity";
import type { Metadata } from "next";
import { MembrosSection } from "@/components/sobre";
import type { Member } from "@/components/sobre";

export const metadata: Metadata = {
  title: "Membros — Insper AI",
  description:
    "Conheça os membros da Insper AI: presidência, diretoria, coordenação e equipe que constroem a entidade estudantil de IA do Insper.",
};

const MEMBERS_QUERY = `*[_type == "member" && ativo == true] {
  _id,
  nome,
  cargo,
  nivel,
  linkedinUrl,
  foto
}`;

export default async function MembrosPage() {
  const { data: members } = await sanityFetch<Member[]>({ query: MEMBERS_QUERY });

  return (
    <>
      <section
        className="pt-[calc(var(--navbar-height)+var(--spacing-2xl))] pb-[var(--spacing-xl)] px-6"
        aria-labelledby="membros-hero-heading"
      >
        <div className="mx-auto max-w-7xl">
          <h1
            id="membros-hero-heading"
            className="text-[length:var(--font-size-display)] font-bold leading-[var(--line-height-heading)] text-[var(--color-foreground)]"
          >
            Nossos Membros
          </h1>
          <p className="mt-[var(--spacing-md)] max-w-3xl text-[length:var(--font-size-body)] text-[var(--color-muted)]">
            As pessoas por trás da Insper AI — presidência, diretoria, coordenação
            e equipe que dão vida à entidade estudantil de Inteligência Artificial
            do Insper.
          </p>
        </div>
      </section>

      <MembrosSection id="membros" members={members ?? []} />
    </>
  );
}
