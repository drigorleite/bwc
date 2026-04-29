import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default:  'Better Way Comparison — Honest Product Comparisons',
    template: '%s | Better Way Comparison',
  },
  description: 'Clear, honest product comparisons for smarter buying decisions.',
  metadataBase: new URL('https://betterwaycomparison.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-sans">{children}</body>
    </html>
  )
}
