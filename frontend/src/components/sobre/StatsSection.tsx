"use client";

import { useEffect, useRef, useState } from "react";
import type { SobreStats } from "@/lib/types";

interface StatsSectionProps {
  stats: SobreStats;
}

interface Tile {
  label: string;
  value: number;
}

function buildTiles(stats: SobreStats): Tile[] {
  const tiles: Tile[] = [
    { label: "Membros ativos", value: stats.membros_ativos },
    { label: "Eventos realizados", value: stats.eventos_realizados },
    { label: "Parceiros", value: stats.parceiros },
    { label: "Inscritos no último processo seletivo", value: stats.inscritos_processo_seletivo },
  ];
  if (stats.projetos_entregues != null) {
    tiles.push({ label: "Projetos entregues", value: stats.projetos_entregues });
  }
  if (stats.anos_atuacao != null) {
    tiles.push({ label: "Anos de atuação", value: stats.anos_atuacao });
  }
  return tiles;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const duration = 2500;
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              setValue(Math.round(easeOutCubic(t) * target));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {value}
    </span>
  );
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const tiles = buildTiles(stats);
  if (tiles.length === 0) return null;

  return (
    <section
      aria-labelledby="stats-heading"
      style={{ background: "var(--color-surface)" }}
    >
      <div
        className="mx-auto max-w-6xl px-6"
        style={{
          paddingTop: "var(--spacing-xl)",
          paddingBottom: "var(--spacing-xl)",
        }}
      >
        <div style={{ marginBottom: "var(--spacing-xl)" }}>
          <span
            className="font-mono uppercase"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
              display: "block",
              marginBottom: "var(--spacing-sm)",
            }}
          >
            Impacto
          </span>
          <h2
            id="stats-heading"
            className="font-bold"
            style={{
              fontSize: "32px",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--color-foreground)",
            }}
          >
            Insper AI em {stats.semester}
          </h2>
        </div>

        <ul
          className="grid list-none"
          style={{
            gridTemplateColumns: `repeat(${tiles.length}, minmax(0, 1fr))`,
            gap: 0,
          }}
        >
          {tiles.map((tile, idx) => (
            <li
              key={tile.label}
              style={{
                padding: "0 var(--spacing-lg)",
                borderLeft:
                  idx === 0 ? "none" : "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(48px, 6vw, 80px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "var(--color-accent)",
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                <CountUp target={tile.value} />
              </div>
              <div
                className="uppercase"
                style={{
                  fontSize: "12px",
                  lineHeight: 1.4,
                  color: "var(--color-muted)",
                  letterSpacing: "0.08em",
                }}
              >
                {tile.label}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @media (max-width: 768px) {
          [aria-labelledby="stats-heading"] ul {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            row-gap: var(--spacing-xl) !important;
          }
          [aria-labelledby="stats-heading"] ul li:nth-child(odd) {
            border-left: none !important;
          }
        }
      `}</style>
    </section>
  );
}
