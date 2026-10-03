"use client";

/**
 * next/image loader. Unsplash is served by imgix, so we ask its CDN for
 * the exact width/quality/format instead of pulling multi-megabyte
 * originals through the Next.js optimizer. Local images pass through.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const base = src.split("?")[0];
    // large hero renders tolerate stronger compression under the grain overlay
    const q = quality ?? (width >= 1440 ? 55 : 65);
    return `${base}?w=${width}&q=${q}&auto=format&fit=crop`;
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
