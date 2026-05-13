import Image from "next/image";
import type { Membro } from "@/lib/types";
import { mediaUrl } from "@/lib/api";

function LinkedinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.2c-3.34.72-4.04-1.42-4.04-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.22.7.83.58A12 12 0 0 0 12 .3" />
    </svg>
  );
}

interface MemberCardProps {
  membro: Membro;
}

export default function MemberCard({ membro }: MemberCardProps) {
  const photoSrc = membro.foto ? mediaUrl(membro.foto) : null;

  return (
    <article
      className="flex flex-col items-center text-center"
      style={{
        padding: "var(--spacing-md)",
        gap: "var(--spacing-sm)",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: "128px",
          height: "128px",
          borderRadius: "50%",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={`Foto de ${membro.nome}`}
            fill
            sizes="128px"
            className="object-cover"
          />
        ) : null}
      </div>

      <h3
        className="font-bold"
        style={{
          fontSize: "15px",
          lineHeight: 1.3,
          color: "var(--color-foreground)",
          marginTop: "var(--spacing-xs)",
        }}
      >
        {membro.nome}
      </h3>

      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.4,
          color: "var(--color-muted)",
        }}
      >
        {membro.cargo}
      </p>

      {(membro.semestre || membro.linkedin_url || membro.github_url) ? (
        <div
          className="flex items-center"
          style={{ gap: "var(--spacing-sm)", marginTop: "var(--spacing-xs)" }}
        >
          {membro.semestre ? (
            <span
              className="font-mono uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "var(--color-muted)",
                background: "var(--color-accent-ultra)",
                border: "1px solid var(--color-accent-light)",
                padding: "3px 8px",
                borderRadius: "999px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {membro.semestre}
            </span>
          ) : null}
          {membro.linkedin_url ? (
            <a
              href={membro.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${membro.nome} (abre em nova aba)`}
              className="inline-flex items-center justify-center transition-colors hover:text-[color:var(--color-accent)] hover:border-[color:var(--color-accent-light)]"
              style={{
                color: "var(--color-muted)",
                width: "24px",
                height: "24px",
                borderRadius: "999px",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <LinkedinIcon />
            </a>
          ) : null}
          {membro.github_url ? (
            <a
              href={membro.github_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub de ${membro.nome} (abre em nova aba)`}
              className="inline-flex items-center justify-center transition-colors hover:text-[color:var(--color-accent)] hover:border-[color:var(--color-accent-light)]"
              style={{
                color: "var(--color-muted)",
                width: "24px",
                height: "24px",
                borderRadius: "999px",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <GithubIcon />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
