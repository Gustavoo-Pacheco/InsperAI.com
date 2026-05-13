import type { Metadata } from "next";
import { getMembros } from "@/lib/api";
import type { Membro, MembroNivel } from "@/lib/types";
import MembrosHero from "@/components/membros/MembrosHero";
import MembrosSection from "@/components/membros/MembrosSection";

export const metadata: Metadata = {
  title: "Membros",
  description: "Time atual da InsperAI agrupado por nível de atuação.",
};

const NIVEIS: { key: MembroNivel; titulo: string }[] = [
  { key: "presidencia", titulo: "Presidência" },
  { key: "diretoria", titulo: "Diretoria" },
  { key: "coordenacao", titulo: "Coordenação" },
  { key: "equipe", titulo: "Equipe" },
  { key: "trainee", titulo: "Trainees" },
];

function groupByNivel(membros: Membro[]): Record<MembroNivel, Membro[]> {
  const groups: Record<MembroNivel, Membro[]> = {
    presidencia: [],
    diretoria: [],
    coordenacao: [],
    equipe: [],
    trainee: [],
  };
  for (const m of membros) {
    if (m.nivel in groups) groups[m.nivel].push(m);
  }
  return groups;
}

function latestSemestre(membros: Membro[]): string {
  const semestres = membros
    .map((m) => m.semestre)
    .filter((s): s is string => Boolean(s));
  if (semestres.length === 0) return "";
  return semestres.sort().reverse()[0];
}

export default async function MembrosPage() {
  const [ativos, alumni] = await Promise.all([
    getMembros({ ativo: true, ordering: "ordem" }).catch(() => []),
    getMembros({ ativo: false, alumni: true, ordering: "ordem" }).catch(() => []),
  ]);

  const grupos = groupByNivel(ativos);
  const semestre = latestSemestre(ativos);

  return (
    <main style={{ background: "var(--color-background)" }}>
      <MembrosHero total={ativos.length} semestre={semestre} />
      {NIVEIS.map(({ key, titulo }) => (
        <MembrosSection
          key={key}
          id={key}
          titulo={titulo}
          membros={grupos[key]}
        />
      ))}
      <MembrosSection id="alumni" titulo="Alumni" membros={alumni} />
    </main>
  );
}
