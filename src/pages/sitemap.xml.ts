import type { APIRoute } from "astro";

export const prerender = true;

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split("T")[0];
  const domain = "https://www.xpo-transgroup.com";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${domain}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${domain}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}/en" />
    <xhtml:link rel="alternate" hreflang="uz" href="${domain}/uz" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}" />
  </url>
  <url>
    <loc>${domain}/en</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${domain}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}/en" />
    <xhtml:link rel="alternate" hreflang="uz" href="${domain}/uz" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}" />
  </url>
  <url>
    <loc>${domain}/uz</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="${domain}" />
    <xhtml:link rel="alternate" hreflang="en" href="${domain}/en" />
    <xhtml:link rel="alternate" hreflang="uz" href="${domain}/uz" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${domain}" />
  </url>
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
