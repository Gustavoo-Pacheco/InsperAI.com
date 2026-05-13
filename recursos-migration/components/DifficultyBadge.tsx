import type { Difficulty } from "../lib/recursos";

const BADGE_STYLES: Record<Difficulty, { bg: string; color: string; border: string }> = {
  Iniciante:     { bg: "rgba(34, 197, 94, 0.12)",  color: "#4ADE80", border: "rgba(34, 197, 94, 0.25)" },
  Intermediário: { bg: "rgba(234, 179, 8, 0.12)",  color: "#FDE047", border: "rgba(234, 179, 8, 0.25)" },
  Avançado:      { bg: "rgba(139, 92, 246, 0.15)", color: "#C4B5FD", border: "rgba(139, 92, 246, 0.30)" },
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const s = BADGE_STYLES[difficulty];
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
      }}
    >
      {difficulty}
    </span>
  );
}
