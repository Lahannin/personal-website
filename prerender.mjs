/**
 * prerender.mjs
 * Runs after `vite build`. Renders the React app to static HTML
 * and injects it into dist/index.html so crawlers and LLMs see
 * real content instead of <div id="root"></div>.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "dist");
const indexHtmlPath = path.join(distPath, "index.html");

async function prerender() {
  console.log("Prerendering /...");

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
    const html = render("/");

    let indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
    indexHtml = indexHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`
    );

    fs.writeFileSync(indexHtmlPath, indexHtml);
    fs.writeFileSync(path.join(distPath, "404.html"), indexHtml);

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

    console.log("Prerender complete — crawlers will now see real HTML.");
  } catch (err) {
    console.error("Prerender failed:", err.message);
    // Non-fatal: fall back to SPA
    process.exit(0);
  } finally {
    await vite.close();
  }
}

prerender();
