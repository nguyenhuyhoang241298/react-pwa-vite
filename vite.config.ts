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
      includeAssets: ["pwa/*.png", "pwa/*.ico", "pwa/*.svg"],
      manifest: {
        name: "SkyGo",
        short_name: "SkyGo",
        description: "Fly to your dream",
        start_url: "/?source=pwa",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0a0f1e",
        lang: "en",
        icons: [
          {
            src: "pwa/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "pwa/apple-splash-landscape-1334x750.png",
            sizes: "1334x750",
            type: "image/png",
            form_factor: "wide",
            label: "SkyGo — Desktop",
          },
          {
            src: "pwa/apple-splash-portrait-750x1334.png",
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
