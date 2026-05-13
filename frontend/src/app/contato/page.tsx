import type { ComponentType, SVGProps } from "react";
import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { getFaq, getSettings } from "@/lib/api";
import type { SiteSettings } from "@/lib/types";
import GlassCard from "@/components/ui/GlassCard";
import GradientText from "@/components/ui/GradientText";
import DecorativeGlow from "@/components/ui/DecorativeGlow";
import ContatoForm from "@/components/contato/ContatoForm";
import ContatoFaq from "@/components/contato/ContatoFaq";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;

function InstagramIcon({ size = 24, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      {...rest}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 24, ...rest }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      {...rest}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a InsperAI: e-mail, redes sociais e formulário.",
};

export default async function ContatoPage() {
  const [settings, faq] = await Promise.all([
    getSettings().catch(() => null),
    getFaq().catch(() => [] as Awaited<ReturnType<typeof getFaq>>),
  ]);

  return (
    <>
      <ContatoHero />
      {settings && <QuickLinks settings={settings} />}
      <ContatoForm />
      {settings && <ContatoInfo settings={settings} />}
      <ContatoFaq items={faq} />
    </>
  );
}

function ContatoHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: "var(--spacing-2xl)",
        paddingBottom: "var(--spacing-2xl)",
      }}
    >
      <DecorativeGlow
        className="left-1/2 top-0 -translate-x-1/2"
        size={600}
        opacity={0.18}
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="font-mono text-xs uppercase tracking-[0.25em]"
          style={{ color: "var(--color-accent)" }}
        >
          FALE CONOSCO
        </p>
        <h1
          className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          <GradientText as="span">Vamos construir o futuro</GradientText>
          <br />
          <span style={{ color: "var(--color-foreground)" }}>juntos</span>
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg"
          style={{ color: "var(--color-muted)" }}
        >
          Dúvidas, parcerias, mídia ou só quer dar um oi? Escolha o canal que
          preferir — respondemos rápido.
        </p>
      </div>
    </section>
  );
}

function QuickLinks({ settings }: { settings: SiteSettings }) {
  const links = [
    settings.email && {
      href: `mailto:${settings.email}`,
      icon: Mail,
      label: "E-mail",
      value: settings.email,
      external: false,
      aria: `Enviar e-mail para ${settings.email}`,
    },
    settings.instagram_url && {
      href: settings.instagram_url,
      icon: InstagramIcon,
      label: "Instagram",
      value: "@insperai",
      external: true,
      aria: "Abrir Instagram da InsperAI",
    },
    settings.linkedin_url && {
      href: settings.linkedin_url,
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "InsperAI",
      external: true,
      aria: "Abrir LinkedIn da InsperAI",
    },
  ].filter(Boolean) as Array<{
    href: string;
    icon: IconComponent;
    label: string;
    value: string;
    external: boolean;
    aria: string;
  }>;

  if (links.length === 0) return null;

  return (
    <section
      className="mx-auto max-w-7xl px-6"
      style={{
        paddingTop: "var(--spacing-xl)",
        paddingBottom: "var(--spacing-xl)",
      }}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {links.map(({ href, icon: Icon, label, value, external, aria }) => (
          <a
            key={label}
            href={href}
            aria-label={aria}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="group block"
          >
            <GlassCard className="h-full">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "var(--color-accent-light)" }}
              >
                <Icon
                  size={20}
                  aria-hidden
                  style={{ color: "var(--color-accent)" }}
                />
              </div>
              <p
                className="mt-4 font-mono text-xs uppercase tracking-[0.2em]"
                style={{ color: "var(--color-muted)" }}
              >
                {label}
              </p>
              <p
                className="mt-2 text-base font-medium break-words"
                style={{ color: "var(--color-foreground)" }}
              >
                {value}
              </p>
            </GlassCard>
          </a>
        ))}
      </div>
    </section>
  );
}

function ContatoInfo({ settings }: { settings: SiteSettings }) {
  const hasEndereco = Boolean(settings.endereco);
  const hasMap = Boolean(settings.google_maps_embed_url);
  if (!hasEndereco && !hasMap) return null;

  return (
    <section
      className="mx-auto max-w-7xl px-6"
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
          ONDE ESTAMOS
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--color-foreground)" }}
        >
          Nos visite no Insper
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {hasEndereco && (
          <GlassCard className="flex flex-col justify-center">
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: "var(--color-accent-light)" }}
            >
              <MapPin
                size={20}
                aria-hidden
                style={{ color: "var(--color-accent)" }}
              />
            </div>
            <p
              className="mt-4 font-mono text-xs uppercase tracking-[0.2em]"
              style={{ color: "var(--color-muted)" }}
            >
              Endereço
            </p>
            <p
              className="mt-2 whitespace-pre-line text-base leading-relaxed"
              style={{ color: "var(--color-foreground)" }}
            >
              {settings.endereco}
            </p>
          </GlassCard>
        )}
        {hasMap && (
          <GlassCard className="!p-0 overflow-hidden">
            <iframe
              src={settings.google_maps_embed_url}
              title="Mapa do Insper"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-video w-full"
              style={{ border: 0 }}
              allowFullScreen
            />
          </GlassCard>
        )}
      </div>
    </section>
  );
}
