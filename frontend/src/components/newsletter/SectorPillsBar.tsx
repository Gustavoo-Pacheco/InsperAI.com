"use client";

import { SETOR_LABEL, SETOR_ORDER } from "@/lib/newsletter";
import { cn } from "@/lib/utils";
import { useNewsletterHome } from "./NewsletterHomeShell";

export default function SectorPillsBar() {
  const { selectedSetor, setSelectedSetor } = useNewsletterHome();

  return (
    <div
      className="border-y backdrop-blur-md"
      style={{
        background: "rgba(9, 9, 11, 0.85)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-4 sm:gap-4">
        {SETOR_ORDER.map((setor) => {
          const active = selectedSetor === setor;
          return (
            <button
              key={setor}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedSetor(active ? null : setor)}
              className={cn(
                "rounded-full border px-6 py-2.5 text-base font-medium transition-all duration-200",
                "focus:outline-none hover:-translate-y-px",
              )}
              style={
                active
                  ? {
                      background: "var(--color-accent)",
                      borderColor: "var(--color-accent)",
                      color: "#ffffff",
                    }
                  : {
                      background: "transparent",
                      borderColor: "var(--color-border)",
                      color: "var(--color-foreground)",
                    }
              }
            >
              {SETOR_LABEL[setor]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
