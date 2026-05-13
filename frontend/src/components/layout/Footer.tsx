export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--color-border)] py-10 text-sm text-[var(--color-muted)]"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="font-mono uppercase tracking-[0.12em]">
          © {new Date().getFullYear()} InsperAI
        </p>
        <p className="text-xs">
          Construído por estudantes do Insper — para a comunidade.
        </p>
      </div>
    </footer>
  );
}
