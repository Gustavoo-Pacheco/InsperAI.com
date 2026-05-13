import type { Metadata } from "next";
import { getRecursos } from "@/lib/api";
import { RecursosHero } from "@/components/recursos/RecursosHero";
import { ResourceSection } from "@/components/recursos/ResourceSection";

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Material próprio e cursos recomendados pela comunidade InsperAI.",
};

export default async function RecursosPage() {
  const [material, cursos] = await Promise.all([
    getRecursos({ secao: "material" }).catch(() => []),
    getRecursos({ secao: "cursos" }).catch(() => []),
  ]);

  return (
    <main style={{ background: "var(--color-background)" }}>
      <RecursosHero />

      <ResourceSection
        id="material"
        eyebrow="MATERIAL PRÓPRIO"
        heading="Material Próprio"
        subtext="Papers e posts do Jornal da Insper AI escritos pelos membros."
        background="background"
        items={material}
      />

      <ResourceSection
        id="cursos"
        eyebrow="CURSOS RECOMENDADOS"
        heading="Cursos Recomendados"
        subtext="Links curados para os melhores cursos externos de IA, do nível iniciante ao avançado."
        background="surface"
        items={cursos}
      />
    </main>
  );
}
