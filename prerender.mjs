/**
 * prerender.mjs
 * Runs after `vite build`. Renders the React app to static HTML
 * and injects it into dist/index.html so crawlers and LLMs see
 * real content instead of <div id="root"></div>.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
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

    // Auto-update date stamps only for files with actual content changes.
    // Uses git to detect which source files changed vs last commit,
    // ignoring date-only diffs so we don't bump dates for no reason.
    const today = new Date().toISOString().slice(0, 10);
    const todayLong = new Date().toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });

    // Strip date patterns from content so we can compare substantive changes only
    const DATE_NOISE = [
      /# Last Updated: .+/g,
      /Last Updated: [A-Z][a-z]+ \d{1,2}, \d{4}\./g,
      /"dateModified":\s*"\d{4}-\d{2}-\d{2}T00:00:00Z"/g,
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      /<lastBuildDate>.+<\/lastBuildDate>/g,
    ];
    function stripDates(text) {
      return DATE_NOISE.reduce((t, re) => t.replace(re, ""), text);
    }

    // Get the last-committed version of a source file (returns "" if new/missing)
    function gitShow(relPath) {
      try {
        return execSync(`git show HEAD:${relPath}`, { encoding: "utf-8", cwd: __dirname });
      } catch {
        return "";
      }
    }

    // Check if a source file has substantive (non-date) changes vs last commit
    function hasContentChanged(sourcePath) {
      const relPath = path.relative(__dirname, sourcePath);
      const current = stripDates(fs.readFileSync(sourcePath, "utf-8"));
      const committed = stripDates(gitShow(relPath));
      return current !== committed;
    }

    // Map: source file → which dist files get their dates bumped
    const dateTargets = [
      {
        source: path.join(__dirname, "index.html"),
        update: () => {
          indexHtml = fs.readFileSync(indexHtmlPath, "utf-8");
          indexHtml = indexHtml.replace(
            /"dateModified":\s*"\d{4}-\d{2}-\d{2}T00:00:00Z"/g,
            `"dateModified": "${today}T00:00:00Z"`
          );
          fs.writeFileSync(indexHtmlPath, indexHtml);
          // sitemap tracks the page, so bump it when index.html changes
          const sitemapPath = path.join(distPath, "sitemap.xml");
          if (fs.existsSync(sitemapPath)) {
            let sitemap = fs.readFileSync(sitemapPath, "utf-8");
            sitemap = sitemap.replace(
              /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
              `<lastmod>${today}</lastmod>`
            );
            fs.writeFileSync(sitemapPath, sitemap);
          }
        },
      },
      ...["llms.txt", "llms-full.txt", "robots.txt"].map((file) => ({
        source: path.join(__dirname, "public", file),
        update: () => {
          const filePath = path.join(distPath, file);
          if (!fs.existsSync(filePath)) return;
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
        },
      })),
      {
        source: path.join(__dirname, "public", "feed.xml"),
        update: () => {
          const feedPath = path.join(distPath, "feed.xml");
          if (!fs.existsSync(feedPath)) return;
          let feed = fs.readFileSync(feedPath, "utf-8");
          feed = feed.replace(
            /<lastBuildDate>.+<\/lastBuildDate>/,
            `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`
          );
          fs.writeFileSync(feedPath, feed);
        },
      },
    ];

    const updated = [];
    for (const { source, update } of dateTargets) {
      if (hasContentChanged(source)) {
        update();
        updated.push(path.basename(source));
      }
    }
    if (updated.length > 0) {
      console.log(`Date stamps updated for changed files: ${updated.join(", ")}.`);
    } else {
      console.log("No content changes detected — date stamps unchanged.");
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
