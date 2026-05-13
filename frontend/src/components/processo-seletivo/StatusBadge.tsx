import Badge from "@/components/ui/Badge";
import type { ProcessoStatus } from "@/lib/types";

interface StatusBadgeProps {
  status: ProcessoStatus;
}

const STATUS_MAP: Record<
  ProcessoStatus,
  { label: string; variant: "success" | "danger" | "default" }
> = {
  aberto: { label: "Aberto", variant: "success" },
  fechado: { label: "Fechado", variant: "danger" },
  em_breve: { label: "Em breve", variant: "default" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, variant } = STATUS_MAP[status];
  return (
    <Badge variant={variant}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </Badge>
  );
}
