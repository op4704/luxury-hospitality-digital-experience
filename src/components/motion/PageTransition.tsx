"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/layout/Providers";
import { EASE } from "@/lib/utils";

/**
 * Curtain transition: on route change a forest-dark panel covers the
 * screen and sweeps up, revealing the new page. Nothing animates on the
 * very first load, so server HTML is visible immediately (good LCP).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const lenis = useLenis();
  const [firstPath] = useState(path);
  const isFirst = path === firstPath;

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [path, lenis]);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={path}
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-forest-deep"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.95, ease: EASE, delay: 0.1 } }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          aria-hidden="true"
        />
      </AnimatePresence>
      <motion.div
        key={path + "-page"}
        initial={isFirst ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.3 } }}
      >
        {children}
      </motion.div>
    </>
  );
}
