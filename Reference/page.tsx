import { sanityFetch } from "@/lib/sanity";
import { HeroSection } from "@/components/home/HeroSection";
import { MissaoSection } from "@/components/home/MissaoSection";
import { QuemSomosSection } from "@/components/home/QuemSomosSection";
import { AtividadesSection } from "@/components/home/AtividadesSection";
import { ParceirosSection } from "@/components/sobre/ParceirosSection";
import { SecondaryCtaSection } from "@/components/home/SecondaryCtaSection";

const MEMBERS_QUERY = `*[_type == "member" && ativo == true] [0...12] {
  _id,
  nome,
  foto,
  nivel
}`;

type HomeMember = {
  _id: string;
  nome: string;
  foto?: unknown;
  nivel: string;
};

export default async function HomePage() {
  const { data: members } = await sanityFetch<HomeMember[]>({ query: MEMBERS_QUERY });

  return (
    <div className="-mt-[var(--navbar-height)]">
      <HeroSection />
      <MissaoSection />
      <QuemSomosSection members={members ?? []} />
      <AtividadesSection />
      <ParceirosSection id="parceiros" />
      <SecondaryCtaSection />
    </div>
  );
}
