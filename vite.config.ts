import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
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

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(), 
    copy404Plugin()
  ].filter(Boolean),
  build: {
    // 1. Inlines small CSS files directly into HTML (removes a network request)
    assetsInlineLimit: 14336, // 14kb - covers your 13.3kb CSS file
    
    // 2. Optimization: Ensure the polyfill chunk doesn't create its own chain
    modulePreload: {
      polyfill: true,
    },
    
    rollupOptions: {
      output: {
        // 3. Keep chunks consistent to help Cloudflare caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
