import type { MetadataRoute } from "next";
import { ROOMS } from "@/data/rooms";
import { EXPERIENCES } from "@/data/experiences";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aranya.estate";
  return [
    "",
    "/rooms",
    "/experiences",
    "/explore",
    "/concierge",
    "/booking",
    ...ROOMS.map((r) => `/rooms/${r.slug}`),
    ...EXPERIENCES.map((e) => `/experiences/${e.slug}`),
  ].map((p) => ({ url: base + p }));
}
