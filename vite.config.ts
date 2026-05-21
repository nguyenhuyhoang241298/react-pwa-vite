import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "prompt",
      pwaAssets: {
        config: "pwa-assets.config.ts",
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: ["icons/*.png", "icons/*.ico", "screenshots/*.png"],
      manifest: {
        name: "SkyGo",
        short_name: "SkyGo",
        description: "A Progressive Web App built with React and Vite",
        start_url: "/?source=pwa",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#42b883",
        lang: "en",
        icons: [
          {
            src: "icons/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshots/apple-splash-landscape-light-1334x750.png",
            sizes: "1334x750",
            type: "image/png",
            form_factor: "wide",
            label: "SkyGo — Desktop",
          },
          {
            src: "screenshots/apple-splash-portrait-light-750x1334.png",
            sizes: "750x1334",
            type: "image/png",
            form_factor: "narrow",
            label: "SkyGo — Mobile",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        navigateFallback: "index.html",
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
});
