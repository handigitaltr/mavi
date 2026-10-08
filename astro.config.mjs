// @ts-check
import { defineConfig } from 'astro/config';

// Canlı alan adı belirlendiğinde SITE_URL ortam değişkeniyle verin
// (ör. SITE_URL=https://www.alanadiniz.com npm run build).
// Canonical, Open Graph ve sitemap adresleri bu değerden üretilir.
const site = process.env.SITE_URL ?? 'https://www.example.com';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
