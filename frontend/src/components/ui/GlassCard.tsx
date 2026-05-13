import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export default function GlassCard({
  children,
  className,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass relative rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-px",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
