import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditionPaginationProps {
  basePath: string;
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

function pagePath(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  return `${basePath}?page=${page}`;
}

export default function EditionPagination({
  basePath,
  page,
  hasPrevious,
  hasNext,
}: EditionPaginationProps) {
  if (!hasPrevious && !hasNext) return null;

  const linkStyle = "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200";

  return (
    <nav
      className="mx-auto mt-12 flex max-w-4xl items-center justify-between px-6"
      aria-label="Paginação de edições"
    >
      {hasPrevious ? (
        <Link
          href={pagePath(basePath, page - 1)}
          className={cn(linkStyle, "hover:-translate-x-0.5")}
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-foreground)",
          }}
        >
          <ArrowLeft size={14} aria-hidden />
          Anterior
        </Link>
      ) : (
        <span />
      )}
      <span
        className="font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--color-muted)" }}
      >
        Página {page}
      </span>
      {hasNext ? (
        <Link
          href={pagePath(basePath, page + 1)}
          className={cn(linkStyle, "hover:translate-x-0.5")}
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-foreground)",
          }}
        >
          Próxima
          <ArrowRight size={14} aria-hidden />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
