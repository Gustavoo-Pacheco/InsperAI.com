"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { enviarContato } from "@/lib/api";
import type { ContatoBody } from "@/lib/types";
import { cn } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";

type Status = "idle" | "sending" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY: ContatoBody = { nome: "", email: "", assunto: "", mensagem: "" };

const fieldClass = cn(
  "w-full rounded-lg border bg-transparent px-3 py-2",
  "text-foreground placeholder:text-muted",
  "transition-colors duration-200",
  "focus:outline-none focus:border-transparent",
);

export default function ContatoForm() {
  const [values, setValues] = useState<ContatoBody>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof ContatoBody>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed: ContatoBody = {
      nome: values.nome.trim(),
      email: values.email.trim(),
      assunto: values.assunto.trim(),
      mensagem: values.mensagem.trim(),
    };

    if (!trimmed.nome || !trimmed.email || !trimmed.assunto || !trimmed.mensagem) {
      setStatus("error");
      setErrorMessage("Preencha todos os campos.");
      return;
    }
    if (!EMAIL_RE.test(trimmed.email)) {
      setStatus("error");
      setErrorMessage("Informe um e-mail válido.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    try {
      await enviarContato(trimmed);
      setStatus("success");
      setValues(EMPTY);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? "Não foi possível enviar sua mensagem. Tente novamente."
          : "Erro inesperado.",
      );
    }
  }

  const sending = status === "sending";

  return (
    <GlassCard as="section" className="flex h-full flex-col p-5 sm:p-6">
        <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Nome</span>
              <input
                type="text"
                name="nome"
                autoComplete="name"
                required
                disabled={sending}
                value={values.nome}
                onChange={(e) => update("nome", e.target.value)}
                className={fieldClass}
                style={{ borderColor: "var(--color-border)" }}
                placeholder="Seu nome completo"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">E-mail</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                disabled={sending}
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldClass}
                style={{ borderColor: "var(--color-border)" }}
                placeholder="voce@exemplo.com"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">Assunto</span>
            <input
              type="text"
              name="assunto"
              required
              disabled={sending}
              value={values.assunto}
              onChange={(e) => update("assunto", e.target.value)}
              className={fieldClass}
              style={{ borderColor: "var(--color-border)" }}
              placeholder="Sobre o que é a mensagem?"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground">Mensagem</span>
            <textarea
              name="mensagem"
              rows={3}
              required
              disabled={sending}
              value={values.mensagem}
              onChange={(e) => update("mensagem", e.target.value)}
              className={cn(fieldClass, "resize-y")}
              style={{ borderColor: "var(--color-border)" }}
              placeholder="Conte um pouco mais sobre o que você gostaria de tratar."
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              Respondemos em até 3 dias úteis.
            </p>
            <button
              type="submit"
              disabled={sending}
              className={cn(
                "glass inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2",
                "text-sm font-semibold text-foreground",
                "transition-all duration-200",
                "hover:scale-[1.005] disabled:cursor-not-allowed disabled:opacity-60",
              )}
              style={{ background: "var(--color-accent-light)" }}
            >
              <Send size={16} aria-hidden />
              {sending ? "Enviando..." : "Enviar mensagem"}
            </button>
          </div>

          {status === "success" && (
            <p
              role="status"
              className="rounded-lg px-4 py-3 text-sm"
              style={{
                background: "var(--color-accent-ultra)",
                color: "var(--color-accent)",
                border: "1px solid var(--color-accent-light)",
              }}
            >
              Mensagem enviada com sucesso. Em breve entraremos em contato.
            </p>
          )}
          {status === "error" && errorMessage && (
            <p
              role="alert"
              className="rounded-lg border px-4 py-3 text-sm"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                color: "#fca5a5",
              }}
            >
              {errorMessage}
            </p>
          )}
        </form>
    </GlassCard>
  );
}
