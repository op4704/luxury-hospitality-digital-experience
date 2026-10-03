import { cn } from "@/lib/utils";

export function Marquee({ items, className, speed = 38 }: { items: string[]; className?: string; speed?: number }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className="font-display italic font-light px-8 md:px-12">{t}</span>
          <span className="block w-2 h-2 rotate-45 border border-gold" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div className="marquee-track" style={{ ["--marquee-speed" as string]: `${speed}s` }}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
