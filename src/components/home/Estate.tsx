"use client";

import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Counter } from "@/components/motion/Counter";
import { FadeUp, RevealText } from "@/components/motion/RevealText";
import { Button } from "@/components/ui/Button";
import { PHOTOS } from "@/data/photos";
import { ESTATE } from "@/data/estate";

/** Ivory editorial spread; three images drift at different speeds. */
export function Estate() {
  return (
    <section id="estate" className="relative bg-ivory text-bg section-y overflow-hidden">
      <div className="container-x grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-6">
        <div className="md:col-span-5 md:pt-[8vh]">
          <FadeUp>
            <p className="eyebrow text-gold-deep mb-8 flex items-center gap-3">
              <span className="num">02</span>
              <span className="inline-block h-px w-8 bg-current opacity-60" />
              The Estate
            </p>
          </FadeUp>
          <h2 className="font-display text-h2">
            <RevealText text="Ninety-two years" className="block" />
            <RevealText text="of one family," className="block" delay={0.08} />
            <RevealText text="one forest." className="block italic font-light text-muted-ink" delay={0.16} />
          </h2>
          <FadeUp delay={0.2} className="mt-10 max-w-md space-y-5 text-[1.02rem] leading-relaxed text-muted-ink">
            <p>
              Aranya began in 1934 as a cardamom plantation on the edge of the shola forest. Four generations later,
              the Varghese family still lives on the estate — and most of the forest has been left exactly as it was.
            </p>
            <p>
              Eighteen villas sit along the contour of the ridge, built in laterite and reclaimed teak by craftsmen from
              the valley below. Nothing is taller than the trees.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-14 grid grid-cols-3 gap-6 border-t border-[var(--line-light)] pt-8">
            {ESTATE.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[clamp(2.6rem,4.4vw,4.4rem)] leading-none">
                  <Counter to={s.value} />
                </p>
                <p className="mt-3 text-[0.72rem] uppercase tracking-[0.14em] text-muted-ink">{s.label}</p>
              </div>
            ))}
          </FadeUp>

          <FadeUp delay={0.4} className="mt-12">
            <Button href="/explore" variant="outline" cursor="Explore" className="text-bg hover:text-bg">
              Walk the estate in 3D
            </Button>
          </FadeUp>
        </div>

        <div className="relative md:col-span-6 md:col-start-7 h-[120vw] md:h-[118vh]">
          <ParallaxImage photo={PHOTOS.mistValley} speed={6} sizes="(max-width:768px) 70vw, 32vw" className="absolute right-0 top-0 w-[70%] aspect-[3/4] rounded-[18px]" />
          <ParallaxImage photo={PHOTOS.villaForest} speed={18} sizes="(max-width:768px) 55vw, 24vw" className="absolute left-0 top-[38%] w-[52%] aspect-[4/5] rounded-[18px] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.45)]" />
          <ParallaxImage photo={PHOTOS.tea} speed={10} sizes="(max-width:768px) 40vw, 18vw" className="absolute right-[6%] bottom-0 w-[38%] aspect-square rounded-[18px]" />
          <FadeUp delay={0.5} className="absolute left-0 top-[4%] hidden md:block w-[26%] pr-4">
            <p className="font-display italic text-[1.3rem] leading-snug text-muted-ink">
              “We planted nothing new. We just stopped cutting.”
            </p>
            <p className="eyebrow mt-3 text-[0.62rem] text-gold-deep">— Thomas Varghese, 1971</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
