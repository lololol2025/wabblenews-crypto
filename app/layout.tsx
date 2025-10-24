import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
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
      <body className={spaceGrotesk.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}

