import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Space_Grotesk, Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

// Satoshi font for body text (using Inter as fallback since Satoshi requires local files)
const satoshi = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-satoshi',
})

// Space Grotesk for headings
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'WabbleNews - Latest News & Updates',
  description: 'Stay updated with the latest news from WabbleNews',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} ${satoshi.variable} ${spaceGrotesk.variable}`}>
        <LanguageProvider>
          <Toaster position="top-right" />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

