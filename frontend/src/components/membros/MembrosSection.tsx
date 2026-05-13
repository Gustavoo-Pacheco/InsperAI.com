import type { Membro } from "@/lib/types";
import MemberCard from "./MemberCard";

interface MembrosSectionProps {
  titulo: string;
  membros: Membro[];
  id: string;
}

export default function MembrosSection({ titulo, membros, id }: MembrosSectionProps) {
  if (membros.length === 0) return null;

  return (
    <section
      aria-labelledby={`membros-${id}-heading`}
      style={{ background: "var(--color-background)" }}
    >
      <div
        className="mx-auto max-w-5xl px-6"
        style={{
          paddingTop: "var(--spacing-lg)",
          paddingBottom: "var(--spacing-lg)",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ marginBottom: "var(--spacing-lg)" }}
        >
          <h2
            id={`membros-${id}-heading`}
            className="text-center font-bold"
            style={{
              fontSize: "24px",
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "var(--color-foreground)",
            }}
          >
            {titulo}
          </h2>
          <span
            aria-hidden="true"
            style={{
              marginTop: "var(--spacing-sm)",
              width: "48px",
              height: "2px",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)",
            }}
          />
        </div>

        <ul
          className="flex flex-wrap list-none justify-center"
          style={{
            gap: membros.length === 2 ? "var(--spacing-sm)" : "var(--spacing-md)",
          }}
        >
          {membros.map((membro) => (
            <li key={membro.id} style={{ width: "220px" }}>
              <MemberCard membro={membro} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
