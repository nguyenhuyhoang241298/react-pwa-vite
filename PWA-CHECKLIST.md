# PWA Checklist — pwa-test

> Cập nhật: **18/05/2026**
> Stack: React 19 + Vite 8 + vite-plugin-pwa 1.3 + Workbox 7.4

---

## Trạng thái tổng quan

| Hạng mục | Trạng thái |
|---|---|
| Service Worker (Workbox) | ✅ Hoàn thành |
| Web App Manifest | ✅ Hoàn thành (chờ icon files) |
| Offline fallback page | ✅ Hoàn thành |
| Update notification | ✅ Hoàn thành |
| Install prompt | ✅ Hoàn thành |
| Offline/Online banner | ✅ Hoàn thành |
| PWA meta tags (HTML) | ✅ Hoàn thành |
| **Icon PNG files** | ❌ **Bạn phải tạo** |
| **HTTPS production** | ❌ **Bạn phải cấu hình** |

---

## ✅ Đã hoàn thành (Kiro)

### vite.config.ts
- `registerType: 'prompt'` — hiện prompt thay vì tự update ngầm
- Manifest đầy đủ: `name`, `short_name`, `description`, `start_url`, `display`, `icons`
- `navigateFallback: 'index.html'` — SPA routing offline
- `runtimeCaching` cho images (CacheFirst, 30 ngày)

### index.html
- `<meta name="theme-color">` — màu thanh trình duyệt
- `<link rel="manifest">` — link tới manifest
- Apple PWA meta tags — hỗ trợ iOS Add to Home Screen
- `<link rel="apple-touch-icon">` — icon cho iOS

### src/components/PwaPrompts.tsx
- `UpdatePrompt` — banner "New version available" với nút Update
- `InstallPrompt` — banner "Install this app" với nút Install
- `OfflineBanner` — banner đỏ khi mất mạng

### src/hooks/usePwa.ts
- Detect SW update qua `updatefound` + `statechange`
- `SKIP_WAITING` message để kích hoạt SW mới
- `beforeinstallprompt` capture và trigger install
- Reload tự động khi SW mới take control

### public/offline.html
- Trang fallback khi offline và route chưa cache

---

## ❌ Bạn phải tự làm

### 1. Tạo icon PNG — BLOCKER để installable

Chrome yêu cầu icon PNG 192px và 512px. Không có icon → không có install prompt.

Tạo các file sau và đặt vào `public/icons/`:

| File | Kích thước | Bắt buộc |
|---|---|---|
| `icon-192.png` | 192×192 | ✅ Bắt buộc |
| `icon-512.png` | 512×512 | ✅ Bắt buộc |
| `icon-512-maskable.png` | 512×512 | ✅ Bắt buộc (Android adaptive) |
| `apple-touch-icon.png` | 180×180 | ✅ Bắt buộc (iOS) |

**Cách nhanh nhất:** Upload `public/favicon.svg` lên [realfavicongenerator.net](https://realfavicongenerator.net) → download → đặt vào `public/icons/`.

Sau khi có icon, chạy lại:
```bash
pnpm build
```

### 2. HTTPS khi deploy production

Service Worker không hoạt động trên HTTP (chỉ localhost được miễn).

Các lựa chọn hosting có HTTPS miễn phí:
- **Vercel**: `vercel deploy`
- **Netlify**: drag & drop thư mục `dist/`
- **Cloudflare Pages**: connect GitHub repo

### 3. Tùy chỉnh nội dung app (tùy chọn)

Hiện tại manifest dùng tên mặc định. Sửa trong `vite.config.ts` nếu cần:
- `name`: tên đầy đủ hiển thị khi install
- `short_name`: tên ngắn dưới icon (≤12 ký tự)
- `description`: mô tả app
- `theme_color`: màu brand

---

## Kiểm tra sau khi có icon

```bash
pnpm build
pnpm preview
# Mở http://localhost:4173 trong Chrome
# DevTools → Application → Manifest → kiểm tra icons
# DevTools → Application → Service Workers → kiểm tra SW registered
```

Chạy Lighthouse audit:
```bash
npx lighthouse http://localhost:4173 --view
```

Mục tiêu: PWA badge xanh, Installable: pass, Offline: pass.
