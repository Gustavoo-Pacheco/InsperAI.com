"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";

interface Props {
  items: Faq[];
}

export default function ContatoFaq({ items }: Props) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-3xl px-6"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <div className="mb-[var(--spacing-lg)] text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: "var(--color-accent)" }}
        >
          PERGUNTAS FREQUENTES
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--color-foreground)" }}
        >
          Talvez sua dúvida já tenha resposta
        </h2>
      </div>

      <GlassCard as="section" className="!p-0 overflow-hidden">
        <dl className="divide-y" style={{ borderColor: "var(--color-border)" }}>
          {items.map((item) => {
            const open = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;
            return (
              <div
                key={item.id}
                className="border-t first:border-t-0"
                style={{ borderColor: "var(--color-border)" }}
              >
                <dt>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
                      "transition-colors duration-200",
                      "hover:bg-[var(--color-accent-ultra)]",
                    )}
                  >
                    <span className="text-base font-medium text-foreground">
                      {item.pergunta}
                    </span>
                    <ChevronDown
                      size={20}
                      aria-hidden
                      className={cn(
                        "shrink-0 transition-transform duration-200",
                        open && "rotate-180",
                      )}
                      style={{ color: "var(--color-accent)" }}
                    />
                  </button>
                </dt>
                {open && (
                  <dd
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-5 text-sm leading-relaxed text-muted"
                  >
                    {item.resposta}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </GlassCard>
    </section>
  );
}
