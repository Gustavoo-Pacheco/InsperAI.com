"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { ArtigoSetor } from "@/lib/types";

interface NewsletterHomeContextValue {
  selectedSetor: ArtigoSetor | null;
  setSelectedSetor: (s: ArtigoSetor | null) => void;
}

const NewsletterHomeContext = createContext<NewsletterHomeContextValue | null>(null);

export function useNewsletterHome(): NewsletterHomeContextValue {
  const ctx = useContext(NewsletterHomeContext);
  if (!ctx) {
    throw new Error("useNewsletterHome must be used inside <NewsletterHomeShell>");
  }
  return ctx;
}

export default function NewsletterHomeShell({ children }: { children: ReactNode }) {
  const [selectedSetor, setSelectedSetor] = useState<ArtigoSetor | null>(null);
  const value = useMemo(() => ({ selectedSetor, setSelectedSetor }), [selectedSetor]);
  return (
    <NewsletterHomeContext.Provider value={value}>{children}</NewsletterHomeContext.Provider>
  );
}
