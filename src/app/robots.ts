import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/concierge/dashboard"] },
    sitemap: "https://aranya.estate/sitemap.xml",
  };
}
