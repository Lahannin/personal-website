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

    // Auto-update all date stamps to current build date
    const today = new Date().toISOString().slice(0, 10);
    const todayLong = new Date().toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });

    // sitemap.xml: <lastmod>
    const sitemapPath = path.join(distPath, "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      let sitemap = fs.readFileSync(sitemapPath, "utf-8");
      sitemap = sitemap.replace(
        /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
        `<lastmod>${today}</lastmod>`
      );
      fs.writeFileSync(sitemapPath, sitemap);
    }

    // index.html: dateModified in JSON-LD
    indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
    indexHtml = indexHtml.replace(
      /"dateModified":\s*"\d{4}-\d{2}-\d{2}T00:00:00Z"/g,
      `"dateModified": "${today}T00:00:00Z"`
    );
    fs.writeFileSync(indexHtmlPath, indexHtml);

    // llms.txt, llms-full.txt, robots.txt: "Last Updated:" lines
    for (const file of ["llms.txt", "llms-full.txt", "robots.txt"]) {
      const filePath = path.join(distPath, file);
      if (!fs.existsSync(filePath)) continue;
      let content = fs.readFileSync(filePath, "utf-8");
      content = content.replace(
        /# Last Updated: .+/g,
        `# Last Updated: ${todayLong} (${today})`
      );
      content = content.replace(
        /Last Updated: [A-Z][a-z]+ \d{1,2}, \d{4}\./g,
        `Last Updated: ${todayLong}.`
      );
      fs.writeFileSync(filePath, content);
    }

    // feed.xml: <lastBuildDate>
    const feedPath = path.join(distPath, "feed.xml");
    if (fs.existsSync(feedPath)) {
      let feed = fs.readFileSync(feedPath, "utf-8");
      feed = feed.replace(
        /<lastBuildDate>.+<\/lastBuildDate>/,
        `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`
      );
      fs.writeFileSync(feedPath, feed);
    }

    console.log(`All date stamps updated to ${today}.`);

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
