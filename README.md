# Markiva Baskı — Kurumsal Web Sitesi

Markiva Baskı için hazırlanmış, B2B teklif odaklı kurumsal tanıtım sitesi.
[Astro](https://astro.build) ile statik olarak üretilir; çalışma anında sunucu gerektirmez.

- Sayfa başına çok az JavaScript (yalnızca menü ve teklif formu)
- Görseller derleme sırasında AVIF/WebP ve duyarlı boyutlara dönüştürülür
- Yazı tipi (Manrope) sitenin kendi sunucusundan yüklenir; Google Fonts isteği yoktur

## Gereksinimler

- Node.js **22.12** veya üzeri

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm install` | Bağımlılıkları kurar |
| `npm run dev` | Geliştirme sunucusu: http://localhost:4321 |
| `npm run build` | Yayın çıktısını `dist/` klasörüne üretir |
| `npm run preview` | Üretilen `dist/` çıktısını yerelde sunar |
| `npm run check` | TypeScript ve Astro tür denetimi |
| `npm run brand:extract` | Logo dosyalarını marka kılavuzundan yeniden üretir (bkz. Logo) |

## Yayına almadan önce

Aşağıdaki bilgiler henüz verilmediği için sitede **yer tutucu** olarak duruyor.
Uydurma bilgi eklenmedi; yer tutucular bağlantı değil, düz metin olarak görünür.

- [ ] **Alan adı**: `SITE_URL` ortam değişkenini verin (ör. `SITE_URL=https://www.alanadiniz.com npm run build`).
      Canonical, Open Graph, `sitemap.xml` ve `robots.txt` bu değerden üretilir. Örnek: `.env.example`.
- [ ] **İletişim bilgileri**: `src/data/site.ts` → `contact` (telefon, e-posta, adres).
- [ ] **WhatsApp numarası**: `src/data/site.ts` → `contact.whatsapp` (ülke koduyla, boşluksuz: `905XXXXXXXXX`).
      Numara girilene kadar WhatsApp butonları teklif formuna yönlendirir.
- [ ] **Teklif formu gönderim adresi**: `src/data/site.ts` → `quoteForm.endpoint` (bkz. Teklif formu).
- [ ] **Uygulama fotoğrafları**: `src/assets/images/uygulamalar/` altındaki temsili görselleri gerçek iş fotoğraflarıyla değiştirin.
- [ ] **Referans logoları**: Müşteri onayı alınan logolar `src/components/ReferencesSection.astro` içine eklenmeli.
- [ ] **Vektör logo**: Orijinal SVG/AI/PDF logo dosyaları geldiğinde `src/assets/brand/` altındakilerle değiştirin.
- [ ] **KVKK**: Teklif formu kişisel veri topladığı için bir KVKK aydınlatma metni hazırlanıp forma bağlanmalıdır.
- [ ] **Ürün bilgileri**: `src/data/products.ts` içindeki açıklamaları gerçek ürün özellikleriyle kontrol edin.

## İçerik nereden düzenlenir?

Metinlerin ve listelerin tamamı `src/data/` altındadır; bileşenlere dokunmadan güncellenebilir.

| Dosya | İçerik |
| --- | --- |
| `site.ts` | Site adı, başlık/açıklama (SEO), iletişim, WhatsApp, form adresi, menü |
| `categories.ts` | Ürün kategorileri ve görselleri |
| `products.ts` | Öne çıkan ürünler (kod, ad, açıklama, görsel) |
| `process.ts` | "Nasıl çalışıyoruz" adımları |
| `techniques.ts` | Baskı teknikleri |
| `portfolio.ts` | Uygulamalar galerisi |
| `about.ts` | Hakkımızda yaklaşım maddeleri |
| `quote.ts` | Teklif formundaki ürün ve adet seçenekleri |

Yeni bir kategori veya ürün eklediğinizde teklif formundaki "İlgilendiğiniz Ürün" listesi otomatik güncellenir.
Kart üzerindeki "Teklif iste / Teklif Al" bağlantıları formu ilgili ürünle önceden doldurur.

## Teklif formu

Form, `quoteForm.endpoint` adresine **JSON** olarak `POST` edilir:

```json
{
  "name": "Ad Soyad",
  "company": "Firma",
  "phone": "0532 000 00 00",
  "email": "ad@firma.com",
  "interest": "Kurumsal Kupa (MB-204)",
  "quantity": "500 – 1.000 adet",
  "message": "…",
  "page": "https://…",
  "submittedAt": "2026-01-01T10:00:00.000Z"
}
```

- 2xx yanıtında kullanıcıya teşekkür mesajı gösterilir ve form temizlenir; diğer durumlarda hata mesajı gösterilir.
- Adres boş bırakılırsa form **gönderilmez**; kullanıcıya iletişim bilgilerine yönlendiren bir not gösterilir
  (sahte "başarılı" mesajı verilmez).
- JSON kabul eden herhangi bir servis kullanılabilir: kendi API'niz, Formspree, Basin, Getform vb.
  Farklı bir alan adındaysa servisin CORS izni vermesi gerekir.
- Görünmeyen bir bot tuzağı alanı (`website`) spam'i azaltır; bu alan sunucuya gönderilmez.

Mantık: `src/scripts/quote-form.ts` · Arayüz: `src/components/QuoteForm.astro`

## Logo

Orijinal vektör logo henüz bulunmadığından logo dosyaları `brand/markiva-brand-sheet.jpg` marka kılavuzundan
**yeniden çizilmeden**, piksel verisi korunarak çıkarıldı (`scripts/extract-logo.mjs`):

- `logo-horizontal.png` / `logo-horizontal-light.png`: Navbar ve footer. Kılavuzdaki resmi yatay varyasyonun
  oranları ölçülerek ana logonun yüksek çözünürlüklü parçalarından birleştirildi.
- `logo-stacked.png` / `logo-stacked-light.png`: Dikey ana logo (Open Graph görselinde kullanılır).
- `public/favicon-48.png`, `apple-touch-icon.png`, `icon-192/512.png`, `og-image.jpg`

Vektör dosyalar geldiğinde aynı adlarla `src/assets/brand/` altına koymanız yeterlidir.

## Görseller

- Ürün ve teknik fotoğrafları Unsplash Lisansı ile kullanılmıştır. Kaynak listesi: `src/assets/images/KAYNAKLAR.md`.
- Hero ve Uygulamalar bölümündeki logolu ürünler, boş ürün fotoğraflarına Markiva logosu uygulanarak hazırlanmış
  **temsili** görsellerdir. Sitede "Görseller temsilidir." notu bulunur.
- Yeni görselleri `src/assets/images/` altına yüksek çözünürlükte (en az 1600 px) koyun; optimizasyonu Astro yapar.

## Tasarım sistemi

Belirteçler `src/styles/global.css` içindeki `:root` bölümündedir.

| Belirteç | Değer | Kullanım |
| --- | --- | --- |
| `--navy` | `#0A3D91` | Ana marka rengi: butonlar, vurgular, numaralar |
| `--navy-deep` | `#07264F` | Footer zemini (kılavuzdaki koyu logo paneli tonu) |
| `--blue` | `#008CFF` | Odak halkası ve küçük vurgular |
| `--turquoise` | `#00D1C1` | Yalnızca çok küçük vurgular (çizgi, aktif menü) |
| `--gray-50` | `#F4F6F8` | Dönüşümlü bölüm zemini |

- Yazı tipi: Manrope (SIL Open Font License, `src/assets/fonts/OFL-Manrope.txt`)
- Köşe yarıçapı: 6–10 px · Gölgeler çok hafif · Animasyon yok denecek kadar az (`prefers-reduced-motion` desteklenir)

## Proje yapısı

```
src/
  assets/       Logo, yazı tipi ve görseller (derlemede optimize edilir)
  components/   Yeniden kullanılabilir bölümler ve kartlar
  data/         Tüm içerik (metin, ürün, iletişim)
  layouts/      Ortak HTML iskeleti, SEO etiketleri
  pages/        index, 404, sitemap.xml, robots.txt
  scripts/      Teklif formu mantığı
  styles/       Tasarım belirteçleri ve temel stiller
public/         Favicon, manifest, Open Graph görseli
scripts/        Logo çıkarma aracı
brand/          Marka kılavuzu (logo kaynağı)
```

## Yayınlama

`npm run build` sonrası oluşan `dist/` klasörü herhangi bir statik barındırmaya yüklenebilir
(Netlify, Vercel, Cloudflare Pages, klasik hosting/cPanel vb.). Derleme ortamında `SITE_URL` tanımlanmalıdır.
