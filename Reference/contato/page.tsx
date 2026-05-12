import type { Metadata } from "next";
import { Mail } from "lucide-react";
import {
  ContactForm,
  OrgInfoBlock,
  GoogleMapsEmbed,
  FAQAccordion,
} from "@/components/contato";

// Inline SVG icons for quick-links row (copied from OrgInfoBlock.tsx)
function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px" }}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: "20px", height: "20px" }}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Insper AI — dúvidas, parcerias ou sugestões. Formulário de contato, email, redes sociais e localização do campus.",
};

export default function ContatoPage() {
  return (
    <main style={{ background: "var(--color-background)" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          paddingTop: "var(--navbar-height)",
          paddingBottom: "var(--spacing-md)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
        }}
      >
        {/* "CONTATO" label floated above hero, overlapping navbar bottom */}
        <p
          className="font-mono font-semibold uppercase"
          style={{
            position: "absolute",
            top: "calc(var(--navbar-height) - var(--spacing-lg))",
            left: "var(--spacing-xl)",
            fontSize: "14px",
            letterSpacing: "0.12em",
            color: "var(--color-accent)",
            zIndex: 60,
          }}
        >
          CONTATO
        </p>
        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <h1
            className="font-semibold"
            style={{
              fontSize: "48px",
              lineHeight: 1.1,
              color: "var(--color-foreground)",
              marginBottom: "var(--spacing-md)",
            }}
          >
            Fale com a Insper AI
          </h1>
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--color-muted)",
              maxWidth: "640px",
            }}
          >
            Dúvidas, parcerias ou sugestões — estamos aqui.
          </p>
        </div>
      </section>

      {/* Quick-links row — email, Instagram, LinkedIn */}
      <section
        style={{
          background: "var(--color-background)",
          paddingTop: "var(--spacing-lg)",
          paddingBottom: "var(--spacing-lg)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "var(--spacing-md)" }}
          >
            {/* Email */}
            <a
              href="mailto:contato@insperai.com.br"
              className="glass transition-default hover:bg-[rgba(139,92,246,0.08)]"
              style={{
                borderRadius: "0.75rem",
                padding: "var(--spacing-md) var(--spacing-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-md)",
                color: "var(--color-foreground)",
                textDecoration: "none",
              }}
            >
              <Mail
                style={{ width: "20px", height: "20px", color: "var(--color-accent)", flexShrink: 0 }}
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  Email
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "var(--color-foreground)",
                    fontWeight: 500,
                  }}
                >
                  contato@insperai.com.br
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/insperai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass transition-default hover:bg-[rgba(139,92,246,0.08)]"
              style={{
                borderRadius: "0.75rem",
                padding: "var(--spacing-md) var(--spacing-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-md)",
                color: "var(--color-foreground)",
                textDecoration: "none",
              }}
            >
              <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>
                <InstagramIcon />
              </span>
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  Instagram
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "var(--color-foreground)",
                    fontWeight: 500,
                  }}
                >
                  @insperai
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/insperai"
              target="_blank"
              rel="noopener noreferrer"
              className="glass transition-default hover:bg-[rgba(139,92,246,0.08)]"
              style={{
                borderRadius: "0.75rem",
                padding: "var(--spacing-md) var(--spacing-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-md)",
                color: "var(--color-foreground)",
                textDecoration: "none",
              }}
            >
              <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>
                <LinkedInIcon />
              </span>
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  LinkedIn
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "var(--color-foreground)",
                    fontWeight: 500,
                  }}
                >
                  insperai
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact form — background --color-background */}
      <section
        style={{
          background: "var(--color-background)",
          paddingTop: "var(--spacing-lg)",
          paddingBottom: "var(--spacing-xl)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
        }}
      >
        <ContactForm />
      </section>

      {/* Org info + map — background --color-surface */}
      <section
        style={{
          background: "var(--color-surface)",
          paddingTop: "var(--spacing-2xl)",
          paddingBottom: "var(--spacing-2xl)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "1120px" }}>
          <p
            className="font-mono font-semibold uppercase"
            style={{
              fontSize: "14px",
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
              marginBottom: "var(--spacing-sm)",
            }}
          >
            ONDE NOS ENCONTRAR
          </p>
          <h2
            className="font-semibold"
            style={{
              fontSize: "24px",
              lineHeight: 1.25,
              color: "var(--color-foreground)",
              marginBottom: "var(--spacing-xl)",
            }}
          >
            Informações da organização
          </h2>
          <OrgInfoBlock />
          <div style={{ marginTop: "var(--spacing-xl)" }}>
            <GoogleMapsEmbed />
          </div>
        </div>
      </section>

      {/* FAQ — background --color-background */}
      <section
        style={{
          background: "var(--color-background)",
          paddingTop: "var(--spacing-2xl)",
          paddingBottom: "var(--spacing-3xl)",
          paddingLeft: "var(--spacing-xl)",
          paddingRight: "var(--spacing-xl)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "720px" }}>
          <p
            className="font-mono font-semibold uppercase"
            style={{
              fontSize: "14px",
              letterSpacing: "0.12em",
              color: "var(--color-accent)",
              marginBottom: "var(--spacing-sm)",
            }}
          >
            PERGUNTAS FREQUENTES
          </p>
          <h2
            className="font-semibold"
            style={{
              fontSize: "24px",
              lineHeight: 1.25,
              color: "var(--color-foreground)",
              marginBottom: "var(--spacing-xl)",
            }}
          >
            FAQ
          </h2>
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
