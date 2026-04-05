/**
 * prerender.mjs
 * Runs after `vite build`. Renders the React app to static HTML
 * and injects it into dist/index.html so crawlers and LLMs see
 * real content instead of <div id="root"></div>.
 *
 * Now handles multiple routes: /, /articles, and /articles/:slug.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "dist");
const indexHtmlPath = path.join(distPath, "index.html");

async function prerender() {
  const vite = await createServer({
    root: __dirname,
    server: { middlewareMode: true },
    appType: "custom",
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
  });

  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    const { getAllSlugs, getArticleBySlug } = await vite.ssrLoadModule(
      "/src/data/articles.ts"
    );

    const slugs = getAllSlugs();
    const routes = [
      { url: "/", outFile: "index.html" },
      { url: "/articles", outFile: "articles/index.html", title: "Articles | Lauri Hänninen (Hanninen)", description: "Professional articles by Lauri Hänninen (Lauri Hanninen) on product marketing, analytics as code, headless BI, and data architecture." },
      ...slugs.map((slug) => {
        const article = getArticleBySlug(slug);
        return {
          url: `/articles/${slug}`,
          outFile: `articles/${slug}/index.html`,
          title: article ? `${article.title} | Lauri Hänninen (Hanninen)` : undefined,
          description: article?.description,
          jsonLd: article
            ? JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: article.title,
                description: article.description,
                datePublished: article.date,
                author: {
                  "@type": "Person",
                  "@id": "https://laurihanninen.com/#person",
                  name: "Lauri Hänninen",
                  alternateName: ["Lauri Hanninen", "Lauri Haenninen"],
                  url: "https://laurihanninen.com",
                },
                publisher: { "@type": "Organization", name: article.publication },
                url: `https://laurihanninen.com/articles/${slug}`,
                mainEntityOfPage: `https://laurihanninen.com/articles/${slug}`,
              })
            : undefined,
        };
      }),
    ];

    const baseHtml = fs.readFileSync(indexHtmlPath, "utf-8");

    for (const route of routes) {
      console.log(`Prerendering ${route.url}...`);
      const appHtml = render(route.url);

      let html = baseHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Inject per-page title
      if (route.title) {
        html = html.replace(
          /<title>[^<]*<\/title>/,
          `<title>${route.title}</title>`
        );
      }

      // Inject per-page meta description
      if (route.description) {
        const descMeta = `<meta name="description" content="${route.description.replace(/"/g, "&quot;")}" />`;
        // Replace existing description or inject before </head>
        if (html.includes('name="description"')) {
          html = html.replace(
            /<meta\s+name="description"[^>]*\/?>/,
            descMeta
          );
        } else {
          html = html.replace("</head>", `    ${descMeta}\n  </head>`);
        }
      }

      // Update per-page canonical URL
      if (route.url !== "/") {
        const canonical = `<link rel="canonical" href="https://laurihanninen.com${route.url}" />`;
        if (html.includes('rel="canonical"')) {
          html = html.replace(/<link\s+rel="canonical"[^>]*\/>/, canonical);
        } else {
          html = html.replace("</head>", `    ${canonical}\n  </head>`);
        }
      }

      // Inject per-page JSON-LD for articles
      if (route.jsonLd) {
        html = html.replace(
          "</head>",
          `    <script type="application/ld+json">${route.jsonLd}</script>\n  </head>`
        );
      }

      const outPath = path.join(distPath, route.outFile);
      const outDir = path.dirname(outPath);
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outPath, html);
    }

    // Copy index.html → 404.html for SPA fallback
    fs.copyFileSync(indexHtmlPath, path.join(distPath, "404.html"));

    // Auto-update sitemap lastmod dates to current build date
    const sitemapPath = path.join(distPath, "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      const today = new Date().toISOString().slice(0, 10);
      let sitemap = fs.readFileSync(sitemapPath, "utf-8");
      sitemap = sitemap.replace(
        /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
        `<lastmod>${today}</lastmod>`
      );
      fs.writeFileSync(sitemapPath, sitemap);
      console.log(`Sitemap lastmod updated to ${today}.`);
    }

    console.log(
      `Prerender complete — ${routes.length} routes rendered. Crawlers will now see real HTML.`
    );
  } catch (err) {
    console.error("Prerender failed:", err.message);
    // Non-fatal: fall back to SPA
    process.exit(0);
  } finally {
    await vite.close();
  }
}

prerender();
