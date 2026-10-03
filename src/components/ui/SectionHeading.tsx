import { RevealText, FadeUp } from "@/components/motion/RevealText";
import { cn } from "@/lib/utils";

/** Numbered editorial heading: "01 — Stay" eyebrow + split serif title. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  italic,
  intro,
  tone = "dark",
  className,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
  align?: "left" | "center";
}) {
  const accent = tone === "dark" ? "text-gold" : "text-gold-deep";
  const muted = tone === "dark" ? "text-muted" : "text-muted-ink";
  return (
    <div className={cn(align === "center" && "text-center mx-auto", className)}>
      <FadeUp>
        <p className={cn("eyebrow mb-6 flex items-center gap-3", align === "center" && "justify-center", accent)}>
          {index && <span className="num">{index}</span>}
          {index && <span className="inline-block w-8 h-px bg-current opacity-60" />}
          <span>{eyebrow}</span>
        </p>
      </FadeUp>
      <h2 className="font-display text-h2">
        <RevealText text={title} className="block" />
        {italic && <RevealText text={italic} className={cn("block italic font-light", muted)} delay={0.1} />}
      </h2>
      {intro && (
        <FadeUp delay={0.2} className={cn("mt-8 max-w-md leading-relaxed", muted, align === "center" && "mx-auto")}>
          <p>{intro}</p>
        </FadeUp>
      )}
    </div>
  );
}
