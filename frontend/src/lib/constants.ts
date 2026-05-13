import type { SiteSettings } from "./types";

export const NAV_LINKS = [
  { label: "Sobre", href: "/sobre" },
  { label: "Membros", href: "/membros" },
  { label: "Processo Seletivo", href: "/processo-seletivo" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Eventos", href: "/eventos" },
  { label: "Recursos", href: "/recursos" },
  { label: "Contato", href: "/contato" },
] as const;

export type SocialPlatform = "Instagram" | "LinkedIn" | "GitHub";

export const SOCIAL_PLATFORMS: ReadonlyArray<{
  platform: SocialPlatform;
  urlKey: keyof Pick<SiteSettings, "instagram_url" | "linkedin_url" | "github_url">;
}> = [
  { platform: "Instagram", urlKey: "instagram_url" },
  { platform: "LinkedIn", urlKey: "linkedin_url" },
  { platform: "GitHub", urlKey: "github_url" },
];

export const SITE_METADATA = {
  name: "Insper AI",
  tagline: "Deep Learning, Deep Thinking",
  description: "Entidade estudantil de Inteligência Artificial do Insper",
  copyrightHolder: "Insper AI",
} as const;
