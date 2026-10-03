"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useUI } from "@/lib/store";
import type { Role } from "@/lib/types";
import { EASE, cn } from "@/lib/utils";

const ROLES: { role: Role; label: string; href: string }[] = [
  { role: "guest", label: "Guest", href: "/" },
  { role: "concierge", label: "Concierge", href: "/concierge/dashboard" },
  { role: "admin", label: "Admin", href: "/admin" },
];

/** Demo-only role switcher (no real auth). */
export function DevMenu() {
  const [open, setOpen] = useState(false);
  const { role, setRole } = useUI();
  const router = useRouter();

  return (
    <div className="fixed bottom-4 left-4 z-[60]">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="glass-ink mb-2 rounded-2xl p-2 w-48"
            role="menu"
            aria-label="Demo role"
          >
            <p className="eyebrow text-muted px-3 pt-2 pb-2 text-[0.6rem]">View as</p>
            {ROLES.map((r) => (
              <button
                key={r.role}
                role="menuitemradio"
                aria-checked={role === r.role}
                onClick={() => {
                  setRole(r.role);
                  setOpen(false);
                  router.push(r.href);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors",
                  role === r.role ? "bg-white/10 text-ivory" : "text-ivory/70 hover:bg-white/5"
                )}
              >
                {r.label}
                {role === r.role && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="glass-ink rounded-full px-4 py-2 eyebrow text-[0.6rem] text-ivory/80 hover:text-ivory"
      >
        Demo · {role}
      </button>
    </div>
  );
}
