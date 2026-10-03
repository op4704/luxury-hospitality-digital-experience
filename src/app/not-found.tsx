import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="eyebrow text-gold">404</p>
        <h1 className="mt-6 font-display text-display">
          This path leads <span className="italic font-light">into the forest.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-muted">The page you were looking for isn&apos;t on the estate map.</p>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-ivory px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.18em] text-bg hover:bg-gold transition-colors">
          Back to the lodge →
        </Link>
      </div>
    </main>
  );
}
