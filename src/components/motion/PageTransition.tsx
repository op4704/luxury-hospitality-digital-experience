"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/layout/Providers";
import { EASE } from "@/lib/utils";

/** Detail routes morph their hero image via <ViewTransition>; the curtain would hide that. */
const isDetail = (p: string) => /^\/(rooms|experiences)\/[^/]+$/.test(p);

/**
 * Curtain transition: on route change a forest-dark panel covers the
 * screen and sweeps up, revealing the new page. Skipped on first load
 * (server HTML visible immediately) and on list → detail navigations,
 * where the shared-element morph carries the continuity instead.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const lenis = useLenis();
  // previous/current path pair, updated during render (React's "storing info from previous renders" pattern)
  const [paths, setPaths] = useState({ prev: path, curr: path, navigated: false });
  if (paths.curr !== path) setPaths({ prev: paths.curr, curr: path, navigated: true });
  const morph = isDetail(path) || isDetail(paths.prev);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [path, lenis]);

  const curtain = paths.navigated && !morph;

  return (
    <>
      <AnimatePresence initial={false}>
        {curtain && (
          <motion.div
            key={path}
            className="pointer-events-none fixed inset-0 z-[90] origin-top bg-forest-deep"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.95, ease: EASE, delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <motion.div
        key={path + "-page"}
        initial={curtain ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.3 } }}
      >
        {children}
      </motion.div>
    </>
  );
}
