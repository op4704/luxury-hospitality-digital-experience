"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function onDown(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        dotRef.current?.style.setProperty("width", "28px");
        dotRef.current?.style.setProperty("height", "28px");
      }
    }
    function onUp() {
      dotRef.current?.style.setProperty("width", "10px");
      dotRef.current?.style.setProperty("height", "10px");
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onDown);
    window.addEventListener("mouseout", onUp);

    let raf: number;
    function tick() {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onDown);
      window.removeEventListener("mouseout", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return <div ref={dotRef} className="cursor-dot" />;
}
