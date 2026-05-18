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
      devOptions: {
        enabled: true,
      },
      includeAssets: ["icons/*.png", "screenshots/*.jpg"],
      manifest: {
        name: "SkyGo",
        short_name: "PWATest",
        description: "A Progressive Web App built with React and Vite",
        start_url: "/?source=pwa",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#42b883",
        lang: "en",
        icons: [
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "screenshots/apple-splash-1334-750.jpg",
            sizes: "1334x750",
            type: "image/jpeg",
            form_factor: "wide",
            label: "PWA Test App — Desktop",
          },
          {
            src: "screenshots/apple-splash-750-1334.jpg",
            sizes: "750x1334",
            type: "image/jpeg",
            form_factor: "narrow",
            label: "PWA Test App — Mobile",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg}"],
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
