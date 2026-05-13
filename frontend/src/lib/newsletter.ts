import type { ArtigoSetor } from "./types";

export const MES_NOMES: Record<number, string> = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

export const SETOR_LABEL: Record<ArtigoSetor, string> = {
  engenharia: "Engenharia",
  direito: "Direito",
  financas: "Finanças",
};

export const SETOR_ORDER: ArtigoSetor[] = ["engenharia", "direito", "financas"];

export const SETOR_TAGLINE: Record<ArtigoSetor, string> = {
  engenharia: "Avanços técnicos, modelos e ferramentas",
  direito: "Legal tech, regulação e jurisprudência",
  financas: "Mercado, gestão de risco e fintechs",
};

export function isArtigoSetor(value: string): value is ArtigoSetor {
  return value === "engenharia" || value === "direito" || value === "financas";
}

export function formatEdicaoDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map((n) => Number(n));
  if (!year || !month || !day) return isoDate;
  return `${String(day).padStart(2, "0")} ${MES_NOMES[month]} ${year}`;
}

export function formatWeekId(weekId: string): string {
  // "2026-W18" -> "Semana 18 / 2026"
  const match = /^(\d{4})-W(\d{1,2})$/.exec(weekId);
  if (!match) return weekId;
  return `Semana ${match[2]} / ${match[1]}`;
}
