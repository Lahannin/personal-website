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
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        // --- DISABLE HASHING START ---
        // This ensures files are named index.js and index.css every time
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        // --- DISABLE HASHING END ---
        
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
