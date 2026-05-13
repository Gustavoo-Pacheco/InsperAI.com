import type { RecursoNivel } from "@/lib/types";

const LABEL: Record<RecursoNivel, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const STYLES: Record<RecursoNivel, { bg: string; color: string; border: string }> = {
  iniciante: {
    bg: "rgba(34, 197, 94, 0.12)",
    color: "#4ADE80",
    border: "rgba(34, 197, 94, 0.25)",
  },
  intermediario: {
    bg: "rgba(234, 179, 8, 0.12)",
    color: "#FDE047",
    border: "rgba(234, 179, 8, 0.25)",
  },
  avancado: {
    bg: "rgba(139, 92, 246, 0.15)",
    color: "#C4B5FD",
    border: "rgba(139, 92, 246, 0.30)",
  },
};

export function DifficultyBadge({ nivel }: { nivel: RecursoNivel }) {
  const s = STYLES[nivel];
  return (
    <span
      className="inline-flex items-center rounded border font-mono font-semibold uppercase"
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderColor: s.border,
        fontSize: "14px",
        letterSpacing: "0.12em",
        padding: "3px 10px",
        lineHeight: 1.2,
        width: "fit-content",
      }}
    >
      {LABEL[nivel]}
    </span>
  );
}
