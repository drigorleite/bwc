import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { buildWebSiteSchema, buildOrganizationSchema } from '@/lib/schema'

// ── next/font: zero layout shift, self-hosted, no CDN round-trip ─────────────
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://betterwaycomparison.com'),
  title: {
    default:  'Better Way Comparison — Honest Product Comparisons',
    template: '%s | Better Way Comparison',
  },
  description: 'Clear, honest product comparisons for smarter buying decisions. We research hundreds of products so you buy the right one for your exact situation.',
  keywords: ['product comparison', 'best products', 'product reviews', 'buying guide', 'honest reviews'],
  authors: [{ name: 'Better Way Comparison', url: 'https://betterwaycomparison.com' }],
  creator: 'Better Way Comparison',
  publisher: 'Better Way Comparison',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'Better Way Comparison',
    title: 'Better Way Comparison — Honest Product Comparisons',
    description: 'Clear, honest product comparisons for smarter buying decisions.',
    url: 'https://betterwaycomparison.com',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Better Way Comparison — Honest Product Comparisons',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bwcomparison',
    creator: '@bwcomparison',
    title: 'Better Way Comparison — Honest Product Comparisons',
    description: 'Clear, honest product comparisons for smarter buying decisions.',
    images: [{ url: '/og-image.png', alt: 'Better Way Comparison' }],
  },
  verification: {
    // Add your Google Search Console verification token here when available
    // google: 'your-google-verification-token',
  },
  alternates: {
    canonical: 'https://betterwaycomparison.com',
    languages: {
      'en-US': 'https://betterwaycomparison.com/en',
      'pt-BR': 'https://betterwaycomparison.com/pt-br',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = buildWebSiteSchema()
  const orgSchema = buildOrganizationSchema()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* DNS prefetch for Amazon images */}
        <link rel="dns-prefetch" href="https://m.media-amazon.com" />
        <link rel="dns-prefetch" href="https://images-na.ssl-images-amazon.com" />
        {/* DNS prefetch for AdSense */}
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <meta name="google-adsense-account" content="ca-pub-9440937515445471" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9440937515445471"
          crossOrigin="anonymous"
        />
        {/* WebSite schema — enables Google Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
