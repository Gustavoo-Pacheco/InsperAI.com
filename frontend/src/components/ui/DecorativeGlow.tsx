import { cn } from "@/lib/utils";

interface DecorativeGlowProps {
  className?: string;
  size?: number;
  opacity?: number;
}

export default function DecorativeGlow({
  className,
  size = 500,
  opacity = 0.2,
}: DecorativeGlowProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: "var(--color-accent)",
        filter: "blur(120px)",
        opacity,
        zIndex: 0,
      }}
    />
  );
}
