"use client";
import { useState } from "react";
import { ARTICLES, EDITION_LABEL } from "@/lib/data/newsletter";
import { FeaturedArticleCard } from "@/components/newsletter/FeaturedArticleCard";
import { ArticleCards } from "@/components/newsletter/ArticleCards";
import type { Sector } from "@/lib/data/newsletter";

const CATEGORIES: { id: Sector; label: string }[] = [
  { id: "engenharia", label: "Engenharia" },
  { id: "direito", label: "Direito" },
  { id: "financas", label: "Finanças" },
];

export default function NewsletterPage() {
  const [selectedCategory, setSelectedCategory] = useState<Sector | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedLabel =
    CATEGORIES.find((c) => c.id === selectedCategory)?.label ?? "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCategory || !email) return;
    setSubmitted(true);
  };

  const filtered = selectedCategory
    ? ARTICLES.filter((a) => a.setor === selectedCategory)
    : [];

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Hero */}
      <section className="px-6 pt-[var(--spacing-xl)] pb-[var(--spacing-md)]">
        <div className="mx-auto max-w-4xl flex items-baseline gap-[var(--spacing-md)]">
          <h1
            className="text-display font-bold leading-display"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-end))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Jornal da Insper AI
          </h1>
          <p className="text-label font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)] shrink-0">
            {EDITION_LABEL}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-[var(--spacing-3xl)]">

        {/* Row 1: Category selector — horizontal pills, sticky below navbar */}
        <div
          className="sticky z-10 flex flex-wrap gap-[var(--spacing-sm)] justify-center py-[var(--spacing-md)]"
          style={{
            top: "var(--navbar-height)",
            backgroundColor: "var(--color-background)",
            marginLeft: "calc(-1.5rem)",
            marginRight: "calc(-1.5rem)",
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {CATEGORIES.map(({ id, label }) => {
            const isSelected = selectedCategory === id;
            return (
              <button
                key={id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === id ? null : id)
                }
                aria-pressed={isSelected}
                className="rounded-full px-[var(--spacing-xl)] h-12 font-bold text-body transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                style={
                  isSelected
                    ? {
                        background:
                          "linear-gradient(135deg, var(--color-accent), var(--color-accent-end))",
                        color: "white",
                        boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-foreground)",
                      }
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Email subscribe — big, centered */}
        <div className="mt-[var(--spacing-2xl)]">
          {submitted ? (
            <p
              aria-live="polite"
              className="text-center text-body text-[var(--color-muted)]"
            >
              ✓ Obrigado! Você receberá a próxima edição no seu email.
            </p>
          ) : (
            <div
              className={`transition-opacity duration-200 ${
                selectedCategory ? "opacity-100" : "opacity-40 pointer-events-none select-none"
              }`}
            >
              <p className="text-center text-[length:var(--font-size-heading)] font-bold text-[var(--color-foreground)] mb-[var(--spacing-md)]">
                Insira seu email
                {selectedCategory && (
                  <span
                    className="ml-[var(--spacing-sm)] text-body font-normal"
                    style={{ color: "var(--color-accent)" }}
                  >
                    — {selectedLabel}
                  </span>
                )}
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[var(--spacing-sm)] w-full mx-auto"
              >
                <input
                  type="email"
                  required
                  aria-required="true"
                  aria-label="Seu email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!selectedCategory}
                  className="w-full h-14 rounded-xl px-[var(--spacing-md)] text-body text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  style={{
                    backgroundColor: "rgba(24,24,27,0.7)",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <button
                  type="submit"
                  disabled={!selectedCategory}
                  className="w-full h-16 rounded-xl font-bold text-[length:var(--font-size-heading)] text-white transition-all duration-200"
                  style={
                    selectedCategory
                      ? {
                          background:
                            "linear-gradient(135deg, var(--color-accent), var(--color-accent-end))",
                          boxShadow: "0 8px 24px rgba(139,92,246,0.4)",
                        }
                      : {
                          background: "var(--color-border)",
                        }
                  }
                >
                  Inscrever-se
                </button>
              </form>
              {!selectedCategory && (
                <p className="mt-[var(--spacing-sm)] text-center text-label text-[var(--color-muted)]">
                  Selecione uma área acima para habilitar a inscrição
                </p>
              )}
            </div>
          )}
        </div>

        {/* Row 3: Article cards */}
        <div className="mt-[var(--spacing-3xl)]">
          {selectedCategory === null ? (
            <>
              <h2 className="text-[length:var(--font-size-heading)] font-bold text-[var(--color-foreground)] mb-[var(--spacing-xl)]">
                Prévia desta edição
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--spacing-md)]">
                {CATEGORIES.map((cat) => {
                  const first = ARTICLES.find((a) => a.setor === cat.id);
                  if (!first) return null;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      aria-label={`Ver artigos de ${cat.label}`}
                      className="glass rounded-xl p-[var(--spacing-lg)] text-left w-full transition-all duration-200 hover:shadow-[0_4px_16px_rgba(139,92,246,0.15)] hover:scale-[1.005] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                    >
                      <span
                        className="inline-block rounded-full px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-label font-bold"
                        style={{
                          backgroundColor: "rgba(139,92,246,0.15)",
                          border: "1px solid rgba(139,92,246,0.25)",
                          color: "var(--color-accent)",
                        }}
                      >
                        {cat.label}
                      </span>
                      <p className="mt-[var(--spacing-sm)] text-body font-bold text-[var(--color-foreground)] line-clamp-2">
                        {first.titulo}
                      </p>
                      <p className="mt-[var(--spacing-xs)] text-label text-[var(--color-muted)] line-clamp-3">
                        {first.resumo}
                      </p>
                      <p
                        className="mt-[var(--spacing-sm)] text-label font-bold"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Ver artigos de {cat.label} &rarr;
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[length:var(--font-size-heading)] font-bold text-[var(--color-foreground)] mb-[var(--spacing-xl)]">
                {selectedLabel}
              </h2>
              {filtered.length === 0 ? (
                <p className="text-body text-[var(--color-muted)]">
                  Nenhum artigo disponível nesta edição.
                </p>
              ) : (
                <>
                  <FeaturedArticleCard article={filtered[0]} />
                  {filtered.length > 1 && (
                    <div className="mt-[var(--spacing-md)]">
                      <ArticleCards articles={filtered.slice(1)} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
