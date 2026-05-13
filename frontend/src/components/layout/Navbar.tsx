"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/sobre", label: "Sobre" },
  { href: "/membros", label: "Membros" },
  { href: "/eventos", label: "Eventos" },
  { href: "/recursos", label: "Recursos" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/processo-seletivo", label: "Processo Seletivo" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter] duration-200",
        scrolled
          ? "glass border-b border-[var(--color-border)]"
          : "border-b border-transparent bg-transparent",
      )}
      style={{ height: "var(--navbar-height)" }}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium uppercase tracking-[0.15em] text-foreground"
        >
          Insper<span style={{ color: "var(--color-accent)" }}>AI</span>
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[var(--color-muted)] transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
