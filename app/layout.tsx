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
        {/* Premium Background Effects */}
        <div className="fixed inset-0 -z-10">
          {/* Animated gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 255, 127, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(255, 0, 64, 0.1) 0%, transparent 50%)',
              animation: 'background-shift 20s ease-in-out infinite'
            }}
          />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '5s' }} />
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '10s' }} />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}

