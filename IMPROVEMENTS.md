# BWC — Improvement Checklist

This document tracks all improvements applied to the **Better Way Comparison** project, along with remaining recommendations for future development.

---

## Completed in This Update

### Branding & Icon Integration

- [x] Added `BWC-ICON-NO-LETTERS.png` to `public/icon.png` (original full-res)
- [x] Generated `favicon.ico` (multi-size: 16×16, 32×32, 48×48)
- [x] Generated `favicon-16x16.png` and `favicon-32x32.png`
- [x] Generated `apple-touch-icon.png` (180×180)
- [x] Generated `icon-192.png` and `icon-512.png` for PWA
- [x] Generated `og-image.png` (1200×630) for Open Graph / social sharing
- [x] Added `app/icon.png` for Next.js App Router automatic favicon convention
- [x] Replaced placeholder "B" letter in **Header** with the real icon image (`next/image`)
- [x] Replaced placeholder "B" letter in **Footer** with the real icon image (`next/image`)

### Metadata & SEO

- [x] Added full `icons` metadata block in `app/layout.tsx` (favicon, apple-touch-icon, shortcut)
- [x] Added `openGraph` metadata (type, siteName, title, description, URL, og-image)
- [x] Added `twitter` card metadata (`summary_large_image`)
- [x] Added `manifest` reference to `site.webmanifest`

### PWA Support

- [x] Created `public/site.webmanifest` with name, short_name, theme_color, icons, and display mode

### Configuration

- [x] Migrated `next.config.js` `images.domains` (deprecated) to `images.remotePatterns` (modern API)

### Documentation

- [x] Created `README.md` with project overview, tech stack table, features, structure, and getting started guide
- [x] Added "Developed by Rodrigo Ribeiro Leite" attribution in Footer (EN + PT-BR)

---

## Recommended Future Improvements

### Performance

- [ ] Add `next/font` local font loading instead of Google Fonts CDN `<link>` tags (eliminates render-blocking request)
- [ ] Wrap Amazon product images in `next/image` with `sizes` and `priority` attributes for LCP optimization
- [ ] Add `loading="lazy"` and explicit `width`/`height` to all non-critical images to prevent CLS

### SEO

- [ ] Add per-page `generateMetadata()` functions in article and category pages (currently only root layout has metadata)
- [ ] Implement JSON-LD structured data (`Product`, `Review`, `FAQPage`) using the existing `schemaData` field in article types
- [ ] Add a `robots.txt` file to `public/` to control crawling
- [ ] Add a `sitemap.xml` (or `app/sitemap.ts`) for search engine indexing of all locale + article routes

### Accessibility

- [ ] Add `aria-label` to all icon-only buttons (language switcher, mobile menu toggle already has one — verify others)
- [ ] Ensure color contrast ratios meet WCAG AA (check `brand-600` on white backgrounds)
- [ ] Add `skip to main content` link for keyboard navigation

### Code Quality

- [ ] Remove unused `locales` import from `Header.tsx` (imported but not used directly in the component)
- [ ] Extract category data (slugs, names, icons) into `data/categories.ts` and import it in both Header and Footer to avoid duplication
- [ ] Add ESLint rule `@typescript-eslint/no-unused-vars` to catch dead imports at build time
- [ ] Add `prettier` for consistent code formatting across the project

### Features

- [ ] Implement the newsletter form backend (currently a static `<form>` with no action)
- [ ] Add a search/filter feature on the Best Products page
- [ ] Add a "Back to top" button for long article pages
- [ ] Implement a cookie consent banner (required for GDPR compliance if targeting EU users)
- [ ] Add a `Contact` page form handler (currently static)

### Security

- [ ] Add `Content-Security-Policy` headers via `next.config.js` `headers()` function
- [ ] Add `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` security headers
- [ ] Ensure all affiliate links use `rel="nofollow noopener noreferrer"`

### Deployment

- [ ] Add a `vercel.json` or deployment configuration file
- [ ] Set up environment variables for `SITE_URL` instead of hardcoding in `lib/utils.ts`
- [ ] Add GitHub Actions CI workflow for linting and type-checking on pull requests
