import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
      <body className={montserrat.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}

