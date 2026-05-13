import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getEdicoes } from "@/lib/api";
import ArquivoList from "@/components/newsletter/ArquivoList";
import EditionPagination from "@/components/newsletter/EditionPagination";

export const metadata: Metadata = {
  title: "Arquivo · Newsletter",
  description: "Todas as edições passadas da Newsletter Insper AI por setor.",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArquivoPage({ searchParams }: PageProps) {
  const { page: pageRaw } = await searchParams;
  const page = Math.max(1, Number(pageRaw) || 1);

  const data = await getEdicoes({ page }).catch(() => null);
  const edicoes = data?.results ?? [];

  return (
    <section
      style={{
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "var(--color-muted)" }}
        >
          <ArrowLeft size={14} aria-hidden />
          Voltar
        </Link>
        <h1
          className="mt-4 text-4xl font-extrabold sm:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Arquivo
        </h1>
        <p
          className="mt-3 text-sm sm:text-base"
          style={{ color: "var(--color-muted)" }}
        >
          Todas as edições passadas, agrupadas por semana.
        </p>
      </div>

      <div style={{ paddingTop: "var(--spacing-lg)" }}>
        <ArquivoList edicoes={edicoes} />
      </div>

      <EditionPagination
        basePath="/newsletter/arquivo"
        page={page}
        hasPrevious={Boolean(data?.previous)}
        hasNext={Boolean(data?.next)}
      />
    </section>
  );
}
