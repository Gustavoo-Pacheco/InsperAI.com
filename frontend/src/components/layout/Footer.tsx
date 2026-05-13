import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/api";
import {
  NAV_LINKS,
  SITE_METADATA,
  SOCIAL_PLATFORMS,
  type SocialPlatform,
} from "@/lib/constants";
import type { SiteSettings } from "@/lib/types";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const iconMap: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
};

export default async function Footer() {
  let settings: SiteSettings | null = null;
  try {
    settings = await getSettings();
  } catch {
    settings = null;
  }

  const navSplit = Math.ceil(NAV_LINKS.length / 2);
  const navLeft = NAV_LINKS.slice(0, navSplit);
  const navRight = NAV_LINKS.slice(navSplit);

  const email = settings?.email ?? "";
  const endereco = settings?.endereco ?? "";

  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-6 py-[var(--spacing-xl)]">
        <div className="grid grid-cols-1 gap-[var(--spacing-lg)] md:grid-cols-3 md:gap-[var(--spacing-xl)]">
          <div className="flex flex-col gap-[var(--spacing-xs)]">
            <div className="flex items-center gap-[var(--spacing-sm)]">
              <Image
                src="/logo-branca.png"
                alt="Insper AI"
                width={32}
                height={32}
                className="h-8 w-8 opacity-80"
              />
              <span className="text-base font-bold text-foreground">
                {SITE_METADATA.name}
              </span>
            </div>
            <p className="text-sm text-muted">{SITE_METADATA.tagline}</p>
            <p className="text-sm text-muted">{SITE_METADATA.description}</p>
          </div>

          <nav aria-label="Rodapé" className="flex flex-col gap-[var(--spacing-xs)]">
            <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-8">
              <ul className="flex flex-col gap-[var(--spacing-xs)]">
                {navLeft.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-default hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-[var(--spacing-xs)]">
                {navRight.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-default hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="flex flex-col gap-[var(--spacing-xs)]">
            <h3 className="text-sm font-semibold text-foreground">Contato</h3>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-sm text-muted transition-default hover:text-foreground"
              >
                {email}
              </a>
            )}
            {endereco && <p className="text-sm text-muted">{endereco}</p>}
            <div className="mt-[var(--spacing-xs)] flex items-center gap-[var(--spacing-md)]">
              {SOCIAL_PLATFORMS.map(({ platform, urlKey }) => {
                const href = settings?.[urlKey];
                if (!href) return null;
                const Icon = iconMap[platform];
                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Insper AI no ${platform}`}
                    className="text-muted transition-default hover:text-foreground"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-[var(--spacing-lg)] border-t border-border pt-[var(--spacing-md)]">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE_METADATA.copyrightHolder}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
