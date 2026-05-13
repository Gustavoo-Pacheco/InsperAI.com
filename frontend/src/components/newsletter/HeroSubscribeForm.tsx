"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Info, AlertCircle } from "lucide-react";
import { ApiError, subscribeNewsletter } from "@/lib/api";
import { SETOR_LABEL } from "@/lib/newsletter";
import { cn } from "@/lib/utils";
import { useNewsletterHome } from "./NewsletterHomeShell";

type Status = "idle" | "sending" | "success" | "duplicate" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESET_MS = 6000;

export default function HeroSubscribeForm() {
  const { selectedSetor } = useNewsletterHome();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const emailValid = EMAIL_RE.test(email.trim());
  const canSubmit = selectedSetor !== null && emailValid && status !== "sending";
  const isFinished = status === "success" || status === "duplicate";
  const awaitingEmail = selectedSetor !== null && !emailValid && !isFinished && status !== "sending";

  function scheduleReset() {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      setEmail("");
    }, RESET_MS);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit || !selectedSetor) return;

    setStatus("sending");
    setErrorMessage("");
    try {
      await subscribeNewsletter({ email: email.trim(), setor: selectedSetor });
      setStatus("success");
      scheduleReset();
    } catch (err) {
      if (
        err instanceof ApiError &&
        err.status === 400 &&
        err.body &&
        typeof err.body === "object" &&
        (err.body as { detail?: string }).detail === "already_subscribed"
      ) {
        setStatus("duplicate");
        scheduleReset();
        return;
      }
      setStatus("error");
      setErrorMessage("Não foi possível concluir agora. Tente novamente.");
    }
  }

  const helper = (() => {
    if (status === "success" && selectedSetor) {
      return {
        kind: "success" as const,
        icon: Check,
        text: `Inscrição confirmada em ${SETOR_LABEL[selectedSetor]}. Você receberá a próxima edição por email.`,
      };
    }
    if (status === "duplicate" && selectedSetor) {
      return {
        kind: "info" as const,
        icon: Info,
        text: `Você já está inscrito em ${SETOR_LABEL[selectedSetor]}.`,
      };
    }
    if (status === "error") {
      return {
        kind: "error" as const,
        icon: AlertCircle,
        text: errorMessage || "Erro inesperado.",
      };
    }
    if (selectedSetor === null) {
      return {
        kind: "warn" as const,
        icon: AlertCircle,
        text: "Escolha um setor para receber a newsletter",
      };
    }
    if (!emailValid) {
      return {
        kind: "muted" as const,
        icon: null,
        text: "Digite seu email para assinar",
      };
    }
    return {
      kind: "success" as const,
      icon: Check,
      text: `Você receberá a edição de ${SETOR_LABEL[selectedSetor]}`,
    };
  })();

  const helperColor =
    helper.kind === "success" || helper.kind === "info"
      ? "var(--color-accent)"
      : helper.kind === "error"
        ? "#fca5a5"
        : helper.kind === "warn"
          ? "#fbbf24"
          : "var(--color-muted)";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="mx-auto mt-8 flex w-full max-w-[520px] flex-col gap-3"
      aria-label="Assinar a newsletter"
    >
      <div
        className="glass flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center sm:gap-2"
        style={{ borderColor: "var(--color-border)" }}
      >
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          disabled={status === "sending" || isFinished}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className={cn(
            "min-w-0 flex-1 rounded-lg bg-transparent px-4 py-2.5",
            "text-sm placeholder:text-muted focus:outline-none",
            "disabled:opacity-60",
          )}
          style={{ color: "var(--color-foreground)" }}
        />
        <button
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5",
            "text-sm font-semibold transition-all duration-200",
            "disabled:cursor-not-allowed",
            !canSubmit && !awaitingEmail && "disabled:opacity-40",
            awaitingEmail && "animate-pulse ring-2 ring-offset-2",
            "enabled:hover:scale-[1.02]",
          )}
          style={{
            background:
              canSubmit || awaitingEmail
                ? "var(--color-accent)"
                : "var(--color-accent-light)",
            color: canSubmit || awaitingEmail ? "#ffffff" : "var(--color-foreground)",
            ...(awaitingEmail
              ? ({
                  "--tw-ring-color": "var(--color-accent-light)",
                  "--tw-ring-offset-color": "transparent",
                } as React.CSSProperties)
              : {}),
          }}
        >
          {status === "sending" ? (
            "Enviando..."
          ) : (
            <>
              Assinar
              <ArrowRight size={16} aria-hidden />
            </>
          )}
        </button>
      </div>
      <p
        role={helper.kind === "error" ? "alert" : "status"}
        aria-live="polite"
        className="inline-flex items-center justify-center gap-1.5 text-xs"
        style={{ color: helperColor }}
      >
        {helper.icon ? <helper.icon size={14} aria-hidden /> : null}
        <span>{helper.text}</span>
      </p>
    </form>
  );
}
