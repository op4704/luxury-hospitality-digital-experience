"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "gold";

const styles: Record<Variant, string> = {
  solid: "bg-ivory text-bg hover:bg-gold",
  gold: "bg-gold text-bg hover:bg-ivory",
  outline: "border border-current hover:bg-ivory hover:text-bg hover:border-ivory",
  ghost: "border-b border-current/40 hover:border-current rounded-none px-0! py-2!",
};

const base =
  "group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-expo disabled:opacity-40 disabled:pointer-events-none";

export function Button({
  href,
  variant = "solid",
  className,
  children,
  arrow = true,
  cursor,
  ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  cursor?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className="transition-transform duration-500 ease-expo group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );
  if (href)
    return (
      <Link href={href} className={cn(base, styles[variant], className)} data-cursor={cursor}>
        {inner}
      </Link>
    );
  return (
    <button className={cn(base, styles[variant], className)} data-cursor={cursor} {...rest}>
      {inner}
    </button>
  );
}
