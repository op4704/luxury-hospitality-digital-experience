"use client";

import { motion } from "motion/react";
import { EASE, cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

/**
 * Splits text into words, each sliding up out of an overflow-hidden mask.
 * `trigger="mount"` plays immediately (hero); default plays when in view.
 */
export function RevealText({
  text,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "view" | "mount";
}) {
  const Comp = motion[as];
  const lines = text.split("\n");
  let wi = 0;
  const anim = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Comp className={className} initial="hidden" {...anim} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(" ").map((word, i, arr) => {
            const idx = wi++;
            return (
              <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "105%" },
                    show: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + idx * stagger } },
                  }}
                >
                  {word}
                  {i < arr.length - 1 ? "\u00A0" : ""}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Comp>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 32,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "p" | "li" | "section";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/**
 * Clip-path wipe reveal for images. The in-view observer sits on an
 * unclipped outer wrapper — a target that is itself fully clipped never
 * reports as intersecting in Chromium, so the reveal would never fire.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const start = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" }[from];
  const positioned = /\b(absolute|fixed|sticky)\b/.test(className ?? "");
  return (
    <motion.div
      className={cn(!positioned && "relative", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit]"
        variants={{
          hidden: { clipPath: start },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.2, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
