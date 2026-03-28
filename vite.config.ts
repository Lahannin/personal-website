import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

function copy404Plugin(): Plugin {
  return {
    name: "copy-404",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const index = path.join(dist, "index.html");
      const notFound = path.join(dist, "404.html");
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, notFound);
      }
    },
  };
}

/**
 * Inline the extracted CSS into the HTML to eliminate the render-blocking request.
 * Runs after Vite generates the dist — reads the CSS file, injects it as a <style>
 * tag, and converts the <link> to a lazy-loaded version.
 */
function inlineCSSPlugin(): Plugin {
  return {
    name: "inline-css",
    enforce: "post",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const indexPath = path.join(dist, "index.html");
      if (!fs.existsSync(indexPath)) return;

      let html = fs.readFileSync(indexPath, "utf-8");

      // Find all CSS link tags pointing to /assets/*.css
      const cssLinkRegex = /<link\s+rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*\/?>/g;
      let match;
      while ((match = cssLinkRegex.exec(html)) !== null) {
        const cssHref = match[1];
        const cssPath = path.join(dist, cssHref);
        if (fs.existsSync(cssPath)) {
          const cssContent = fs.readFileSync(cssPath, "utf-8");
          // Replace the link tag with an inline style tag
          html = html.replace(match[0], `<style>${cssContent}</style>`);
        }
      }

      fs.writeFileSync(indexPath, html);
      console.log("Inlined CSS into index.html — render-blocking request eliminated.");
    },
  };
}

export default defineConfig(() => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(),
    inlineCSSPlugin(),
    copy404Plugin(),
  ],
  build: {
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        // Merge tiny shared chunks (< 10KB) into their consumers to reduce HTTP requests.
        // Lucide icons, useScrollLock, BitcoinWord etc. were each generating a ~1KB chunk.
        experimentalMinChunkSize: 10000,
        manualChunks: {
          'framer': ['framer-motion'],
          'embla': ['embla-carousel-react'],
        },
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  ssr: {
    noExternal: ["framer-motion", "lucide-react", "embla-carousel-react"],
  },
}));
