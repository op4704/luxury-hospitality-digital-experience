"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TESTIMONIALS } from "@/data/estate";
import { EASE, cn } from "@/lib/utils";

/** One large serif quote at a time, crossfading word-by-word. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      id="voices"
      className="relative bg-bg section-y overflow-hidden"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Guest testimonials"
    >
      <div className="container-x">
        <p className="eyebrow text-gold flex items-center gap-3 mb-16">
          <span className="num">06</span>
          <span className="inline-block h-px w-8 bg-current opacity-60" />
          In their words
        </p>

        <div className="relative min-h-[clamp(20rem,38vw,30rem)]" aria-live="polite">
          <span aria-hidden="true" className="pointer-events-none absolute -left-2 -top-16 font-display text-[clamp(10rem,20vw,18rem)] leading-none text-gold/15">“</span>
          <AnimatePresence mode="wait">
            <motion.figure key={i} initial="hidden" animate="show" exit="exit" className="relative">
              <blockquote className="font-display text-[clamp(2.2rem,5.2vw,5.4rem)] leading-[1.04] tracking-[-0.02em] max-w-[17em]">
                {t.quote.split(" ").map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.06em]">
                    <motion.span
                      className="inline-block"
                      variants={{
                        hidden: { y: "100%", opacity: 0 },
                        show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE, delay: wi * 0.03 } },
                        exit: { y: "-30%", opacity: 0, transition: { duration: 0.45, ease: EASE, delay: wi * 0.01 } },
                      }}
                    >
                      {w}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </blockquote>
              <motion.figcaption
                className="mt-10 flex items-center gap-4"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5, duration: 0.8 } }, exit: { opacity: 0 } }}
              >
                <span className="inline-block h-px w-10 bg-gold" />
                <span>
                  <span className="block text-ivory">{t.name}, {t.from}</span>
                  <span className="eyebrow text-[0.62rem] text-muted">{t.stay}</span>
                </span>
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Show testimonial ${k + 1}`}
                aria-current={k === i}
                className="group relative h-8 w-10"
              >
                <span className={cn("absolute inset-x-0 top-1/2 h-px transition-colors duration-500", k === i ? "bg-gold" : "bg-ivory/25 group-hover:bg-ivory/60")} />
              </button>
            ))}
          </div>
          <span className="eyebrow num text-[0.62rem] text-muted">
            {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
