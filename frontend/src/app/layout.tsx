import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "InsperAI — Inteligência Artificial no Insper",
    template: "%s · InsperAI",
  },
  description:
    "Organização estudantil do Insper dedicada à pesquisa, ensino e aplicação de Inteligência Artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main
          className="flex-1"
          style={{ paddingTop: "var(--navbar-height)" }}
        >
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
