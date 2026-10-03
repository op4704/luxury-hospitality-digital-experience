import { cn } from "@/lib/utils";

/** Floating glass surface — only for UI over photography. */
export function GlassCard({
  children,
  className,
  strong,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  as?: "div" | "aside" | "section" | "nav" | "form";
}) {
  return <Comp className={cn("glass rounded-[24px]", strong && "glass-strong", className)}>{children}</Comp>;
}
