"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { PHOTOS } from "@/data/photos";
import { MARQUEE } from "@/data/estate";

/** Oversized closing line that grows into place, a magnetic seal, and a marquee. */
export function BeginCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 0.8], ["30%", "0%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const spread = useTransform(scrollYProgress, [0.2, 0.8], ["-0.06em", "-0.035em"]);

  return (
    <section id="begin" ref={ref} className="relative overflow-hidden bg-bg">
      <div className="relative min-h-[100svh] flex flex-col justify-center">
        <motion.div className="absolute inset-[-12%_0_0_0]" style={{ y: imgY }} aria-hidden="true">
          <Image src={PHOTOS.lakeDusk.src} alt="" fill sizes="100vw" className="object-cover opacity-45" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg" />

        <div className="relative container-x py-32 text-center">
          <p className="eyebrow text-gold mb-10 flex items-center justify-center gap-3">
            <span className="num">07</span>
            <span className="inline-block h-px w-8 bg-current opacity-60" />
            Reserve
          </p>
          <motion.h2
            className="font-display text-[clamp(4rem,15vw,17rem)] leading-[0.86] origin-bottom"
            style={{ scale, y, letterSpacing: spread }}
          >
            Begin <span className="italic font-light">your</span>
            <br />
            stay.
          </motion.h2>

          <div className="mt-14 flex flex-col items-center gap-6">
            <MagneticButton strength={0.4}>
              <Link
                href="/booking"
                data-cursor="Book"
                className="grid h-36 w-36 md:h-44 md:w-44 place-items-center rounded-full bg-gold text-bg transition-colors duration-500 hover:bg-ivory"
              >
                <span className="eyebrow text-[0.68rem] text-center leading-relaxed">
                  Check
                  <br />
                  availability
                </span>
              </Link>
            </MagneticButton>
            <p className="text-sm text-muted">Best rate guaranteed · Free cancellation up to 21 days</p>
          </div>
        </div>
      </div>

      <div className="border-y border-[var(--line-dark)] py-7 text-[clamp(1.8rem,3.6vw,3.4rem)] text-ivory/85">
        <Marquee items={MARQUEE} />
      </div>
    </section>
  );
}
