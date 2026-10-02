import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 pt-20 md:pt-28 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 pb-16 md:pb-24 border-b border-cream/15">
          <div className="md:col-span-5">
            <p className="font-display text-3xl md:text-4xl leading-tight mb-6">
              Alondra Cay
            </p>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              A private island resort off the Amalfi coast — eleven suites,
              one tide, and the quiet you came for.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[11px] uppercase tracking-[0.14em] text-cream/40 mb-5">
              Explore
            </p>
            <ul className="space-y-3 text-sm">
              {[
                ["Rooms", "/rooms"],
                ["Experiences", "/experiences"],
                ["Property Explorer", "/property-explorer"],
                ["Concierge", "/concierge"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-cream/70 hover:text-cream transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-cream/40 mb-5">
              Reach the island
            </p>
            <ul className="space-y-3 text-sm text-cream/70">
              <li>concierge@alondracay.com</li>
              <li>+39 089 555 0142</li>
              <li>Positano, Italy</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between gap-4 text-[11px] uppercase tracking-[0.1em] text-cream/40">
          <p>&copy; {new Date().getFullYear()} Alondra Cay. All rights reserved.</p>
          <p>A Silvion Technologies digital experience</p>
        </div>
      </div>
    </footer>
  );
}
