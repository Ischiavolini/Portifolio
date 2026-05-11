import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

export default defineConfig({
    plugins: [
          react(),
          tailwindcss(),
          jsxLocPlugin(),
          vitePluginManusRuntime(),
        ],
    resolve: {
          alias: {
                  "@": path.resolve(import.meta.dirname, "./client"),
                  "@shared": path.resolve(import.meta.dirname, "./shared"),
          },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
          outDir: path.resolve(import.meta.dirname, "dist/public"),
          emptyOutDir: true,
    },
});

