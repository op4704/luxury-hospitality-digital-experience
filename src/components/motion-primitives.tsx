"use client";

import { motion, Variants } from "motion/react";
import CountUp from "./CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 36,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealLine({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const variants: Variants = {
    hidden: { y: "100%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { duration: 1.0, delay: delay + i * 0.05, ease: EASE },
    }),
  };

  return (
    <Tag className={className}>
      <span className="reveal-mask">
        <motion.span
          className="inline-block"
          variants={variants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          {text}
        </motion.span>
      </span>
    </Tag>
  );
}

export function StaggerWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span className="reveal-mask align-top" key={i}>
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: delay + i * 0.04, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function ImageReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const hasOwnPosition = /\b(absolute|fixed|sticky)\b/.test(className);
  return (
    <div
      className={`${hasOwnPosition ? "" : "relative "}overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
  className = "",
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={className}>
      <CountUp to={value} suffix={suffix} />
    </span>
  );
}
