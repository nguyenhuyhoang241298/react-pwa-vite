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
        // Bật SW khi `vite dev` để test PWA. KHÔNG bao giờ deploy dev-dist.
        enabled: true,
        // Quan trọng: trỏ về index.html để dev SW không trả /offline.html
        // cho mọi navigation (đây là gốc rễ bug "luôn thấy offline" ở dev mode).
        navigateFallback: "index.html",
        type: "module",
      },
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
        // Precache toàn bộ build output. JS/CSS có hash trong tên file
        // → an toàn để cache "vĩnh viễn" cho đến khi build mới.
        // index.html có revision tự sinh → SW update sẽ cập nhật bản mới.
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webp,woff,woff2}",
        ],

        // Dọn precache phiên bản cũ khi SW activate. Cực kỳ quan trọng để
        // tránh stale cache giữa các lần deploy.
        cleanupOutdatedCaches: true,

        // SPA shell: navigation request KHÔNG match precache trực tiếp
        // (URL thường là `/`, `/flights`, ... không phải `/index.html`)
        // → workbox tự fallback về `index.html` đã precache.
        // KHÔNG BAO GIỜ trỏ về `offline.html` ở đây — đó là gốc rễ bug cũ.
        navigateFallback: "index.html",

        // Những path KHÔNG dùng SPA shell fallback:
        navigateFallbackDenylist: [
          /^\/api\//, // API requests phải đi thẳng ra mạng
          /^\/offline\.html$/, // request trực tiếp tới offline.html
          /\/[^/]+\.[^/]+$/, // bất cứ URL nào trông như file (có extension)
        ],

        runtimeCaching: [
          // Hình ảnh (cả từ /assets/, /pwa/, hay external CDN cùng origin)
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 ngày
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Web fonts (self-hosted)
          {
            urlPattern: ({ request }) => request.destination === "font",
            handler: "CacheFirst",
            options: {
              cacheName: "fonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 năm
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Google Fonts CSS (stylesheet) — nếu app có dùng
          {
            urlPattern: ({ url }) =>
              url.origin === "https://fonts.googleapis.com",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "google-fonts-stylesheets" },
          },
          // Google Fonts files
          {
            urlPattern: ({ url }) =>
              url.origin === "https://fonts.gstatic.com",
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
});
