"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

export function Counter({ to, duration = 2, className }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{to}</span>
      <span aria-hidden="true" className="num">
        {val}
      </span>
    </span>
  );
}
