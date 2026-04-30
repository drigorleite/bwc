# Better Way Comparison (BWC)

> Clear, honest product comparisons for smarter buying decisions.

![Better Way Comparison](./public/og-image.png)

## Overview

**Better Way Comparison** is a bilingual (English / Portuguese BR) affiliate product comparison website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It features structured product reviews, comparison tables, FAQ sections, and category-based browsing — all optimized for SEO and monetized through the Amazon Associates Program.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| i18n | Custom locale routing (`/en`, `/pt-br`) |
| Fonts | Inter (Google Fonts) |
| Deployment | Static-ready / Vercel |

## Features

- Bilingual routing: `/en` and `/pt-br` with `hreflang` support
- Product comparison tables with ratings, pros/cons, and affiliate links
- Category pages for Watches, Beauty, Kitchen, Tools, Office, and Pet Tech
- FAQ accordion, final verdict boxes, and affiliate disclosure
- PWA-ready with `site.webmanifest`, favicon set, and OG image
- Responsive header with dropdown category navigation

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bwc/
├── app/                    # Next.js App Router pages
│   ├── [locale]/           # Locale-scoped routes (en, pt-br)
│   │   ├── [slug]/         # Dynamic article pages
│   │   ├── category/       # Category listing pages
│   │   ├── about/
│   │   ├── contact/
│   │   └── ...
│   ├── globals.css
│   ├── icon.png            # App icon (Next.js convention)
│   └── layout.tsx
├── components/
│   ├── cards/              # Article, Category, Product cards
│   ├── layout/             # Header, Footer
│   ├── sections/           # ProductComparisonTable
│   └── ui/                 # Reusable UI components
├── data/
│   └── articles/           # Article data (en + pt-br)
├── lib/
│   ├── i18n.ts             # Translations and locale utilities
│   └── utils.ts            # Helper functions
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── icon.png
│   ├── og-image.png
│   └── site.webmanifest
└── types/                  # TypeScript interfaces
```

## Localization

The app supports two locales:

- **English** (`/en`) — primary
- **Portuguese BR** (`/pt-br`) — secondary

Translation strings are managed in `lib/i18n.ts`. All routes are prefixed with the locale segment.

## Affiliate Disclosure

This site participates in the **Amazon Services LLC Associates Program**, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.

---

Developed by [Rodrigo Ribeiro Leite](https://rodrigoleite.dev)
